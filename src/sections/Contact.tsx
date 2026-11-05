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
    <section id="contact" className="relative py-32 border-t border-purple-900/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#BF5AFF] block mb-2 neon-text-purple font-semibold">
            08 &bull; CONTACT
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FFFFFF] drop-shadow-[0_0_20px_rgba(191,90,255,0.25)]">
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#B8AEC7] font-light max-w-2xl leading-relaxed">
            Have an opportunity, creative collaboration, or project in mind? Reach out directly or send a message below.
          </p>
        </div>

        {/* 2-Column Minimal Layout with Animated Neon Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Details & Profiles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="neon-card p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D8B4FE]/80 uppercase tracking-wider block">
                    Email
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="text-xs sm:text-sm font-medium text-[#FFFFFF] hover:text-[#BF5AFF] transition-colors"
                  >
                    {email}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(email, 'email')}
                  className="p-1.5 text-[#B8AEC7] hover:text-[#BF5AFF] hover:shadow-[0_0_10px_rgba(191,90,255,0.4)] transition-all rounded-lg"
                  title="Copy"
                >
                  {copiedField === 'email' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Telephone Card */}
              <div className="neon-card p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#D8B4FE]/80 uppercase tracking-wider block">
                    Telephone
                  </span>
                  <a
                    href={`tel:${phone}`}
                    className="text-xs sm:text-sm font-medium text-[#FFFFFF] hover:text-[#8B9CFF] transition-colors"
                  >
                    {phone}
                  </a>
                </div>
                <button
                  onClick={() => copyToClipboard(phone, 'phone')}
                  className="p-1.5 text-[#B8AEC7] hover:text-[#8B9CFF] hover:shadow-[0_0_10px_rgba(139,156,255,0.4)] transition-all rounded-lg"
                  title="Copy"
                >
                  {copiedField === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Location Card */}
              <div className="neon-card p-4">
                <span className="text-[10px] font-mono text-[#D8B4FE]/80 uppercase tracking-wider block">
                  Location
                </span>
                <span className="text-xs sm:text-sm font-medium text-[#FFFFFF]">
                  {location}
                </span>
              </div>

            </div>

            {/* Social Network Links */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D8B4FE]/80 block mb-3 font-medium">
                Online Profiles
              </span>
              <div className="flex gap-3 text-xs font-mono">
                <a
                  href={profiles.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 text-[#FFFFFF] hover:border-[#BF5AFF] hover:shadow-[0_0_15px_rgba(191,90,255,0.4)] transition-all flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} className="text-[#BF5AFF]" />
                </a>
                <a
                  href={profiles.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 text-[#FFFFFF] hover:border-[#BF5AFF] hover:shadow-[0_0_15px_rgba(191,90,255,0.4)] transition-all flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ArrowUpRight size={12} className="text-[#8B9CFF]" />
                </a>
                <a
                  href={profiles.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 text-[#FFFFFF] hover:border-[#BF5AFF] hover:shadow-[0_0_15px_rgba(191,90,255,0.4)] transition-all flex items-center gap-1.5"
                >
                  <span>LeetCode</span>
                  <ArrowUpRight size={12} className="text-amber-300" />
                </a>
              </div>
            </div>

          </div>

          {/* Form Wrapped in Animated Neon Frame */}
          <div className="lg:col-span-7">
            <div className="neon-frame">
              <form onSubmit={handleSubmit} className="neon-frame-inner p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-[#D8B4FE] block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 focus:border-[#BF5AFF] focus:shadow-[0_0_12px_rgba(191,90,255,0.35)] focus:outline-none text-xs text-[#FFFFFF] transition-all"
                    />
                    {errors.name && <span className="text-[10px] text-rose-400 font-mono mt-1 block">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="text-xs font-mono text-[#D8B4FE] block mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 focus:border-[#BF5AFF] focus:shadow-[0_0_12px_rgba(191,90,255,0.35)] focus:outline-none text-xs text-[#FFFFFF] transition-all"
                    />
                    {errors.email && <span className="text-[10px] text-rose-400 font-mono mt-1 block">{errors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#D8B4FE] block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Inquiry / Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 focus:border-[#BF5AFF] focus:shadow-[0_0_12px_rgba(191,90,255,0.35)] focus:outline-none text-xs text-[#FFFFFF] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#D8B4FE] block mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#160F25] border border-[#BF5AFF]/25 focus:border-[#BF5AFF] focus:shadow-[0_0_12px_rgba(191,90,255,0.35)] focus:outline-none text-xs text-[#FFFFFF] transition-all resize-none"
                  />
                  {errors.message && <span className="text-[10px] text-rose-400 font-mono mt-1 block">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  onMouseEnter={() => soundEffects.playHover()}
                  className="w-full py-3 rounded-xl text-xs font-medium text-[#FFFFFF] bg-[#BF5AFF] hover:bg-[#A855F7] neon-glow-btn transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
