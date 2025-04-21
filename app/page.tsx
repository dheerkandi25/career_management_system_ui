'use client';
import { useEffect, useState } from "react";
import { Location } from "./Interfaces/interfaces";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [uploadMessage, setUploadMessage] = useState(""); // State to display upload status
  const router = useRouter();

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    const selectedLocation = locations.find(location => location.city === city);
    if (selectedLocation) {
      setSelectedState(selectedLocation.state);
      setSelectedCountry(selectedLocation.country);
      setSelectedLocationId(selectedLocation.id);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locationmaster`);
        if (response.ok) {
          const data: Location[] = await response.json();
          setLocations(data);
        } else {
          console.error("Failed to fetch locations");
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleResumeUpload = async (resumeFile: File) => {
    const formData = new FormData();
    formData.append("file", resumeFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploadresume`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadMessage("Resume uploaded successfully!");
      } else {
        setUploadMessage("Failed to upload resume.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setUploadMessage("Error uploading resume.");
    }
  };

  const handleNext = () => {
    // Collect form data
    const formData = {
      first_name: (document.getElementById("first_name") as HTMLInputElement)?.value,
      last_name: (document.getElementById("last_name") as HTMLInputElement)?.value,
      email_id: (document.getElementById("email_id") as HTMLInputElement)?.value,
      phone: (document.getElementById("phone") as HTMLInputElement)?.value,
      address: (document.getElementById("address") as HTMLInputElement)?.value,
      city: selectedCity,
      state: selectedState,
      zip: (document.getElementById("zip") as HTMLInputElement)?.value,
      country: selectedCountry,
      location_id: selectedLocationId,
      resume_name: (document.getElementById("resume") as HTMLInputElement)?.files?.[0]?.name || "",
    };

    // Store each key-value pair in localStorage
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        localStorage.setItem(key, value.toString());
      }
    });

    // Navigate to the next page
    router.push("/education");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 text-white py-4 px-6">
        <h1 className="text-center text-2xl font-bold">Career Management System</h1>
      </header>
      <main className="flex justify-center items-center flex-grow w-full">
        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="first_name" className="block text-gray-700 font-bold mb-2">
              First Name:
            </label>
            <input type="text" id="first_name" name="first_name" required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="last_name" className="block text-gray-700 font-bold mb-2">
              Last Name:
            </label>
            <input type="text" id="last_name" name="last_name" className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="email_id" className="block text-gray-700 font-bold mb-2">
              EmailId:
            </label>
            <input type="email" id="email_id" name="email_id" required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Phone:
            </label>
            <input type="tel" id="phone" name="phone" required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
              Address:
            </label>
            <input id="address" name="address" required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
              City:
            </label>
            <select id="city" name="city" value={selectedCity} onChange={handleCityChange} required className="w-full px-3 py-2 border rounded-lg text-black">
              <option value="" disabled>
                Select a city
              </option>
              {locations.map((location) => (
                <option key={location.id} value={location.city}>
                  {location.city}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
              State:
            </label>
            <input type="text" id="state" name="state" value={selectedState} readOnly required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block text-gray-700 font-bold mb-2">
              Zip:
            </label>
            <input id="zip" name="zip" required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
              Country:
            </label>
            <input id="country" name="country" value={selectedCountry} readOnly required className="w-full px-3 py-2 border rounded-lg text-black" />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block text-gray-700 font-bold mb-2">
              Resume:
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  handleResumeUpload(file);
                }
              }}
              required
              className="w-full px-3 py-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          </div>
        </form>
        {uploadMessage && <p className="mt-4 text-green-600">{uploadMessage}</p>}
      </main>
    </div>
  );
}
