'use client';
import { useState } from "react";
import JobExperienceForm from "../Components/JobExperienceForm";
import { useRouter } from "next/navigation";

export default function JobExperiencePage() {
  const [jobExperienceData, setJobExperienceData] = useState<any[]>([]); // State to store data from all forms
  const [jobExperienceForms, setJobExperienceForms] = useState<number[]>([0]); // Track multiple forms
  const router = useRouter();

  const addJobExperienceForm = () => {
    setJobExperienceForms((prev) => [...prev, prev.length]);
  };

  const removeJobExperienceForm = (index: number) => {
    setJobExperienceForms((prev) => prev.filter((_, i) => i !== index));
    setJobExperienceData((prev) => prev.filter((_, i) => i !== index)); // Remove corresponding data
  };

  const handleJobExperienceChange = (index: number, data: any) => {
    setJobExperienceData((prev) => {
      const updated = [...prev];
      updated[index] = data; // Update the data for the specific form
      return updated;
    });
  };

  const handleNext = () => {
    // Save job experience data to localStorage
    localStorage.setItem("experience", JSON.stringify(jobExperienceData));
    router.push("/skills"); // Navigate to the next page
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 px-6">
        <h1 className="text-center text-2xl font-bold">Job Experience</h1>
      </header>
      <main className="flex flex-col items-center flex-grow w-full">
        {jobExperienceForms.map((formId, index) => (
          <JobExperienceForm
            key={formId}
            onRemove={() => removeJobExperienceForm(index)}
            onChange={(data) => handleJobExperienceChange(index, data)} // Pass callback to child
          />
        ))}
        <button
          type="button"
          onClick={addJobExperienceForm}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Add Job Experience
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