const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createPayment = async (req, res) => {

    try {

        const options = {
            amount: 50000,
            currency: "INR",
            receipt: "receipt_101"
        };

        const order = await razorpay.orders.create(options);

        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

};

exports.verifyPayment = async (req, res) => {

    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
    } = req.body;

    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(
            razorpay_order_id + "|" + razorpay_payment_id
        )
        .digest("hex");

    const isValid = crypto.timingSafeEqual(
        Buffer.from(generatedSignature),
        Buffer.from(razorpay_signature)
    );

    if (!isValid) {
        return res.status(400).json({
            message: "Payment verification failed"
        });
    }

    res.json({
        message: "Payment signature verified"
    });

};