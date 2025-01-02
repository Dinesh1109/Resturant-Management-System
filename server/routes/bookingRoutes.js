import express from "express";
import Booking from "../models/Booking.js"

const router = express.Router();

// Create a booking
// Create a booking (Prevent double booking)
router.post("/", async (req, res) => {
  try {
    const { date, time, guests, name, contact } = req.body;

    // Step 1: Check if there is an existing booking for the same date and time
    const existingBooking = await Booking.findOne({ date, time });

    // Step 2: If a booking already exists, send a response that the slot is unavailable
    if (existingBooking) {
      return res.status(400).json({ message: "Slot already booked" });
    }

    // Step 3: If no booking exists for that time slot, create a new booking
    const booking = new Booking({ date, time, guests, name, contact });
    await booking.save();

    // Send a success response with booking details
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});





router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();  // Assuming Booking is your model
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get available time slots for a specific date
router.get("/available-times", async (req, res) => {
  const { date } = req.query; // Get date from query parameters

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    // Find all bookings for the selected date
    const existingBookings = await Booking.find({ date });

    // Generate an array of all possible time slots (e.g., 12 PM to 10 PM, every hour)
    const allTimeSlots = [
      "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
    ];

    // Filter out the already booked time slots
    const availableSlots = allTimeSlots.filter(
      time => !existingBookings.some(booking => booking.time === time)
    );

    res.status(200).json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Get bookings for a specific date
// Get bookings for a specific date
// Get bookings for a specific date
router.get("/by-date", async (req, res) => {
  const { date } = req.query; // Get date from query parameters

  if (!date) {
    return res.status(400).json({ message: "Date is required" });
  }

  try {
    // Match the date in the format YYYY-MM-DD
    const bookings = await Booking.find({
      date: date,  // Exact match to the stored date
    });

    // Return the bookings found
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



export default router;
