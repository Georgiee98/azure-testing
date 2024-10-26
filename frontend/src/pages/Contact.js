import React from "react";
import "./Contact.css"; // Import Contact page styles

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feel free to reach out!</p>
      <div className="contact-info">
        <h2>Email Us</h2>
        <p>
          <strong>Support:</strong>{" "}
          <a href="mailto:support@voyex.com">support@voyex.com</a>
        </p>
        <p>
          <strong>Sales:</strong>{" "}
          <a href="mailto:sales@voyex.com">sales@voyex.com</a>
        </p>
        <p>
          <strong>General Inquiries:</strong>{" "}
          <a href="mailto:info@voyex.com">info@voyex.com</a>
        </p>
      </div>
      <div className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
