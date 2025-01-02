import Link from "next/link";  // Import the Link component for routing
import BookingForm from "../components/BookingForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-600 p-6">
      <h1 className="text-4xl font-extrabold text-white mt-10 mb-6 text-center relative mb-14">
       Restaurant Table Booking
      <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 transform transition-all duration-500 group-hover:scale-x-100"></span>
      </h1>

      <BookingForm />  {/* Render the booking form on the homepage */}

      {/* Updated Link without <a> tag */}
      <Link
  href="/bookings"
  className="mt-6 text-xl text-blue-200 hover:text-blue-400 hover:underline transition duration-300 ease-in-out relative group"
>
  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
  View all Bookings
</Link>

    </div>
  );
}
