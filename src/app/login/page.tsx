export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Password</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" type="password" placeholder="••••••••" />
        </div>
        <button type="button" className="w-full rounded bg-foreground text-background py-2">Sign in (stub)</button>
      </form>
      <p className="text-sm text-gray-600 dark:text-gray-300">Auth setup pending dependencies.</p>
      <p className="text-sm">Don't have an account? <a className="underline" href="/signup">Sign up</a></p>
    </div>
  );
}

