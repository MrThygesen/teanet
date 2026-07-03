export default function Header() {
  return (
    <header className="border-b border-zinc-800">

      <div className="max-w-6xl mx-auto px-6 py-4">

        {/* Logo */}
        <div className="mb-4 md:mb-0">

          <a href="/" className="block">

            <div className="text-lg font-semibold text-blue-400">
              EDGE SPACES
            </div>

            <div className="text-xs text-zinc-500">
              Part of EDGE Alliance
            </div>

          </a>

        </div>
 
        {/* Navigation */}
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">

          <a
            href="/"
            className="text-zinc-400 hover:text-white transition whitespace-nowrap"
          >
            Home
          </a>

          <a
            href="/#communities"
            className="text-zinc-400 hover:text-white transition whitespace-nowrap"
          >
            Community
          </a>

          <a
            href="/#apply"
            className="text-zinc-400 hover:text-white transition whitespace-nowrap"
          >
            Apply
          </a>

          <a
            href="/community-card"
            className="text-zinc-400 hover:text-white transition whitespace-nowrap"
          >
            Digital Card
          </a>

          <a
            href="/profile"
            className="text-zinc-400 hover:text-white transition whitespace-nowrap"
          >
            Profile
          </a>

        </nav>

      </div>

    </header>
  )
}
