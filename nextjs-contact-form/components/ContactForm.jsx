'use client';

import { useState } from 'react';
import Notification from './Notification';
import Modal from './Modal';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null,
    honeypot: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ message: '', type: 'success' });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') setFormData({ ...formData, file: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus({ type: '', message: '' });

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('message', formData.message);
    payload.append('honeypot', formData.honeypot);
    if (formData.file) payload.append('file', formData.file);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: payload,
      });
      const result = await res.json();

      if (res.ok) {
        setModalInfo({ message: result.message, type: 'success' });
        setShowModal(true);
        setFormData({ name: '', email: '', message: '', file: null, honeypot: '' });
      } else {
        setModalInfo({ message: result.error, type: 'error' });
        setShowModal(true);
      }
    } catch (error) {
      setModalInfo({ message: 'Something went wrong!', type: 'error' });
      setShowModal(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        message={modalInfo.message}
        type={modalInfo.type}
        onClose={() => setShowModal(false)}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-xl space-y-6 transition text-black-all duration-300 ease-in-out"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Get in Touch</h2>

        <Notification type={status.type} message={status.message} />
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          className="hidden"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-black"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-black "
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition text-black"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload File (optional)</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition text-black-all duration-300 ${
            loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          } flex items-center justify-center`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </>
  );
}
