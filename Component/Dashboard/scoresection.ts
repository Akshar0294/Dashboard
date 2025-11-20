import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function ScoreSection({ scores = [] }) {
  const getScoreColor = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 75) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreGrade = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-black rounded-2xl p-5 hover-glow transition-all duration-300 border border-red-900 h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center glow-box">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'Orbitron' }}>
          Score
        </h3>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {scores.length > 0 ? (
          scores.map((scoreData, index) => (
            <motion.div
              key={scoreData.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-gradient-to-r from-red-950 to-black rounded-xl p-4 border border-red-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="text-white font-bold text-base mb-2" style={{ fontFamily: 'Orbitron' }}>
                    {scoreData.exam_title}
                  </h4>
                  
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold glow-text ${getScoreColor(scoreData.score, scoreData.total_marks)}`} style={{ fontFamily: 'Orbitron' }}>
                        {scoreData.score} / {scoreData.total_marks}
                      </span>
                    </div>
                    <div className="bg-red-900 bg-opacity-50 rounded-lg px-3 py-1 border border-red-800">
                      <span className="text-white font-bold text-sm" style={{ fontFamily: 'Orbitron' }}>
                        Grade: {getScoreGrade(scoreData.score, scoreData.total_marks)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    {scoreData.exam_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{format(new Date(scoreData.exam_date), 'MMM dd, yyyy')}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{Math.round((scoreData.score / scoreData.total_marks) * 100)}%</span>
                    </div>
                  </div>

                  {scoreData.remarks && (
                    <p className="text-gray-400 text-xs mt-2 italic">{scoreData.remarks}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 text-sm py-8 text-center">
            <Trophy className="w-10 h-10 text-red-900 mx-auto mb-2" />
            <p className="text-xs">No exam scores yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}