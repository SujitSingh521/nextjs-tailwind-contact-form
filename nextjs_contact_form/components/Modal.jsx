// Modal component to display success or error messages
export default function Modal({ show, message, type, onClose }) {
  // If 'show' prop is false, do not render the modal
  if (!show) return null;

  // Determine background color of the header based on the 'type' prop
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    // Overlay that covers the entire screen with semi-transparent black background
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      
      {/* Modal container with white background, padding, rounded corners and shadow */}
      <div className="bg-white p-6 rounded-md shadow-lg w-80 text-center relative">
        
        {/* Header with dynamic background color and text */}
        <h2 className={`text-white font-bold text-lg ${bgColor} p-2 rounded-md`}>
          {type === "success" ? "Success" : "Error"}
        </h2>
        
        {/* Message content */}
        <p className="mt-4 text-gray-700">{message}</p>
        
        {/* Close button that triggers the onClose callback */}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
