import React from 'react';
import { motion } from 'framer-motion';
import { Shield, TrendingUp, BookOpen } from 'lucide-react';

export default function LearningJourney({ courseName, progress }) {
  const isStarted = courseName && courseName !== 'Not Started';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="bg-black rounded-2xl p-6 hover-glow transition-all duration-300 border border-red-900 h-full"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-red-600 glow-text mb-1" style={{ fontFamily: 'Orbitron' }}>
          Your Learning Journey
        </h2>
        <p className="text-gray-400 text-sm">
          {isStarted ? 'Track your progress and continue learning' : 'Begin your cybersecurity journey'}
        </p>
      </div>

      <div className="bg-gradient-to-br from-red-950 to-black rounded-xl p-5 border border-red-900">
        {isStarted ? (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center glow-box">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: 'Orbitron' }}>
                  {courseName}
                </h3>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Active Course
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-red-600 glow-text" style={{ fontFamily: 'Orbitron' }}>
                  {progress}%
                </p>
                <p className="text-gray-500 text-xs">Complete</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Course Progress</span>
                <span className="text-red-600 font-semibold">{progress}%</span>
              </div>
              <div className="relative h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                  style={{ boxShadow: '0 0 20px rgba(179, 0, 0, 0.8)' }}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center glow-box mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron' }}>
              No Active Course
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Your learning journey starts here! Enroll in a course to begin tracking your progress.
            </p>
            <div className="relative h-2.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-red-600 to-red-500 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-xs mt-2">0% Complete</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}