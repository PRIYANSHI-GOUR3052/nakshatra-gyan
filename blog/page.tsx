import { BlogPreview } from '../components/BlogPreview'
import BlogPageContent from './BlogPageContent'

export default function BlogPage() {
  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <BlogPageContent />
      </div>
    </div>
  )
}

