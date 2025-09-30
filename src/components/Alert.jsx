export default function Alert({ type = "info", message }) {
  const baseClasses = "p-4 mb-4 rounded-lg font-semibold shadow";
  const typeClasses = {
    info: "bg-blue-100 text-blue-800 border border-blue-300",
    success: "bg-green-100 text-green-800 border border-green-300",
    error: "bg-red-100 text-red-800 border border-red-300",
    warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  };
  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      {message}
    </div>
  );
}
