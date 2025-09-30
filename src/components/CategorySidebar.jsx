export default function Alert({ type = "info", message }) {
  const baseClasses = "p-4 mb-4 rounded";
  const typeClasses = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>{message}</div>
  );
}