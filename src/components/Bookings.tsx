import { useState } from "react";
import Calendar from "../components/Calendar"; // Import the Calendar component
import BookingCard from "./BookingCard";

interface Booking {
  _id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  contact: string;
}

export default function Booking() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");


  const addDays = (date: string, daysToAdd: number) => {
    const newDate = new Date(date); // Create a new Date object from the input date
    newDate.setDate(newDate.getDate() + daysToAdd); // Add the specified number of days
    return newDate.toISOString().split("T")[0]; // Return the new date in YYYY-MM-DD format
  };

  const handleDateClick = async (date: string) => {
    console.log("Date selected:", date);  // Log the selected date
    setSelectedDate(addDays(date, 1));
    try {
        const formattedDate = addDays(date, 1); // Convert to YYYY-MM-DD format

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/by-date?date=${formattedDate}`);
        console.log("Response status:", response);  // Log the response status
  
        if (!response.ok) {
          throw new Error("Failed to fetch bookings for selected date");
        }
  
        const data = await response.json();
        console.log("Fetched bookings:", data);  // Log the fetched bookings
        setBookings(data);  // Set the fetched bookings
    } catch(error) {
      setError( error.message || "Something went wrong");
      console.error("Error fetching bookings:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 ">
      <Calendar onDateClick={handleDateClick} />
      <div className="w-full max-w-4xl mx-auto text-center">
            {selectedDate && (
             <h2 className="text-2xl font-semibold text-gray-800 my-4">
                 Bookings for {selectedDate}
            </h2>
            )}
     </div>
      <div className="bookings-list mt-6 max-w-4xl mx-auto space-y-4 overflow-y-auto">
        {error && <p>{error}</p>}
        
        
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))
        ) : (
          <p className="w-full max-w-4xl mx-auto text-center">No bookings found for the selected date.</p>
        )}
      </div>
      
    </div>
  );

}
