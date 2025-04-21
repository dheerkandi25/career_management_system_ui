'use client';

import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/"); // Navigate back to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Form Submitted Successfully!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for submitting your details. We have received your information successfully.
        </p>
        <button
          onClick={handleGoHome}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}