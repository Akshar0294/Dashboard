import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Play, X, Shield, Laptop, Cpu, Fingerprint, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Modules() {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => base44.entities.Student.list(),
    initialData: []
  });

  const { data: modules, isLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: () => base44.entities.Module.list('module_number'),
    initialData: []
  });

  const currentStudent = students.find((s) => s.created_by === user?.email);

  // Filter active modules only
  const activeModules = modules.filter((m) => m.is_active !== false);

  // Domain configuration
  const domains = [
    {
      name: 'Cyber Security',
      icon: Shield
    },
    {
      name: 'Ethical Hacking',
      icon: Laptop
    },
    {
      name: 'SOC',
      icon: Cpu
    },
    {
      name: 'Digital Forensics',
      icon: Fingerprint
    }
  ];

  const getEmbedUrl = (url) => {
    if (!url) return '';

    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }

    return url;
  };

  // Mock completion status - you can replace with actual data from backend
  const isModuleCompleted = (moduleId) => {
    // Replace with actual completion logic
    return false;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Check if student has active course
  if (!currentStudent?.active_courses || currentStudent.active_courses === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <BookOpen className="w-24 h-24 text-red-900 opacity-50 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Orbitron' }}>
            No Active Course
          </h2>
          <p className="text-gray-400 text-lg">
            Enroll in a course to access learning modules
          </p>
        </div>
      </div>
    );
  }

  // Domain Selection View
  if (!selectedDomain) {
    return (
      <div className="max-w-7xl mx-auto min-h-[calc(100vh-120px)] flex flex-col items-center justify-center px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-white text-3xl md:text-5xl font-bold mb-3 md:mb-4" style={{ fontFamily: 'Orbitron' }}>
            Course <span className="text-red-600 glow-text">Modules</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl">
            Select a domain to view your learning modules
          </p>
        </motion.div>

        {/* Compact Domain Grid - 2x2 Centered with Same Gradient */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl">
          {domains.map((domain, index) => {
            const Icon = domain.icon;
            const domainModules = activeModules.filter((m) => m.domain === domain.name);
            
            return (
              <motion.div
                key={domain.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => domainModules.length > 0 && setSelectedDomain(domain.name)}
                className={`rounded-[32px] transition-all ${domainModules.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover-glow'}`}
              >
                <Card className="bg-gradient-to-br from-red-950 to-black border-2 border-red-900 rounded-[32px] h-[160px] md:h-[200px]">
                  <CardContent className="flex flex-col items-center justify-center h-full p-4 md:p-6">
                    <div className="w-14 h-14 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center glow-box mb-3 md:mb-4">
                      <Icon className="w-7 h-7 md:w-10 md:h-10 text-white" />
                    </div>
                    
                    <h2 className="text-lg md:text-2xl font-bold text-white text-center mb-2 md:mb-3" style={{ fontFamily: 'Orbitron' }}>
                      {domain.name}
                    </h2>
                    
                    <div className="bg-black bg-opacity-50 rounded-xl px-3 py-1.5 md:px-4 md:py-2 border border-red-900">
                      <p className="text-red-600 font-bold text-xs md:text-base glow-text" style={{ fontFamily: 'Orbitron' }}>
                        {domainModules.length} {domainModules.length === 1 ? 'Module' : 'Modules'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Modules Grid View (3x3) for selected domain
  const domainModules = activeModules.filter((m) => m.domain === selectedDomain);
  const currentDomain = domains.find((d) => d.name === selectedDomain);
  const DomainIcon = currentDomain.icon;

  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-120px)] flex flex-col px-4">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 md:mb-6"
      >
        <Button
          onClick={() => setSelectedDomain(null)}
          variant="outline"
          className="bg-[#000000] text-white mb-3 md:mb-4 px-4 py-2 text-sm font-medium rounded-md border border-red-900 hover:bg-red-950"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Domains
        </Button>
        
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-xl flex items-center justify-center glow-box">
            <DomainIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-white text-2xl md:text-4xl font-bold" style={{ fontFamily: 'Orbitron' }}>
              <span className="text-red-600 glow-text">{selectedDomain}</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-lg">
              {domainModules.length} modules available
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modules Grid - Responsive 2x2 on mobile, 3x3 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 flex-1 pb-6">
        {domainModules.slice(0, 9).map((module, idx) => {
          const completed = isModuleCompleted(module.id);
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setSelectedModule(module)}
              className="cursor-pointer hover-glow transition-all"
            >
              <Card className="bg-gradient-to-br from-red-950 to-black border-2 border-red-900 rounded-[24px] md:rounded-[32px] h-full relative overflow-hidden">
                <CardContent className="flex flex-col h-full p-4 md:p-5">
                  {/* Completion Badge */}
                  {completed && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-8 md:h-8 bg-green-600 rounded-full flex items-center justify-center glow-box z-10">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  )}

                  {/* Module Icon */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-xl flex items-center justify-center glow-box mb-3 md:mb-4">
                    <DomainIcon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Module Number */}
                  <div className="mb-1 md:mb-2">
                    <p className="text-red-500 text-xs md:text-sm font-bold" style={{ fontFamily: 'Orbitron' }}>
                      Module {module.module_number}
                    </p>
                  </div>

                  {/* Module Title */}
                  <h3 className="text-white font-bold text-sm md:text-lg mb-3 line-clamp-2 flex-1" style={{ fontFamily: 'Orbitron' }}>
                    {module.module_title}
                  </h3>

                  {/* Watch Button */}
                  <div className="mt-auto">
                    <Button className="w-full bg-[#8B0000] hover:bg-[#b30000] text-white font-bold text-xs md:text-sm py-2">
                      <Play className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border-2 border-red-900 rounded-2xl p-4 md:p-6 max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1 pr-4">
                  <h2 className="text-lg md:text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Orbitron' }}>
                    Module {selectedModule.module_number}: {selectedModule.module_title}
                  </h2>
                  <p className="text-gray-400 text-sm md:text-base">{selectedModule.domain}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedModule(null)}
                  className="text-red-600 hover:text-red-400 flex-shrink-0"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>

              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-3 md:mb-4">
                <iframe
                  src={getEmbedUrl(selectedModule.video_url)}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {selectedModule.description && (
                <div className="bg-gradient-to-r from-red-950 to-black rounded-xl p-3 md:p-4 border border-red-900">
                  <h3 className="text-white font-bold mb-2 text-sm md:text-base">About this module:</h3>
                  <p className="text-gray-400 text-xs md:text-sm">{selectedModule.description}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}