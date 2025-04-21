'use client';
import { useState, useEffect } from "react";
import { Institution, Major, Degree } from "./Interfaces/interfaces";

interface EducationFormProps {
  onRemove?: () => void; // Optional callback to remove the form
  onChange?: (data: any) => void; // Callback to pass data to the parent
}

export default function EducationForm({ onRemove, onChange }: EducationFormProps) {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [majors, setMajors] = useState<Major[]>([]);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState<number | null>(null);
  const [selectedMajorId, setSelectedMajorId] = useState<number | null>(null);
  const [selectedDegreeId, setSelectedDegreeId] = useState<number | null>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/educationmaster`);
        if (response.ok) {
          const data: Institution[] = await response.json();
          setInstitutions(data);
        } else {
          console.error("Failed to fetch institutions");
        }
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    const fetchMajors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/majormaster`);
        if (response.ok) {
          const data: Major[] = await response.json();
          setMajors(data);
        } else {
          console.error("Failed to fetch majors");
        }
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };

    const fetchDegrees = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/degreemaster`);
        if (response.ok) {
          const data: Degree[] = await response.json();
          setDegrees(data);
        } else {
          console.error("Failed to fetch degrees");
        }
      } catch (error) {
        console.error("Error fetching degrees:", error);
      }
    };

    fetchInstitutions();
    fetchMajors();
    fetchDegrees();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({
        education_id: selectedInstitutionId,
        degree_id: selectedDegreeId,
        major_id: selectedMajorId,
        start_date: startDate,
        end_date: endDate,
      });
    }
  }, [selectedInstitutionId, selectedDegreeId, selectedMajorId, startDate, endDate]);

  const handleDateValidation = () => {
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("End date cannot be before start date.");
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6">
      <div className="mb-4">
        <label htmlFor="institution" className="block text-gray-700 font-bold mb-2">
          Institution Name:
        </label>
        <select
          id="institution"
          name="institution"
          value={selectedInstitutionId || ""}
          onChange={(e) => setSelectedInstitutionId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        >
          <option value="" disabled>
            Select an institution
          </option>
          {institutions.map((institution) => (
            <option key={institution.id} value={institution.id}>
              {institution.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="major" className="block text-gray-700 font-bold mb-2">
          Major:
        </label>
        <select
          id="major"
          name="major"
          value={selectedMajorId || ""}
          onChange={(e) => setSelectedMajorId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        >
          <option value="" disabled>
            Select a major
          </option>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="degree" className="block text-gray-700 font-bold mb-2">
          Degree:
        </label>
        <select
          id="degree"
          name="degree"
          value={selectedDegreeId || ""}
          onChange={(e) => setSelectedDegreeId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        >
          <option value="" disabled>
            Select a degree
          </option>
          {degrees.map((degree) => (
            <option key={degree.id} value={degree.id}>
              {degree.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="start_date" className="block text-gray-700 font-bold mb-2">
          Start Date:
        </label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onBlur={handleDateValidation}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="end_date" className="block text-gray-700 font-bold mb-2">
          End Date:
        </label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          onBlur={handleDateValidation}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 mt-4"
        >
          Remove
        </button>
      )}
    </div>
  );
}