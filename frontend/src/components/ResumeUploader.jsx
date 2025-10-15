'use client';
import { useState } from 'react';

export default function ResumeUploader() {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) setFile(uploadedFile);
  };

  return (
    <div className="border p-4 rounded">
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleUpload} />
      {file && <p className="mt-2 text-green-600">Uploaded: {file.name}</p>}
    </div>
  );
}