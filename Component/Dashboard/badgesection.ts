import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';

export default function BadgesSection({ badges = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-black rounded-2xl p-5 hover-glow transition-all duration-300 border border-red-900 h-full">

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center glow-box">
          <Award className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-white text-lg font-bold normal-case" style={{ fontFamily: 'Orbitron' }}>Earned Badges

        </h3>
      </div>

      <div className="space-y-2">
        {badges.length > 0 ?
        badges.map((badge, index) =>
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 + index * 0.1 }}
          className="flex items-center gap-2 bg-gradient-to-r from-red-950 to-black rounded-xl p-3 border border-red-900">

              <Trophy className="w-4 h-4 text-red-600" />
              <span className="text-white font-semibold text-sm">{badge}</span>
            </motion.div>
        ) :

        <div className="text-gray-500 text-sm py-6 text-center">
            <Trophy className="w-10 h-10 text-red-900 mx-auto mb-2" />
            <p className="text-xs">Keep learning to unlock new achievements!</p>
          </div>
        }
      </div>
    </motion.div>);

}