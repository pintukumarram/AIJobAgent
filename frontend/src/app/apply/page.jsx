'use client';

export default function ApplyPage() {
  const handleApply = () => {
    // TODO: Trigger backend API to apply
    alert('Auto-apply triggered!');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Apply for Jobs</h2>
      <button onClick={handleApply} className="bg-blue-600 text-white px-4 py-2 rounded">
        Auto Apply
      </button>
    </div>
  );
}