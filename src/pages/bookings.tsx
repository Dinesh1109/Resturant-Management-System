import Booking from "../components/Bookings";  // Import the Bookings component

export default function BookingsPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-600 p-6">
      <h1 className="text-3xl font-bold mt-10 mb-6 text-white">All Bookings</h1>
      <Booking />  {/* Render the Bookings component */}
    </div>
  );
}
