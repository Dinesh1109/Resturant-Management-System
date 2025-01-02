import Booking from "./Bookings";


const BookingCard = ({ booking }: { booking: Booking }) => {
    return (
      <div className="w-full sm:w-72 md:w-80 lg:w-96 mx-auto my-4 p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{booking.date}</h3>
          <p className="text-lg text-gray-700 truncate">{booking.time}</p>
          <p className="text-sm text-gray-600 mt-2 truncate">{booking.name}</p>
        </div>
      </div>
    );
  };
  

export default BookingCard;
