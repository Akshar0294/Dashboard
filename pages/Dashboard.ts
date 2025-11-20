import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Send, CheckCircle, Shield, Lock, Database, Cookie } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await base44.entities.ContactMessage.create({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'new'
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting message:', error);
    }

    setIsSending(false);
  };

  const privacyPoints = [
  {
    icon: Database,
    text: "Essential data collection only"
  },
  {
    icon: Shield,
    text: "No data selling or sharing"
  },
  {
    icon: Lock,
    text: "Secure encrypted storage"
  },
  {
    icon: Cookie,
    text: "Cookie control available"
  }];


  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6">

        <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Orbitron' }}>
          Contact <span className="text-red-600 glow-text">Us</span>
        </h1>
        <p className="text-gray-400 text-lg">Get in touch with the VRsecurity team</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column - Contact Info + Privacy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1 flex flex-col gap-4">

          {/* Contact Information Card */}
          <Card className="bg-black border-2 border-red-900 rounded-[24px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
                VRsecurity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Phone */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Phone</p>
                  <a href="tel:+919313471845" className="text-white text-sm font-bold hover:text-red-600 transition-colors">
                    +91 9313471845
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <a href="mailto:info@vrsecurity.in" className="text-white text-sm font-bold hover:text-red-600 transition-colors">
                    info@vrsecurity.in
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-red-950 to-black rounded-xl border border-red-900">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Office</p>
                  <p className="text-white text-xs font-semibold leading-tight">
                    E-705, Ganesh Glory-11, Jagatpur road, Ahmedabad -382470
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy Card */}
          <Card className="bg-black border-2 border-red-900 rounded-[24px] flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-600 glow-text" />
                <CardTitle className="text-white text-xl font-bold tracking-tight" style={{ fontFamily: 'Orbitron' }}>Privacy Policy

                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {privacyPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 p-2 bg-gradient-to-r from-red-950 to-black rounded-lg border border-red-900">

                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center glow-box flex-shrink-0">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-300 text-xs font-medium">{point.text}</p>
                  </motion.div>);

              })}
              <div className="pt-2 text-center">
                <p className="text-gray-500 text-xs">
                  Questions? Contact us at{' '}
                  <a href="mailto:info@vrsecurity.in" className="text-red-600 hover:text-red-400 font-semibold">
                    info@vrsecurity.in
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2">

          <Card className="bg-black text-card-foreground rounded-[24px] shadow-sm border-2 border-red-900 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
                Send Us a Message
              </CardTitle>
              <p className="text-gray-400 text-sm">Fill out the form and we'll get back to you soon</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-gray-300 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Your Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-900 border-red-900 text-white h-10"
                      placeholder="John Doe"
                      required />

                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email Address *</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-900 border-red-900 text-white h-10"
                      placeholder="john@example.com"
                      required />

                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-gray-300 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Phone Number</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gray-900 border-red-900 text-white h-10"
                      placeholder="+91 9876543210" />

                  </div>

                  <div className="space-y-1">
                    <Label className="text-gray-300 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Subject *</Label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-gray-900 border-red-900 text-white h-10"
                      placeholder="How can we help?"
                      required />

                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-gray-300 text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message *</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gray-900 border-red-900 text-white h-32 resize-none"
                    placeholder="Tell us what you need..."
                    required />

                </div>

                {success &&
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-green-900 bg-opacity-30 border border-green-600 rounded-xl">

                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-green-500 font-semibold text-sm">Message sent successfully! We'll respond soon.</p>
                  </motion.div>
                }

                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-[#8B0000] hover:bg-[#b30000] text-white font-bold py-5 text-base">

                  {isSending ?
                  <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" />
                      Sending...
                    </> :

                  <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  }
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>);

}