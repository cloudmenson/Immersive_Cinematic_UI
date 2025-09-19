import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface IButton {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: IButton) => {
  return (
    <motion.button
      onClick={onClick}
      animate={{ scale: 1, opacity: 1 }}
      initial={{ scale: 0.95, opacity: 0 }}
      className="relative cursor-pointer px-10 py-4 uppercase tracking-[2px] font-bold text-green-200 border-2 border-green-400/70 rounded-xl overflow-hidden bg-gradient-to-b from-green-900/30 to-green-800/10 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
    >
      <span className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(34,197,94,0.25)_0,rgba(34,197,94,0.25)_1px,transparent_1px,transparent_2px)] pointer-events-none" />

      <span className="relative flex items-center gap-2 justify-center z-10">
        {text} <ArrowRight className="w-5 h-5 text-green-300" />
      </span>

      <motion.span
        initial={{ opacity: 0 }}
        whileTap={{ scale: 0.98 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-green-400/20 blur-md z-10"
      />
    </motion.button>
  );
};
