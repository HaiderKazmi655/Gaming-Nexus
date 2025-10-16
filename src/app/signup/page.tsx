export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create your account</h1>
      <form className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm">Username</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" type="text" placeholder="yourname" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1">
          <label className="block text-sm">Password</label>
          <input className="w-full border rounded px-3 py-2 bg-transparent" type="password" placeholder="••••••••" />
        </div>
        <button type="button" className="w-full rounded bg-foreground text-background py-2">Sign up (stub)</button>
      </form>
      <p className="text-sm text-gray-600 dark:text-gray-300">Auth setup pending dependencies.</p>
    </div>
  );
}


