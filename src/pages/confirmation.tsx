import { useRouter } from "next/router";

export default function Confirmation() {
  const router = useRouter();
  const { date, time, guests, name, contact } = router.query;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mt-10 mb-6 text-blue-600">Booking Confirmation</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Guests:</strong> {guests}</p>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Contact:</strong> {contact}</p>
      </div>
    </div>
  );
}
