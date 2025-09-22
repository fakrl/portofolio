import { motion } from 'framer-motion'
import { Award, ExternalLink, Calendar, Download } from 'lucide-react'
import Layout from '../components/Layout'
import { certifications } from '../data/portfolio'

export default function CertificationsPage() {
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
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Certifications</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Sertifikat dan achievement yang telah saya dapatkan dalam perjalanan belajar teknologi.
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Certificate Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 p-8 flex items-center justify-center">
                  <Award size={64} className="text-blue-600 dark:text-blue-400" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {cert.issuer}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <Calendar size={16} className="mr-2" />
                    {cert.date}
                  </div>

                  {/* Action Button */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center w-full justify-center py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View Credential
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add More Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
              <h2 className="text-3xl font-bold mb-6">Continuous Learning 📚</h2>
              <p className="text-xl mb-8 opacity-90">
                Saya terus belajar teknologi baru dan akan menambahkan sertifikat terbaru di sini.
              </p>
              <div className="text-6xl mb-6">🎯</div>
              <p className="text-lg opacity-75">
                "Learning never exhausts the mind" - Leonardo da Vinci
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  )
}