"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SuccessPopup({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 flex items-center justify-center z-[9999] 
                     bg-black/40 backdrop-blur-sm"
        >
          <div className="bg-black/60 p-10 rounded-3xl shadow-2xl border border-white/10 flex flex-col items-center">
            <CheckCircle size={160} className="text-green-500 mb-4" />
            <p className="text-white text-xl font-semibold">Uploaded Successfully</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
