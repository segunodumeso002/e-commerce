export default function ThemedButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 text-white font-bold px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform duration-150 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}