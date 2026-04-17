const User = require('../models/usersmodel');
const sendEmail = require('../services/emailServices');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 1. Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Send dummy email
    await sendEmail(
      email,
      "Password Reset Request",
      `<h3>Hello ${user.email}</h3>
       <p>This is a test email for password reset.</p> `
    );

    res.status(200).json({
      message: "Email sent successfully"
    });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};