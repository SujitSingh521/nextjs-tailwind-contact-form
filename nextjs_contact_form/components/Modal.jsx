export default function Modal({ show, message, type, onClose }) {
  if (!show) return null;
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fadeIn px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center relative transition-transform duration-300 scale-100">
        <h2 className={`text-white font-bold text-lg ${bgColor} p-2 rounded-md`}>
          {type === "success" ? "✅ Success" : "❌ Error"}
        </h2>
        <div className="mt-4 text-gray-700">{message}</div>
        <button onClick={onClose} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Close
        </button>
      </div>
    </div>
  );
}
