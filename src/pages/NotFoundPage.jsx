import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-ink px-6 text-center">
      <div className="reticle border border-line bg-panel px-10 py-8 text-scarlet">
        <h1 className="font-display text-5xl font-black tracking-wide text-paper">404</h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">Coordinates not found</p>
      </div>
      <Link
        to="/"
        className="font-mono text-sm uppercase tracking-wider text-gold underline decoration-line underline-offset-4 hover:text-scarlet-bright hover:decoration-scarlet-bright"
      >
        Back to home &rarr;
      </Link>
    </div>
  )
}

export default NotFoundPage
