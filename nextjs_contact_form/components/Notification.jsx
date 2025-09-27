export default function Notification({ type, message }) {
  if (!message) return null;
  const bgColor = type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  return <div className={`${bgColor} px-4 py-2 rounded-md mb-4 transition-all`}>{message}</div>;
}
