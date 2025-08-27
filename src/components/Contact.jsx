import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-12 bg-green-100 px-6">
      <h2 className="text-2xl font-bold text-center mb-8 text-green-700">Contact Us</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div>
          <p className="flex items-center mb-2"><MapPin className="mr-2 text-green-700"/> Village Center, Rural District, India</p>
          <p className="flex items-center mb-2"><Phone className="mr-2 text-green-700"/> Helpline: +91 98765 43210</p>
          <p className="flex items-center"><Mail className="mr-2 text-green-700"/> support@ruralconnect.in</p>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-6 rounded-lg shadow-md">
          <input 
            type="text" 
            placeholder="Your Name" 
            className="border p-2 w-full mb-3 rounded" 
            required
          />
          <textarea 
            placeholder="Your Message" 
            rows="4" 
            className="border p-2 w-full mb-3 rounded" 
            required
          ></textarea>
          <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
