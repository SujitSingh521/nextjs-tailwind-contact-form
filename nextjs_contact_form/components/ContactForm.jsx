'use client';

import { useState, useEffect } from 'react';
import Notification from './Notification';
import Modal from './Modal';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ message: '', type: 'success' });
  const [sentTime, setSentTime] = useState('');

  useEffect(() => {
    if (showModal) setSentTime(new Date().toLocaleString());
  }, [showModal]);

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
      if (file) formDataToSend.append('file', file);

      const res = await fetch('/api/contact', { method: 'POST', body: formDataToSend });
      const result = await res.json();

      setModalInfo({ message: result.message || result.error, type: res.ok ? 'success' : 'error' });
      setShowModal(true);

      if (res.ok) {
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      setModalInfo({ message: 'Something went wrong!', type: 'error' });
      setShowModal(true);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        message={
          <>
            {modalInfo.message}
            {modalInfo.type === 'success' && <p className="mt-2 text-sm text-gray-500">📅 Sent at: {sentTime}</p>}
          </>
        }
        type={modalInfo.type}
        onClose={() => setShowModal(false)}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-xl w-full mx-auto p-8 bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-xl space-y-6 text-black transition"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">Get in Touch</h2>
        <Notification type={status.type} message={status.message} />

        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} className="hidden" autoComplete="off" tabIndex={-1} />

        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border rounded-lg bg-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required className="w-full p-3 border rounded-lg h-32 resize-none bg-white" />
        </div>

        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (optional)</label>
          <input type="file" onChange={handleFileChange} className="block w-full text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer 
               file:border-0 file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-md hover:file:bg-blue-600 transition" />
          {file && <p className="mt-2 text-sm text-gray-500">Selected file: {file.name}</p>}
        </div>

        <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg text-white font-semibold text-lg transition ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} flex items-center justify-center`}>
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Sending...
            </>
          ) : 'Send Message'}
        </button>
      </form>
    </>
  );
}
