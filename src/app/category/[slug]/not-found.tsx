import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-animated-gradient flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🎮</div>
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <p className="text-lg opacity-70 mb-6">
          The category you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-foreground text-background font-semibold hover:opacity-90 transition-opacity"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
