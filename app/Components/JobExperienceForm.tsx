'use client';
import { useState, useEffect } from "react";

interface Company {
  id: number;
  name: string;
}

interface JobExperienceFormProps {
  onRemove?: () => void; // Optional callback to remove the form
  onChange?: (data: any) => void; // Callback to pass data to the parent
}

export default function JobExperienceForm({ onRemove, onChange }: JobExperienceFormProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/companymaster`);
        if (response.ok) {
          const data: Company[] = await response.json();
          setCompanies(data);
        } else {
          console.error("Failed to fetch companies");
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({
        company_id: selectedCompanyId,
        job_title: jobTitle,
        start_date: startDate,
        end_date: endDate,
      });
    }
  }, [selectedCompanyId, jobTitle, startDate, endDate]);

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
        <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
          Company Name:
        </label>
        <select
          id="company"
          name="company"
          value={selectedCompanyId || ""}
          onChange={(e) => setSelectedCompanyId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        >
          <option value="" disabled>
            Select a company
          </option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="job_title" className="block text-gray-700 font-bold mb-2">
          Job Title:
        </label>
        <input
          type="text"
          id="job_title"
          name="job_title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
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