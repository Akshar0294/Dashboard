import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function ExamLinksSection({ examLinks = [] }) {
  const handleOpenExam = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-black rounded-2xl p-5 hover-glow transition-all duration-300 border border-red-900 h-full"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center glow-box">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-white text-lg font-bold" style={{ fontFamily: 'Orbitron' }}>
          Student Exam Links
        </h3>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {examLinks.length > 0 ? (
          examLinks.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gradient-to-r from-red-950 to-black rounded-xl p-4 border border-red-900 hover-glow transition-all cursor-pointer"
              onClick={() => handleOpenExam(exam.exam_url)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="text-white font-bold text-base mb-1" style={{ fontFamily: 'Orbitron' }}>
                    {exam.exam_title}
                  </h4>
                  {exam.exam_description && (
                    <p className="text-gray-400 text-xs mb-2">{exam.exam_description}</p>
                  )}
                  {exam.due_date && (
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>Due: {format(new Date(exam.due_date), 'MMM dd, yyyy')}</span>
                    </div>
                  )}
                </div>
                <Button
                  size="sm"
                  className="bg-[#8B0000] hover:bg-[#b30000] text-white font-bold flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenExam(exam.exam_url);
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 text-sm py-8 text-center">
            <FileText className="w-10 h-10 text-red-900 mx-auto mb-2" />
            <p className="text-xs">No exam links available</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}