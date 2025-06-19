'use client';

import { useState } from 'react';
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Star, Moon, Sun, HelpCircle, Users } from 'lucide-react'
import { motion } from 'framer-motion';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';

const studyTopics = [
  {
    title: "Vedic Astrology Fundamentals",
    titleHi: "वैदिक ज्योतिष के मूल सिद्धांत",
    description: "Learn the basics of Vedic astrology, including planets, houses, and zodiac signs.",
    icon: <Sun className="w-12 h-12 text-gold" />,
    href: "/study/vedic-astrology"
  },
  {
    title: "Numerology Essentials",
    titleHi: "अंक ज्योतिष के आवश्यक तत्व",
    description: "Discover the mystical significance of numbers in your life and their impact on your destiny.",
    icon: <Star className="w-12 h-12 text-gold" />,
    href: "/study/numerology"
  },
  {
    title: "Palmistry Techniques",
    titleHi: "हस्तरेखा विज्ञान की तकनीकें",
    description: "Explore the art of reading palms and understanding the lines that shape our lives.",
    icon: <Moon className="w-12 h-12 text-gold" />,
    href: "/study/palmistry"
  },
  {
    title: "Tarot Card Reading",
    titleHi: "टैरो कार्ड रीडिंग",
    description: "Learn the meanings behind tarot cards and how to conduct insightful readings.",
    icon: <BookOpen className="w-12 h-12 text-gold" />,
    href: "/study/tarot"
  }
]

const faqs = [
  ["Do I need prior knowledge to start?", "No, our courses are designed for all levels—from beginners to advanced seekers."],
  ["Are the study materials available in Hindi?", "Yes, most of our resources are available in both English and Hindi."],
  ["Can I get a certificate?", "Yes, you will receive a certificate upon successful completion of each course."],
  ["Is there any fee?", "Many resources are free, but some advanced courses may require a fee."],
  ["How do I ask questions during my study?", "You can join our community forums or contact our mentors directly for guidance."]
];

export default function StudyPage() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
          {/* Hero/Banner */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-center text-black">आध्यात्मिक अध्ययन<br /><span className="text-3xl md:text-5xl text-black">Spiritual Studies</span></h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl leading-relaxed mb-4">Embark on a journey of spiritual enlightenment. Explore our comprehensive study materials and courses designed to deepen your understanding of the mystical arts.</p>
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-4 rounded-lg mt-4">
              <span className="text-indigo-600 font-bold text-lg">Key Takeaway:</span> <span className="text-black font-semibold">Knowledge is the first step to transformation. Every lesson brings you closer to your true self.</span>
            </div>
          </motion.div>

          {/* Study Topics Grid */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-orange-50 rounded-3xl p-8 md:p-12 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {studyTopics.map((topic, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow transform hover:scale-105 duration-300 border border-gray-200 rounded-2xl">
                      <CardContent className="p-8 flex flex-col items-center">
                        <div className="flex justify-center mb-4">{topic.icon}</div>
                        <h2 className="text-2xl font-serif font-bold mb-1 text-indigo-700 text-center">{topic.title}</h2>
                        <h3 className="text-xl font-serif mb-4 text-black text-center">{topic.titleHi}</h3>
                        <p className="text-black mb-8 text-center text-base md:text-lg">{topic.description}</p>
                        <div className="text-center w-full">
                          <Button asChild className="w-full bg-gold text-nebula-indigo hover:bg-gold-light font-semibold text-base py-2 px-4 rounded-lg">
                            <Link href={topic.href}>Start Learning</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Study With Us Section */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
            <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center" style={{ fontFamily: 'Georgia, serif' }}>Why Study With Us?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 text-lg mb-2 flex items-center"><Users className="w-5 h-5 mr-2" />Expert Mentors</h3>
                <p className="text-blue-800">Learn from experienced astrologers, numerologists, and spiritual guides who are passionate about teaching and supporting your growth.</p>
              </div>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
                <h3 className="font-bold text-yellow-900 text-lg mb-2 flex items-center"><BookOpen className="w-5 h-5 mr-2" />Comprehensive Resources</h3>
                <p className="text-yellow-800">Access a wide range of study materials, interactive lessons, and practical exercises tailored for all levels.</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-900 text-lg mb-2 flex items-center"><Star className="w-5 h-5 mr-2" />Community Support</h3>
                <p className="text-green-800">Join a vibrant community of learners, share your experiences, and get your questions answered in our forums and live sessions.</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                <h3 className="font-bold text-purple-900 text-lg mb-2 flex items-center"><Moon className="w-5 h-5 mr-2" />Personal Growth</h3>
                <p className="text-purple-800">Our courses are designed to foster self-discovery, confidence, and spiritual transformation at every step.</p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <div className="mb-16">
            <FAQSection />
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-indigo-900 mb-8 text-center">Client Testimonials</h2>
            <Testimonials />
          </div>

          {/* Newsletter Signup/CTA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-orange-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-orange-900 mb-4">Get Weekly Study Tips & Updates</h3>
            <p className="text-gray-700 mb-4">Sign up for our newsletter and receive exclusive study tips, course updates, and spiritual insights every week.</p>
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Subscribe Now
              </button>
            </form>
          </motion.div>
        </div>
      </MysticBackground>
    </div>
  )
}

