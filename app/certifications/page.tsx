'use client';
import { useState } from "react";
import CertificationsForm from "../Components/CertificationsForm";
import { useRouter } from "next/navigation";

export default function CertificationsPage() {
  const [certificationsData, setCertificationsData] = useState<any[]>([]); // State to store data from all forms
  const [certificationsForms, setCertificationsForms] = useState<number[]>([0]); // Track multiple forms
  const router = useRouter();

  const addCertificationsForm = () => {
    setCertificationsForms((prev) => [...prev, prev.length]);
  };

  const removeCertificationsForm = (index: number) => {
    setCertificationsForms((prev) => prev.filter((_, i) => i !== index));
    setCertificationsData((prev) => prev.filter((_, i) => i !== index)); // Remove corresponding data
  };

  const handleCertificationsChange = (index: number, data: any) => {
    setCertificationsData((prev) => {
      const updated = [...prev];
      updated[index] = data; // Update the data for the specific form
      return updated;
    });
  };

  const handleSubmit = async () => {
    // Collect all data from localStorage
    const firstName = localStorage.getItem("first_name");
    const lastName = localStorage.getItem("last_name");
    const emailId = localStorage.getItem("email_id");
    const phone = localStorage.getItem("phone");
    const address = localStorage.getItem("address");
    const locationId = localStorage.getItem("location_id");
    const resumeName = localStorage.getItem("resume_name");
    const education = JSON.parse(localStorage.getItem("education") || "[]");
    const experience = JSON.parse(localStorage.getItem("experience") || "[]");
    const skills = JSON.parse(localStorage.getItem("skills") || "[]");

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email_id: emailId,
      phone,
      address,
      location_id: Number(locationId),
      resume_name: resumeName,
      education,
      experience,
      skills,
      certifications: certificationsData,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        router.push("/success"); // Navigate to a success page
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 px-6">
        <h1 className="text-center text-2xl font-bold">Certifications</h1>
      </header>
      <main className="flex flex-col items-center flex-grow w-full">
        {certificationsForms.map((formId, index) => (
          <CertificationsForm
            key={formId}
            onRemove={() => removeCertificationsForm(index)}
            onChange={(data) => handleCertificationsChange(index, data)} // Pass callback to child
          />
        ))}
        <button
          type="button"
          onClick={addCertificationsForm}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-4"
        >
          Add Certification
        </button>
      </main>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 mt-4"
      >
        Submit
      </button>
    </div>
  );
}