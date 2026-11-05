import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Code2,
  Send,
  Copy,
  Check,
  MessageSquare
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { email, phone, location, profiles } = PORTFOLIO_DATA.personal;
  const { heading } = PORTFOLIO_DATA.contact;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    soundEffects.playSelect();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject';
    if (!formData.message.trim()) errs.message = 'Please write your message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    soundEffects.playSelect();
    setSubmitted(true);

    // Prepare mailto link with encoded subject and body for real delivery fallback
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      `[Portfolio Contact] ${formData.subject} - from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    // Open user's default email client with populated text
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-[#020205]">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-3">
            <MessageSquare size={13} />
            <span>08 &bull; GET IN TOUCH</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {heading}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full mx-auto mt-4" />
        </div>

        {/* 2-Column Contact Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info & Social Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Description Text */}
            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="text-white font-medium">
                I&apos;m always excited to explore new ideas, collaborate on creative projects, and connect with people who share a passion for technology and design.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                Have an opportunity or an interesting idea? Let&apos;s connect and bring it to life. Let&apos;s build something remarkable together!
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              
              {/* Email Card */}
              <div
                onMouseEnter={() => soundEffects.playHover()}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-purple-500/15 text-purple-300 flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  title="Copy email address"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedField === 'email' ? (
                    <Check size={15} className="text-emerald-400" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              {/* Telephone Card */}
              <div
                onMouseEnter={() => soundEffects.playHover()}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/15 text-cyan-300 flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Direct Telephone
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  title="Copy telephone number"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white transition-colors"
                >
                  {copiedField === 'phone' ? (
                    <Check size={15} className="text-emerald-400" />
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/15 text-indigo-300 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {location}
                  </span>
                </div>
              </div>

            </div>

            {/* Social Profiles Grid */}
            <div className="pt-4">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-3">
                Professional Network Profiles
              </span>
              <div className="grid grid-cols-3 gap-3">
                {/* LinkedIn */}
                <a
                  href={profiles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundEffects.playHover()}
                  className="p-3.5 rounded-2xl bg-[#090918] border border-white/10 hover:border-purple-500/40 text-center flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-105"
                >
                  <Linkedin size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-white">LinkedIn</span>
                </a>

                {/* GitHub */}
                <a
                  href={profiles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundEffects.playHover()}
                  className="p-3.5 rounded-2xl bg-[#090918] border border-white/10 hover:border-cyan-500/40 text-center flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-105"
                >
                  <Github size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-white">GitHub</span>
                </a>

                {/* LeetCode */}
                <a
                  href={profiles.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundEffects.playHover()}
                  className="p-3.5 rounded-2xl bg-[#090918] border border-white/10 hover:border-amber-500/40 text-center flex flex-col items-center gap-2 group transition-all duration-300 hover:scale-105"
                >
                  <Code2 size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-white">LeetCode</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-purple-500/40 via-white/10 to-cyan-500/20 shadow-2xl">
              <div className="rounded-[23px] bg-[#080816]/95 backdrop-blur-2xl p-6 sm:p-9 border border-white/10">
                
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                  Send a Message
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-6">
                  Fill in the details below. Opens your default mail client directly with your message pre-formatted.
                </p>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-purple-950/40 border border-purple-500/40 text-center space-y-3 animate-in fade-in">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check size={24} />
                    </div>
                    <h4 className="font-display text-lg font-bold text-white">
                      Message Prepared &amp; Email Client Launched!
                    </h4>
                    <p className="text-xs text-slate-300">
                      If your mail application didn&apos;t automatically open, feel free to send a direct message to{' '}
                      <a href={`mailto:${email}`} className="text-cyan-400 underline">
                        {email}
                      </a>
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="px-4 py-2 rounded-full text-xs font-mono bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                        />
                        {errors.name && (
                          <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. john@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                        />
                        {errors.email && (
                          <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Internship Opportunity / Design Project"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                      />
                      {errors.subject && (
                        <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="text-xs font-mono text-slate-300 uppercase tracking-wider block mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your vision, role, or collaboration idea..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 focus:border-purple-500 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors resize-none"
                      />
                      {errors.message && (
                        <span className="text-[11px] text-rose-400 font-mono mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      onMouseEnter={() => soundEffects.playHover()}
                      className="w-full py-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 shadow-[0_0_25px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      <span>Send Direct Message</span>
                    </button>

                  </form>
                )}

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
