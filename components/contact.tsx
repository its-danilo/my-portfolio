"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Send, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#FAF7F2]">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#D4654A]/10 to-[#F4A261]/10 rounded-full blur-3xl"
        />
      </div>

      <div ref={sectionRef} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-[#8B7355]/[0.08]"
            >
              <MessageSquare className="w-4 h-4 text-[#D4654A]" />
              <span className="text-sm text-foreground/60 font-medium">Let's Talk</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Have a project
              <br />
              <span className="text-gradient gradient-primary">in mind?</span>
            </h2>

            <p className="text-lg text-foreground/50 mb-8 max-w-md">
              I'm always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>

            <div className="flex items-center gap-3 text-foreground/70">
              <div className="p-3 bg-[#8B7355]/[0.05] rounded-xl border border-[#8B7355]/[0.08]">
                <Mail className="w-5 h-5 text-[#D4654A]" />
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">Email me at</p>
                <a href="mailto:danilodsbleal@gmail.com" className="text-foreground hover:text-[#D4654A] transition-colors">
                  danilodsbleal@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="premium-card p-8">
              <div className="relative z-10 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/60 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#8B7355]/[0.03] border border-[#8B7355]/[0.1] rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-[#D4654A]/40 focus:bg-[#8B7355]/[0.05] transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/60 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-[#8B7355]/[0.03] border border-[#8B7355]/[0.1] rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-[#D4654A]/40 focus:bg-[#8B7355]/[0.05] transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/60 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[#8B7355]/[0.03] border border-[#8B7355]/[0.1] rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-[#D4654A]/40 focus:bg-[#8B7355]/[0.05] transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-premium text-base group"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
