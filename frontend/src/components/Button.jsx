export default function Button({
  children,
  onClick,
  variant = "primary",
  className = ""
}) {
  const base =
    variant === "primary" ? "primary-btn" : "secondary-btn";

  return (
    <button onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
