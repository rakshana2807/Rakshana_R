import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { soundEffects } from '../ui/SoundEffects';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

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
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    soundEffects.playSelect();
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    soundEffects.playSelect();
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative py-32 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#9B6DFF] block mb-2">
            08 &bull; CONTACT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F5F5F7]">
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A4A4B0] font-light max-w-2xl leading-relaxed">
            Have an opportunity, creative collaboration, or project in mind? Reach out directly or send a message below.
          </p>
        </div>

        {/* 2-Column Minimal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Details & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              
              {/* Email */}
              <div className="p-4 rounded-xl bg-[#0D0E15]/50 border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#A4A4B0]/60 uppercase tracking-wider block">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs sm:text-sm font-medium text-[#F5F5F7] hover:text-[#9B6DFF] transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-1.5 text-[#A4A4B0] hover:text-white"
                  title="Copy"
                >
                  {copiedField === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Telephone */}
              <div className="p-4 rounded-xl bg-[#0D0E15]/50 border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#A4A4B0]/60 uppercase tracking-wider block">
                    Telephone
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-xs sm:text-sm font-medium text-[#F5F5F7] hover:text-[#56BFFF] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-1.5 text-[#A4A4B0] hover:text-white"
                  title="Copy"
                >
                  {copiedField === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Location */}
              <div className="p-4 rounded-xl bg-[#0D0E15]/50 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#A4A4B0]/60 uppercase tracking-wider block">
                  Location
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#F5F5F7]">
                  {location}
                </span>
              </div>

            </div>

            {/* Social Network Links */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#A4A4B0]/70 block mb-3">
                Online Profiles
              </span>
              <div className="flex gap-3 text-xs font-mono">
                <a
                  href={profiles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#F5F5F7] hover:text-[#9B6DFF] transition-colors flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={11} />
                </a>
                <a
                  href={profiles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#F5F5F7] hover:text-[#56BFFF] transition-colors flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={11} />
                </a>
                <a
                  href={profiles.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[#F5F5F7] hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  <span>LeetCode</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>
            </div>

          </div>

          {/* Minimal Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0D0E15]/50 border border-white/[0.06] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#A4A4B0] block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#9B6DFF] focus:outline-none text-xs text-[#F5F5F7] transition-colors"
                  />
                  {errors.name && <span className="text-[10px] text-rose-400 font-mono mt-1 block">{errors.name}</span>}
                </div>

                <div>
                  <label className="text-xs font-mono text-[#A4A4B0] block mb-1">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#9B6DFF] focus:outline-none text-xs text-[#F5F5F7] transition-colors"
                  />
                  {errors.email && <span className="text-[10px] text-rose-400 font-mono mt-1 block">{errors.email}</span>}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#A4A4B0] block mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Inquiry / Collaboration"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#9B6DFF] focus:outline-none text-xs text-[#F5F5F7] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#A4A4B0] block mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#9B6DFF] focus:outline-none text-xs text-[#F5F5F7] transition-colors resize-none"
                />
                {errors.message && <span className="text-[10px] text-rose-400 font-mono mt-1 block">{errors.message}</span>}
              </div>

              <button
                type="submit"
                onMouseEnter={() => soundEffects.playHover()}
                className="w-full py-3 rounded-xl text-xs font-medium text-white bg-[#9B6DFF] hover:bg-[#8A58F5] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
