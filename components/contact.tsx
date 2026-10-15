"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Send, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

// Messages go out through FormSubmit, which emails them to this address: no
// backend and no API key. The address has to confirm the form once, through a
// link FormSubmit emails on the first message.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${personalInfo.email}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<Status>('idle');
  // A field people never see. Bots fill every input, so a value here means
  // the message is not from a person.
  const [honey, setHoney] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (honey) {
      setStatus('sent');
      return;
    }
    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `Portfolio: message from ${formState.name}`,
          _replyto: formState.email,
          _template: 'table',
        }),
      });
      const result = await response.json().catch(() => null);
      const ok = response.ok && (result?.success === true || result?.success === 'true');
      if (!ok) throw new Error(result?.message ?? `HTTP ${response.status}`);
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  // If sending fails, the visitor can still reach me with what they wrote.
  const mailtoFallback = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
    `Portfolio: message from ${formState.name}`,
  )}&body=${encodeURIComponent(formState.message)}`;

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-paper">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-terra/10 to-amber/10 rounded-full blur-3xl"
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
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-line/[0.08]"
            >
              <MessageSquare className="w-4 h-4 text-terra" />
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
              <div className="p-3 bg-line/[0.05] rounded-xl border border-line/[0.08]">
                <Mail className="w-5 h-5 text-terra" />
              </div>
              <div>
                <p className="text-sm text-foreground/50 mb-1">Email me at</p>
                <a href={`mailto:${personalInfo.email}`} className="text-foreground hover:text-terra transition-colors">
                  {personalInfo.email}
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
              {status === 'sent' ? (
                <div className="relative z-10 flex flex-col items-center text-center py-10" role="status">
                  <CheckCircle2 className="w-12 h-12 text-terra mb-5" />
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Message sent</h3>
                  <p className="text-foreground/60 mb-8 max-w-sm">
                    Thanks for reaching out. I&apos;ll get back to you by email soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="text-sm text-foreground/60 hover:text-terra transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="relative z-10 space-y-6">
                  <input
                    type="text"
                    name="_honey"
                    value={honey}
                    onChange={(e) => setHoney(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />
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
                      className="w-full px-4 py-3 bg-line/[0.03] border border-line/[0.1] rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-terra/40 focus:bg-line/[0.05] transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-line/[0.03] border border-line/[0.1] rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-terra/40 focus:bg-line/[0.05] transition-all duration-300"
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
                      className="w-full px-4 py-3 bg-line/[0.03] border border-line/[0.1] rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:border-terra/40 focus:bg-line/[0.05] transition-all duration-300 resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-500" role="alert">
                      Sorry, the message didn&apos;t go through.{' '}
                      <a href={mailtoFallback} className="underline hover:text-terra">
                        Email it to me directly
                      </a>{' '}
                      instead.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={status === 'sending' ? undefined : { scale: 1.02, y: -2 }}
                    whileTap={status === 'sending' ? undefined : { scale: 0.98 }}
                    className="w-full btn-premium text-base group disabled:opacity-70 disabled:cursor-wait"
                  >
                    {status === 'sending' ? (
                      <>
                        <span>Sending...</span>
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
