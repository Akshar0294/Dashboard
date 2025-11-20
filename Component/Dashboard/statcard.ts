import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, subtitle, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }} className="bg-black px-4 py-5 rounded-2xl hover-glow transition-all duration-300 border border-red-900">


      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white text-lg font-bold normal-case tracking-wider">
          {title}
        </h3>
        {Icon && <Icon className="w-5 h-5 text-red-600" />}
      </div>
      
      <div className="mt-2">
        <p className="text-3xl font-bold text-red-600 glow-text mb-1" style={{ fontFamily: 'Orbitron' }}>
          {value}
        </p>
        {subtitle &&
        <p className="text-gray-500 text-xs font-medium">
            {subtitle}
          </p>
        }
      </div>
    </motion.div>);

}