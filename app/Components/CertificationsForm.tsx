'use client';
import { useState, useEffect } from "react";

interface Certification {
  id: number;
  name: string;
}

interface CertificationsFormProps {
  onRemove?: () => void; // Optional callback to remove the form
  onChange?: (data: any) => void; // Callback to pass data to the parent
}

export default function CertificationsForm({ onRemove, onChange }: CertificationsFormProps) {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [selectedCertificationId, setSelectedCertificationId] = useState<number | null>(null);
  const [givenDate, setGivenDate] = useState<string>("");

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificationmaster`);
        if (response.ok) {
          const data: Certification[] = await response.json();
          setCertifications(data);
        } else {
          console.error("Failed to fetch certifications");
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      }
    };

    fetchCertifications();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({
        certification_id: selectedCertificationId,
        given_date: givenDate,
      });
    }
  }, [selectedCertificationId, givenDate]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl  mb-6">
      <div className="mb-4">
        <label htmlFor="certification" className="block text-gray-700 font-bold mb-2">
          Certification Name:
        </label>
        <select
          id="certification"
          name="certification"
          value={selectedCertificationId || ""}
          onChange={(e) => setSelectedCertificationId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        >
          <option value="" disabled>
            Select a certification
          </option>
          {certifications.map((certification) => (
            <option key={certification.id} value={certification.id}>
              {certification.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="given_date" className="block text-gray-700 font-bold mb-2">
          Given Date:
        </label>
        <input
          type="date"
          id="given_date"
          name="given_date"
          value={givenDate}
          onChange={(e) => setGivenDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        />
      </div>
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