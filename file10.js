const Order = require("../models/Order");

exports.getDashboard = async (req, res) => {

    try {

        const analytics = await Order.aggregate([

            {
                $match: {
                    status: "delivered"
                }
            },

            {
                $group: {
                    _id: null,

                    totalOrders: {
                        $sum: 1
                    },

                    totalRevenue: {
                        $sum: "$totalAmount"
                    },

                    averageOrderValue: {
                        $avg: "$totalAmount"
                    }

                }
            }

        ]);

        res.json({

            success: true,

            dashboard: analytics[0] || {
                totalOrders: 0,
                totalRevenue: 0,
                averageOrderValue: 0
            }

        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};