import Contact from "../models/contact.model.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createContact(req, res, next) {
  try {
    const { name, email, message } = req.body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ message: "Name, email, and message are required." });
    }
    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (name.trim().length < 2 || message.trim().length < 10) {
      return res.status(400).json({ message: "Please provide a little more detail." });
    }

    if (!process.env.MONGODB_URI) {
      return res.status(503).json({
        message: "Contact service is not configured yet. Please connect MongoDB on the server."
      });
    }

    await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    });

    return res.status(201).json({ message: "Thanks — your message has been received." });
  } catch (error) {
    next(error);
  }
}
