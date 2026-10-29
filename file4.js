
app.get("/profile", authMiddleware, (req, res) => {
    res.json({ user: req.user });
});




const salesReport = await Order.aggregate([
    {
        $match: {
            status: "completed"
        }
    },
    {
        $group: {
            _id: "$userId",
            totalSales: { $sum: "$amount" },
            totalOrders: { $sum: 1 }
        }
    },
    {
        $sort: {
            totalSales: -1
        }
    }
]);

console.log(salesReport);