function GlassCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
      backdrop-blur-xl
      bg-white/70
      border
      border-white/60
      rounded-3xl
      shadow-xl
      p-8
      ${className}
      `}
    >
      {children}
    </div>
  );
}

export default GlassCard;