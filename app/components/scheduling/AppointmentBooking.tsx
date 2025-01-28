import moment from "moment";
import React, { useEffect, useState } from "react";
import SlotButton from "./SlotButton";
import { useSelectedDate } from "../../context/SelectedDateContext";
import { useScheduler } from "../../context/SchedulerContext";

const AppointmentBooking = () => {
  const { selectedDate } = useSelectedDate();
  const { bookingVersion, setBookingVersion } = useScheduler();
  const [selectedArbitrator, setSelectedArbitrator] = useState<string>("all");
  const [availableSlot, setAvailableSlot] = useState<{
    date: string;
    slots: Array<{
      id: string;
      caseNumber: string;
      date: string;
      time: string;
      duration: string;
      arbitrator: string;
      claimant: string;
      respondent: string;
      end_time: string;
    }>;
  }>({ date: "", slots: [] });

  useEffect(() => {
    // Get sessions from localStorage and format them
    const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
    const formattedSlots = {
      date: selectedDate.toISOString().split("T")[0],
      slots: sessions,
    };
    setAvailableSlot(formattedSlots);
  }, [selectedDate, bookingVersion]);

  // New effect to listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
      const formattedSlots = {
        date: selectedDate.toISOString().split("T")[0],
        slots: sessions,
      };
      setAvailableSlot(formattedSlots);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [selectedDate]);

  // Get unique arbitrators from slots
  const arbitrators = [
    "all",
    ...new Set(availableSlot.slots.map((slot) => slot.arbitrator)),
  ];

  // Filter slots based on selected arbitrator and date
  const filteredSlots = availableSlot.slots.filter((slot) => {
    const slotDate = new Date(slot.date).toDateString();
    const selectedDateString = selectedDate.toDateString();

    return (
      slotDate === selectedDateString &&
      (selectedArbitrator === "all" || slot.arbitrator === selectedArbitrator)
    );
  });

  const handleBookingChange = () => {
    setBookingVersion((v: number) => v + 1);
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="main-booking-appointment-component">
        {/* calender */}
        <div className="booking-appointment">
          <div className="time-slot">
            {/* Arbitrators Dropdown */}
            <select
              value={selectedArbitrator}
              onChange={(e) => setSelectedArbitrator(e.target.value)}
              className="arbitrator-dropdown"
              style={{
                padding: "8px",
                marginBottom: "10px",
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            >
              {arbitrators.map((arbitrator, index) => (
                <option key={index} value={arbitrator}>
                  {arbitrator === "all" ? "All Arbitrators" : arbitrator}
                </option>
              ))}
            </select>
            <div className="divider"></div>

            <div className="available-slot-text">
              {moment(selectedDate).format("dddd, MMM D")}
            </div>

            <div
              className="no-scrollbar"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                height: "244px",
                overflowY: "auto",
              }}
            >
              <>
                {filteredSlots.length === 0 ? (
                  <div
                    style={{
                      alignSelf: "center",
                      margin: "auto",
                    }}
                  >
                    No slots available
                  </div>
                ) : (
                  <>
                    {filteredSlots.map((el, i) => (
                      <React.Fragment key={i}>
                        <SlotButton
                          el={el}
                          onBookingChange={handleBookingChange} // This prop needs to be passed
                        />
                      </React.Fragment>
                    ))}
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
