export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 
      hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
