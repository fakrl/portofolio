// pages/about.js
import { motion } from 'framer-motion'
import { Calendar, MapPin, GraduationCap, Users, Award, Download } from 'lucide-react'
import Layout from '../components/Layout'
import { personalInfo, experience } from '../data/portfolio'

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Mari kenalan lebih dekat! Ini adalah perjalanan saya dari mahasiswa Information Systems hingga menjadi digital developer yang passionate dengan teknologi modern.
            </p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
          >
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center text-white text-8xl font-bold shadow-2xl">
                  {personalInfo.name.split(' ').map(name => name[0]).join('')}
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-2xl animate-bounce">
                  🎯
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl animate-pulse">
                  💻
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 text-blue-600 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">GPA: 3.67</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-green-600 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">300+ Team Managed</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 text-purple-600 mr-3" />
                    <span className="text-gray-600 dark:text-gray-400">6+ Projects Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Hi, I'm {personalInfo.name} 👋
                </h2>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>
                    Saya adalah mahasiswa <strong>Information Systems</strong> dengan passion yang besar di bidang web development modern, AI implementation, dan digital marketing. Dengan GPA 3.67, saya terus belajar dan mengasah kemampuan dalam menciptakan solusi digital yang inovatif.
                  </p>
                  
                  <p>
                    Perjalanan saya dimulai dari kepemimpinan organisasi dengan mengelola 300+ anggota, yang mengajarkan saya pentingnya komunikasi yang efektif dan manajemen proyek. Pengalaman ini membentuk kemampuan saya dalam berkolaborasi dan memimpin tim dalam berbagai project teknologi.
                  </p>
                  
                  <p>
                    Saat ini, saya fokus pada pengembangan aplikasi web menggunakan teknologi modern seperti React.js, Next.js, dan implementasi AI. Saya juga aktif dalam digital marketing dan content creation menggunakan AI-assisted tools untuk membantu bisnis berkembang di era digital.
                  </p>
                  
                  <p>
                    Di luar coding, saya senang mengeksplorasi perkembangan AI terbaru, membuat konten untuk campaign digital marketing, dan berkontribusi pada open-source projects. Saya percaya pada continuous learning dan selalu berusaha stay ahead dengan trend teknologi terkini.
                  </p>
                </div>

                {/* Personal Info */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-600 dark:text-gray-400">{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-600 dark:text-gray-400">Available for freelance</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-start md:justify-end">
                    <a
                      href={personalInfo.resume}
                      download
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <Download size={18} className="mr-2" />
                      Download CV
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>

              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 p-6 ${index % 2 === 0 ? 'text-right' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={index % 2 === 0 ? 'order-2' : ''}>
                          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                            item.type === 'work' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            item.type === 'education' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {item.type === 'work' ? 'Work' : item.type === 'education' ? 'Education' : 'Leadership'}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{item.period}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                        {item.organization}
                      </p>
                      
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      {item.type === 'work' ? '💼' : item.type === 'education' ? '🎓' : '👥'}
                    </div>
                  </div>

                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Fun Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Fun Facts About Me</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-3">☕</div>
                <h3 className="font-bold text-lg mb-2">Coffee Lover</h3>
                <p className="text-blue-100">Code runs better with coffee. That's my coding fuel!</p>
              </div>
              
              <div>
                <div className="text-4xl mb-3">🤖</div>
                <h3 className="font-bold text-lg mb-2">AI Enthusiast</h3>
                <p className="text-blue-100">Always exploring the latest AI tools and implementations</p>
              </div>
              
              <div>
                <div className="text-4xl mb-3">📚</div>
                <h3 className="font-bold text-lg mb-2">Lifelong Learner</h3>
                <p className="text-blue-100">Constantly learning new technologies and best practices</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}