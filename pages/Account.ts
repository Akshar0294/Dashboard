import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, MapPin, Camera, Save, X, Shield, Edit } from 'lucide-react';

export default function Account() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me()
  });

  const { data: students, isLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => base44.entities.Student.list(),
    initialData: [],
    enabled: !!user
  });

  const currentStudent = students.find((s) => s.created_by === user?.email);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone_number: '',
    address: ''
  });

  useEffect(() => {
    if (currentStudent) {
      setFormData({
        name: currentStudent.name || '',
        username: currentStudent.username || '',
        phone_number: currentStudent.phone_number || '',
        address: currentStudent.address || ''
      });
    }
  }, [currentStudent]);

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Student.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      setIsEditing(false);
    }
  });

  const handleSave = async () => {
    if (currentStudent) {
      await updateStudentMutation.mutateAsync({
        id: currentStudent.id,
        data: formData
      });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      
      if (currentStudent) {
        await updateStudentMutation.mutateAsync({
          id: currentStudent.id,
          data: { profile_picture_url: file_url }
        });
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    setUploading(false);
  };

  if (isLoading || !currentStudent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: 'Orbitron' }}>
          Account <span className="text-red-600 glow-text">Settings</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your profile and account information
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Profile Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card className="bg-black border-2 border-red-900 rounded-[24px] sticky top-6">
            <CardContent className="pt-8 pb-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-3 border-red-900 flex items-center justify-center overflow-hidden glow-box">
                    {currentStudent.profile_picture_url ? (
                      <img 
                        src={currentStudent.profile_picture_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#8B0000] hover:bg-[#b30000] rounded-full flex items-center justify-center cursor-pointer border-2 border-black transition-all">
                    <Camera className="w-4 h-4 text-white" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>

                {uploading && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-red-600"></div>
                    <p className="text-red-600 text-sm font-semibold">Uploading...</p>
                  </div>
                )}

                <h2 className="text-xl font-bold text-white mb-1 text-center" style={{ fontFamily: 'Orbitron' }}>
                  {currentStudent.name || 'Student Name'}
                </h2>
                <p className="text-gray-400 text-sm">@{currentStudent.username || 'username'}</p>
              </div>

              {/* Student ID */}
              <div className="bg-gradient-to-r from-red-950 to-black rounded-xl p-4 border border-red-900">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Student ID</p>
                    <p className="text-white text-sm font-bold glow-text" style={{ fontFamily: 'Orbitron' }}>
                      {currentStudent.student_id}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Content - Information Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Information Card */}
          <Card className="bg-black border-2 border-red-900 rounded-[24px]">
            <CardHeader className="border-b border-red-900 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
                  Personal Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="bg-[#8B0000] hover:bg-[#b30000] text-white font-bold"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {!isEditing ? (
                <div className="space-y-4">
                  {/* Full Name */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900 hover-glow transition-all">
                    <div className="w-11 h-11 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Full Name</p>
                      <p className="text-white text-base font-semibold">{currentStudent.name || 'Not provided'}</p>
                    </div>
                  </div>

                  {/* Username */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900 hover-glow transition-all">
                    <div className="w-11 h-11 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Username</p>
                      <p className="text-white text-base font-semibold">@{currentStudent.username || 'Not provided'}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900 hover-glow transition-all">
                    <div className="w-11 h-11 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Email Address</p>
                      <p className="text-white text-base font-semibold">{user?.email || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300 text-sm font-medium">Full Name</Label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-gray-900 border-red-900 text-white h-11"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300 text-sm font-medium">Username</Label>
                      <Input
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="bg-gray-900 border-red-900 text-white h-11"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-[#8B0000] hover:bg-[#b30000] text-white font-bold h-11"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      onClick={() => setIsEditing(false)}
                      variant="outline"
                      className="border-red-900 text-white hover:bg-red-950 h-11"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information Card */}
          <Card className="bg-black border-2 border-red-900 rounded-[24px]">
            <CardHeader className="border-b border-red-900 pb-4">
              <CardTitle className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {!isEditing ? (
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900 hover-glow transition-all">
                    <div className="w-11 h-11 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Phone Number</p>
                      <p className="text-white text-base font-semibold">{currentStudent.phone_number || 'Not provided'}</p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900 hover-glow transition-all">
                    <div className="w-11 h-11 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-xs mb-1">Address</p>
                      <p className="text-white text-base font-semibold">{currentStudent.address || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm font-medium">Phone Number</Label>
                    <Input
                      value={formData.phone_number}
                      onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                      className="bg-gray-900 border-red-900 text-white h-11"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300 text-sm font-medium">Address</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="bg-gray-900 border-red-900 text-white h-11"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}