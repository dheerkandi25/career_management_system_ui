'use client';
import { useState } from "react";
import EducationForm from "../Components/Educationform";
import { useRouter } from "next/navigation";

export default function EducationPage() {
  const [educationData, setEducationData] = useState<any[]>([]); // State to store data from all forms
  const [educationForms, setEducationForms] = useState<number[]>([0]); // Track multiple forms
  const router = useRouter();

  const addEducationForm = () => {
    setEducationForms((prev) => [...prev, prev.length]);
  };

  const removeEducationForm = (index: number) => {
    setEducationForms((prev) => prev.filter((_, i) => i !== index));
    setEducationData((prev) => prev.filter((_, i) => i !== index)); // Remove corresponding data
  };

  const handleEducationChange = (index: number, data: any) => {
    setEducationData((prev) => {
      const updated = [...prev];
      updated[index] = data; // Update the data for the specific form
      return updated;
    });
  };

  const handleNext = () => {
    // Save education data to localStorage
    localStorage.setItem("education", JSON.stringify(educationData));
    router.push("/jobexperience"); // Navigate to the next page
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 px-6">
        <h1 className="text-center text-2xl font-bold">Education Details</h1>
      </header>
      <main className="flex flex-col items-center flex-grow w-full">
        {educationForms.map((formId, index) => (
          <EducationForm
            key={formId}
            onRemove={() => removeEducationForm(index)}
            onChange={(data) => handleEducationChange(index, data)} // Pass callback to child
          />
        ))}
        <button
          type="button"
          onClick={addEducationForm}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Add Education
        </button>
      </main>
      <button
        type="button"
        onClick={handleNext}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
      >
        Next
      </button>
    </div>
  );
}