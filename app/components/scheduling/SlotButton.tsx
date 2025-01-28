import React, { useState, useEffect } from "react";

interface Slot {
  id: string | number;
  time: string;
  end_time: string;
  arbitrator: string;
}

const SlotButton = ({
  el,
  onBookingChange,
}: {
  el: Slot;
  onBookingChange?: () => void;
}) => {
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const bookedSlots = JSON.parse(
      localStorage.getItem("booked_slots") || "[]"
    ) as Slot[];
    setIsBooked(bookedSlots.some((slot) => slot.id === el.id));
  }, [el.id]);

  const handleBooking = () => {
    const bookedSlots = JSON.parse(
      localStorage.getItem("booked_slots") || "[]"
    );

    if (!isBooked) {
      const updatedBookings = [...bookedSlots, el];
      localStorage.setItem("booked_slots", JSON.stringify(updatedBookings));
      setIsBooked(true);
      onBookingChange?.();
    }
  };

  return (
    <div
      className="relative flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-2"
      style={{
        background: isBooked ? "#E5E7EB" : "white",
      }}
    >
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">
          {el?.time} - {el?.end_time}
        </span>
        <span className="text-sm text-gray-500">
          Arbitrator: {el?.arbitrator}
        </span>
      </div>

      {isBooked ? (
        <span className="px-3 py-1 text-sm text-gray-500 bg-gray-100 rounded">
          Booked
        </span>
      ) : (
        <button
          onClick={handleBooking}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isBooked}
        >
          Book Slot
        </button>
      )}
    </div>
  );
};

export default SlotButton;
