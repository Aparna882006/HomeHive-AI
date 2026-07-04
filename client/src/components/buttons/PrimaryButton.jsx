import { Link } from "react-router-dom";

function PrimaryButton({
  text,
  to = "/",
  className = "",
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center
      px-8 py-4
      rounded-2xl
      bg-[#2E7D32]
      hover:bg-[#25692A]
      text-white
      font-semibold
      shadow-xl
      transition-all
      duration-300
      hover:-translate-y-1
      ${className}`}
    >
      {text}
    </Link>
  );
}

export default PrimaryButton;