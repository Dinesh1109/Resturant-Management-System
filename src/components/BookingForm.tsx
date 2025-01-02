import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/router";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 1,
    name: "",
    contact: "",
  });
  const [message, setMessage] = useState("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAvailableTimes = async (date: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/available-times?date=${date}`);
      const result = await response.json();
      setAvailableTimes(result.availableSlots || []);
    } catch (error) {
      setMessage(error + "Failed to fetch available time slots.");
    }
  };

  useEffect(() => {
    if (formData.date) {
      fetchAvailableTimes(formData.date);
    }
  }, [formData.date]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!formData.date || !formData.time || !formData.name || !formData.contact) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error creating booking");
      }

      const result = await response.json();

      if (result.message === "Slot already booked") {
        setMessage("Sorry, this time slot is already taken. Please choose another one.");
        return;
      }

      setMessage(result.message || "Booking created successfully!");

      router.push({
        pathname: "/confirmation",
        query: { ...formData },
      });
    } catch (error) {
      setMessage(error + "Failed to create booking. Please try again.");
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-lg font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-lg font-semibold">Time</label>
        <select
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-lg font-semibold">Number of Guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          min="1"
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-lg font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 text-lg font-semibold">Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-3 rounded-md transition-all duration-200 hover:bg-blue-600"
      >
        Submit
      </button>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
}
