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
    <div className="fixed inset-0 bg-black z-[999] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Session Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="font-medium">Case Number</label>
            <p className="text-gray-600">{selectedEvent.caseNumber}</p>
          </div>

          <div>
            <label className="font-medium">Date</label>
            <p className="text-gray-600">
              {new Date(selectedEvent.date).toLocaleDateString()}
            </p>
          </div>

          <div>
            <label className="font-medium">Time</label>
            <p className="text-gray-600">{selectedEvent.time}</p>
          </div>

          <div>
            <label className="font-medium">Arbitrator</label>
            <p className="text-gray-600">{selectedEvent.arbitrator}</p>
          </div>

          <div>
            <label className="font-medium">Claimant</label>
            <p className="text-gray-600">{selectedEvent.claimant}</p>
          </div>

          <div>
            <label className="font-medium">Respondent</label>
            <p className="text-gray-600">{selectedEvent.respondent}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            className={`px-4 py-2 rounded-md text-white ${"bg-gray-600 hover:bg-gray-700"}`}
          >
            {"Delete session"}
          </button>

          <button
            // onClick={() => setIsDeleting(false)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
