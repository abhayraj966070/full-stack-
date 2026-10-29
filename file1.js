const jwt = require("jsonwebtoken");

function generateToken(user) {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
}

const user = {
    _id: "12345",
    email: "user@example.com"
};

const token = generateToken(user);
console.log(token);