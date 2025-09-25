"use client";

import { useState } from "react";
import Notification from "./Notification";
import Modal from "./Modal";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", file: null, honeypot: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ message: "", type: "success" });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") setFormData({ ...formData, file: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: "", message: "" });

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("message", formData.message);
    payload.append("honeypot", formData.honeypot);
    if (formData.file) payload.append("file", formData.file);

    try {
      const res = await fetch("/api/contact", { method: "POST", body: payload });
      const result = await res.json();

      if (res.ok) {
        setModalInfo({ message: result.message, type: "success" });
        setShowModal(true);
        setFormData({ name: "", email: "", message: "", file: null, honeypot: "" });
      } else {
        setModalInfo({ message: result.error, type: "error" });
        setShowModal(true);
      }
    } catch (error) {
      setModalInfo({ message: "Something went wrong!", type: "error" });
      setShowModal(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal show={showModal} message={modalInfo.message} type={modalInfo.type} onClose={() => setShowModal(false)} />
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
        <Notification type={status.type} message={status.message} />
        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" />
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required className="w-full p-3 border border-gray-300 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="file" name="file" onChange={handleChange} className="w-full" />
        <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition flex justify-center items-center">
          {loading ? <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> : "Send"}
        </button>
      </form>
    </>
  );
}
