'use client';
import ResumeUploader from '@/components/ResumeUploader';

export default function UploadPage() {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Upload Your Resume</h2>
      <ResumeUploader />
    </div>
  );
}