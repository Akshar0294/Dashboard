import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Download, Award, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

export default function CertificatesDisplay({ certificates = [], studentName }) {
  const downloadCertificate = (cert) => {
    if (!cert.certificate_url) return;
    
    // Create a temporary link to download the certificate
    const link = document.createElement('a');
    link.href = cert.certificate_url;
    link.download = `${cert.certificate_name.replace(/\s+/g, '_')}_Certificate`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewCertificate = (cert) => {
    if (!cert.certificate_url) return;
    window.open(cert.certificate_url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="bg-black rounded-2xl p-5 hover-glow transition-all duration-300 border border-red-900"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center glow-box">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
          My Certificates
        </h3>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {certificates.length > 0 ? (
          certificates.map((cert, index) => (
            <motion.div
              key={cert.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gradient-to-r from-red-950 to-black rounded-xl p-4 border border-red-900"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-red-600" />
                    <p className="text-white font-bold text-sm">{cert.certificate_name}</p>
                  </div>
                  <p className="text-gray-400 text-xs mb-1">{cert.course_name}</p>
                  {cert.issue_date && (
                    <p className="text-gray-500 text-xs">
                      Issued: {format(new Date(cert.issue_date), 'MMM d, yyyy')}
                    </p>
                  )}
                  {cert.certificate_id && (
                    <p className="text-gray-600 text-xs mt-1">
                      ID: {cert.certificate_id}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => viewCertificate(cert)}
                    size="sm"
                    variant="outline"
                    className="bg-gray-900 border-red-900 text-white hover:bg-red-950 font-bold text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button
                    onClick={() => downloadCertificate(cert)}
                    size="sm"
                    className="bg-[#8B0000] hover:bg-[#b30000] text-white font-bold text-xs"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-gray-500 text-sm py-8 text-center">
            <FileText className="w-12 h-12 text-red-900 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-semibold text-gray-400">No Certificates Yet</p>
            <p className="text-xs text-gray-600 mt-2">
              Certificates will appear here when assigned by admin
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}