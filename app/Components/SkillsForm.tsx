'use client';
import { useState, useEffect } from "react";

interface Skill {
  id: number;
  name: string;
}

interface SkillsFormProps {
  onRemove?: () => void; // Optional callback to remove the form
  onChange?: (data: any) => void; // Callback to pass data to the parent
}

export default function SkillsForm({ onRemove, onChange }: SkillsFormProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skillmaster`);
        if (response.ok) {
          const data: Skill[] = await response.json();
          setSkills(data);
        } else {
          console.error("Failed to fetch skills");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange({
        skill_id: selectedSkillId,
      });
    }
  }, [selectedSkillId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mb-6">
      <div className="mb-4">
        <label htmlFor="skill" className="block text-gray-700 font-bold mb-2">
          Skill:
        </label>
        <select
          id="skill"
          name="skill"
          value={selectedSkillId || ""}
          onChange={(e) => setSelectedSkillId(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-lg text-black"
        >
          <option value="" disabled>
            Select a skill
          </option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
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