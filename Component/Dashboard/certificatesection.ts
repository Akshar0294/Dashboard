import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function CertificatesSection({ count = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-black rounded-3xl p-6 hover-glow transition-all duration-300 border border-red-900"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center glow-box">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
          Certificates
        </h3>
      </div>

      <div className="text-center py-4">
        <p className="text-5xl font-bold text-red-600 glow-text mb-2" style={{ fontFamily: 'Orbitron' }}>
          {count}
        </p>
        <p className="text-gray-500 text-sm">
          {count === 0 
            ? 'Complete your first course to earn a professional certificate' 
            : 'Professional achievements'}
        </p>
      </div>
    </motion.div>
  );
}