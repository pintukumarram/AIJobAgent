'use client';
import { useState } from 'react';

export default function CredentialForm() {
  const [form, setForm] = useState({ name: '', email: '', linkedin: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // TODO: Send to backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}