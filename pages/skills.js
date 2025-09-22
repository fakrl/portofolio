// pages/skills.js
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Database, Palette, Zap, TrendingUp, Globe } from 'lucide-react'
import Layout from '../components/Layout'
import { skills } from '../data/portfolio'

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Skill level data (you can customize this)
  const skillLevels = {
    // Frontend
    'HTML5': 95, 'CSS3': 90, 'JavaScript ES6+': 85, 'React.js': 80, 'Tailwind CSS': 85,
    // Backend
    'PHP': 75, 'MySQL': 80, 'Node.js': 70, 'RESTful APIs': 75,
    // Digital Marketing
    'Content Strategy': 85, 'SEO': 80, 'Social Media Marketing': 90, 'AI-Assisted Content Creation': 85,
    // Tools
    'Git & GitHub': 85, 'WordPress': 80, 'Azure AI Services': 70, 'Adobe Creative Suite': 75
  }

  const categories = ['All', ...skills.map(skill => skill.category)]
  
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Frontend Development': return <Code className="w-8 h-8" />
      case 'Backend Development': return <Database className="w-8 h-8" />
      case 'Digital Marketing': return <TrendingUp className="w-8 h-8" />
      case 'Tools & Platform': return <Zap className="w-8 h-8" />
      default: return <Globe className="w-8 h-8" />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Frontend Development': return 'from-blue-500 to-cyan-500'
      case 'Backend Development': return 'from-green-500 to-emerald-500'
      case 'Digital Marketing': return 'from-purple-500 to-pink-500'
      case 'Tools & Platform': return 'from-orange-500 to-red-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

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
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Technologies dan tools yang saya kuasai untuk membangun solusi digital modern. Dari frontend development hingga digital marketing strategy.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform -translate-y-1'
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="space-y-12">
            {filteredSkills.map((skillCategory, index) => (
              <motion.div
                key={skillCategory.category}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-200/20 dark:border-gray-700/20 p-8 overflow-hidden relative"
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
                  <div className={`w-full h-full bg-gradient-to-br ${getCategoryColor(skillCategory.category)} rounded-full transform translate-x-32 -translate-y-32`}></div>
                </div>

                {/* Header */}
                <div className="flex items-center mb-8 relative z-10">
                  <div className={`p-4 bg-gradient-to-r ${getCategoryColor(skillCategory.category)} rounded-2xl text-white mr-6 shadow-lg`}>
                    {getCategoryIcon(skillCategory.category)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {skillCategory.category}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {skillCategory.items.length} Skills
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {skillCategory.items.map((skill, skillIndex) => {
                    const level = skillLevels[skill] || Math.floor(Math.random() * 30) + 70 // Random level if not specified
                    
                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {skill}
                          </span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {level}%
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 }}
                            className={`h-2 bg-gradient-to-r ${getCategoryColor(skillCategory.category)} rounded-full`}
                          ></motion.div>
                        </div>
                        
                        {/* Proficiency Label */}
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          {level >= 90 ? 'Expert' : level >= 80 ? 'Advanced' : level >= 70 ? 'Intermediate' : 'Beginner'}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Learning Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Always Learning 🚀</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Technology terus berkembang, dan saya selalu bersemangat untuk mempelajari hal-hal baru. 
              Berikut adalah beberapa teknologi yang sedang saya pelajari:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['TypeScript', 'GraphQL', 'Docker', 'AWS'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                >
                  <div className="text-2xl mb-2">📚</div>
                  <div className="font-semibold">{tech}</div>
                  <div className="text-sm opacity-75 mt-1">Learning</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Certifications Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Want to see my <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">certificates</span>?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Lihat sertifikat dan achievement yang sudah saya dapatkan
            </p>
            <a
              href="/certifications"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              View Certifications
              <Palette size={20} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}