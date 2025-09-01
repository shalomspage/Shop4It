"use client";
import React from "react";
import Spinner from "@/components/common/Spinner";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const isLoading = false; // 👈 toggle to true to test the spinner

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen max-w-2xl gap-8 mx-auto p-6 text-center items-center justify-center">
        <Spinner lg />
        <p className="text-gray-600">Loading details...</p>
      </div>
    );
  }

  return (
    <section className="px-6 py-12 sm:px-12 md:px-16 lg:px-24 bg-gray-100 w-full">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Have questions or need assistance? We’d love to hear from you.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
            <div className="bg-gray-100 p-3 rounded-full">
              <Mail className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-semibold mt-3 text-gray-800">Email Us</h3>
            <p className="text-gray-600 text-sm mt-1">info@yourstore.com</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
            <div className="bg-gray-100 p-3 rounded-full">
              <Phone className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-semibold mt-3 text-gray-800">Call Us</h3>
            <p className="text-gray-600 text-sm mt-1">+44 123 456 789</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105">
            <div className="bg-gray-100 p-3 rounded-full">
              <MapPin className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="font-semibold mt-3 text-gray-800">Visit Us</h3>
            <p className="text-gray-600 text-sm mt-1">123 London Street, UK</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Send Us a Message
          </h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
            <button
              type="submit"
              className="w-full bg-gray-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-green-900 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden shadow-lg h-[300px] sm:h-[400px]">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.690608665896!2d-0.12775878422963263!3d51.50735097963592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3339b52d69%3A0xdeb8a3d9cfb0f8d4!2sLondon!5e0!3m2!1sen!2suk!4v1693400000000!5m2!1sen!2suk"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
