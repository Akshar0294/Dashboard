import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LayoutDashboard, Shield, Mail, UserCircle, BookOpen } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: students } = useQuery({
    queryKey: ['students'],
    queryFn: () => base44.entities.Student.list(),
    initialData: []
  });

  const currentStudent = students.find((s) => s.created_by === user?.email) || students[0];
  const hasActiveCourse = currentStudent?.active_courses > 0;

  return (
    <div className="bg-[#2e0000] min-h-screen relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght:400;500;600;700;800;900&family=Rajdhani:wght:300;400;500;600;700&display=swap');
        
        :root {
          --maroon-dark: #4c0000;
          --black: #000000;
          --red-accent: #b30000;
          --red-bright: #ff0000;
          --text-white: #FFFFFF;
        }
        
        body {
          font-family: 'Rajdhani', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Orbitron', sans-serif;
        }
        
        .cyber-gradient {
          background: linear-gradient(135deg, #4c0000 0%, #000000 100%);
        }
        
        .glow-text {
          text-shadow: 0 0 20px rgba(179, 0, 0, 0.8);
        }
        
        .glow-box {
          box-shadow: 0 0 30px rgba(179, 0, 0, 0.3);
        }
        
        .hover-glow:hover {
          box-shadow: 0 0 40px rgba(179, 0, 0, 0.6);
          transform: translateY(-2px);
        }
      `}</style>

      {/* Animated background */}
      <div className="cyber-gradient fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-red-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="bg-[#1f1919] fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-red-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-500 glow-text" />
              <h1 className="text-2xl font-bold text-red-500" style={{ fontFamily: 'Orbitron' }}>
                VRsecurity
              </h1>
            </div>
            
            {/* Centered Navigation Links */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
              <Link
                to={createPageUrl("Dashboard")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold hover-glow ${
                location.pathname === createPageUrl("Dashboard") ?
                'bg-gradient-to-r from-[#8B0000] to-[#b30000] text-white glow-box' :
                'bg-[#8B0000] text-white hover:bg-[#b30000]'}`
                }>
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>

              {hasActiveCourse && (
                <Link
                  to={createPageUrl("Modules")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold hover-glow ${
                  location.pathname === createPageUrl("Modules") ?
                  'bg-gradient-to-r from-[#8B0000] to-[#b30000] text-white glow-box' :
                  'bg-[#8B0000] text-white hover:bg-[#b30000]'}`
                  }>
                  <BookOpen className="w-5 h-5" />
                  <span>Modules</span>
                </Link>
              )}
              
              <Link
                to={createPageUrl("Contact")}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-bold hover-glow ${
                location.pathname === createPageUrl("Contact") ?
                'bg-gradient-to-r from-[#8B0000] to-[#b30000] text-white glow-box' :
                'bg-[#8B0000] text-white hover:bg-[#b30000]'}`
                }>
                <Mail className="w-5 h-5" />
                <span>Contact Us</span>
              </Link>
            </div>

            {/* Account Icon */}
            <Link
              to={createPageUrl("Account")}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-2 border-red-900 flex items-center justify-center hover-glow transition-all overflow-hidden"
            >
              {currentStudent?.profile_picture_url ? (
                <img 
                  src={currentStudent.profile_picture_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle className="w-8 h-8 text-white" />
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="bg-[#2e0000] pt-24 pb-12 px-6">
        {children}
      </main>
    </div>
  );
}