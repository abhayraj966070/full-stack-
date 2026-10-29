async function getUser(userId) {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}