import { motion } from "framer-motion";

function SectionTitle({
  badge,
  title,
  subtitle,
  center = true,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${center ? "text-center" : ""} mb-16`}
    >
      {badge && (
        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-5">
          {badge}
        </span>
      )}

      <h2 className="text-4xl lg:text-5xl font-bold text-[#263238]">
        {title}
      </h2>

      <p className="mt-5 text-gray-600 max-w-2xl mx-auto leading-8">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default SectionTitle;