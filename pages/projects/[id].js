import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Users } from 'lucide-react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { projects } from '../../data/portfolio'

export default function ProjectDetail() {
  const router = useRouter()
  const { id } = router.query
  
  const project = projects.find(p => p.id === id)
  
  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <Link href="/projects" className="text-blue-600 hover:text-blue-700">
              ← Back to Projects
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                {project.category}
              </span>
              <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                project.status === 'Completed' 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
              }`}>
                {project.status}
              </span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
              {project.longDescription || project.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <ExternalLink size={18} className="mr-2" />
                  View Live Demo
                </a>
              )}
              
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <Github size={18} className="mr-2" />
                  View Code
                </a>
              )}
            </div>
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center text-6xl">
              {project.category === 'Web Application' ? '🖥️' : 
               project.category === 'AI Tool' ? '🤖' : 
               project.category === 'SaaS Platform' ? '☁️' : '📱'}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Project Overview
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {project.longDescription || project.description}
                </p>
                
                {/* Add more detailed description here */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  This project showcases modern web development practices and demonstrates 
                  proficiency in the technologies listed above. The implementation focuses 
                  on user experience, performance optimization, and scalable architecture.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Info
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Status</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {project.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Code className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Category</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {project.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-gray-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Team Size</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        Solo Project
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}