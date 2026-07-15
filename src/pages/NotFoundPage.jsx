import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="text-purple-600 underline">
        Back to home
      </Link>
    </div>
  )
}

export default NotFoundPage
