import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ExternalLink } from 'lucide-react'
import Layout from '../components/Layout'
import { projects } from '../data/portfolio'

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Create gallery items from projects
  const galleryItems = projects.flatMap(project => 
    project.gallery ? project.gallery.map((image, index) => ({
      id: `${project.id}-${index}`,
      image,
      title: `${project.title} - Screenshot ${index + 1}`,
      category: project.category,
      projectId: project.id
    })) : [{
      id: project.id,
      image: project.image,
      title: project.title,
      category: project.category,
      projectId: project.id
    }]
  )

  const categories = ['All', ...new Set(galleryItems.map(item => item.category))]
  
  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <Layout>
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Project <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Screenshots dan visual dari berbagai project yang telah saya kerjakan.
            </p>
          </motion.div>

          {/* Filter */}
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

          {/* Gallery Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                    {item.category === 'Web Application' ? '🖥️' : 
                     item.category === 'AI Tool' ? '🤖' : 
                     item.category === 'SaaS Platform' ? '☁️' : '📱'}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a
                      href={`/projects/${item.projectId}`}
                      className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-6">📸</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No images found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  )
}