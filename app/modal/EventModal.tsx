import { X } from "lucide-react";

type Event = {
  id: string;
  caseNumber: string;
  date: string;
  time: string;
  arbitrator: string;
  claimant: string;
  respondent: string;
};

const EventModal = ({
  selectedEvent,
  onClose,
}: {
  selectedEvent: Event;
  onClose: () => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black z-[999] bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-90 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold mb-4">
          Case {selectedEvent.caseNumber} Details
        </h2>
        <div className="space-y-2">
          <div>
            <span className="font-semibold">Date:</span> {selectedEvent.date}
          </div>
          <div>
            <span className="font-semibold">Time:</span> {selectedEvent.time}
          </div>
          <div>
            <span className="font-semibold">Arbitrator:</span>{" "}
            {selectedEvent.arbitrator}
          </div>
          <div>
            <span className="font-semibold">Claimant:</span>{" "}
            {selectedEvent.claimant}
          </div>
          <div>
            <span className="font-semibold">Respondent:</span>{" "}
            {selectedEvent.respondent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
