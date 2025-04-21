'use client';
import { useState } from "react";
import SkillsForm from "../Components/SkillsForm";
import { useRouter } from "next/navigation";

export default function SkillsPage() {
  const [skillsData, setSkillsData] = useState<any[]>([]); // State to store data from all forms
  const [skillsForms, setSkillsForms] = useState<number[]>([0]); // Track multiple forms
  const router = useRouter();

  const addSkillsForm = () => {
    setSkillsForms((prev) => [...prev, prev.length]);
  };

  const removeSkillsForm = (index: number) => {
    setSkillsForms((prev) => prev.filter((_, i) => i !== index));
    setSkillsData((prev) => prev.filter((_, i) => i !== index)); // Remove corresponding data
  };

  const handleSkillsChange = (index: number, data: any) => {
    setSkillsData((prev) => {
      const updated = [...prev];
      updated[index] = data; // Update the data for the specific form
      return updated;
    });
  };

  const handleNext = () => {
    // Save skills data to localStorage
    localStorage.setItem("skills", JSON.stringify(skillsData));
    router.push("/certifications"); // Navigate to the next page
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 px-6">
        <h1 className="text-center text-2xl font-bold">Skills</h1>
      </header>
      <main className="flex flex-col items-center flex-grow w-full">
        {skillsForms.map((formId, index) => (
          <SkillsForm
            key={formId}
            onRemove={() => removeSkillsForm(index)}
            onChange={(data) => handleSkillsChange(index, data)} // Pass callback to child
          />
        ))}
        <button
          type="button"
          onClick={addSkillsForm}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Add Skill
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