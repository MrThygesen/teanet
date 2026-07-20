export default function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">

      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Logo */}

        <a
          href="/"
          className="flex items-center gap-3 shrink-0"
        >
          <img
            src="/images/logo.png"
            alt="EDGE Spaces"
            className="w-9 h-9 object-contain"
          />

          <div>
            <div className="text-lg font-semibold tracking-wide text-white">
              EDGE SPACES
            </div>

            <div className="text-xs text-zinc-500">
              Part of EDGE Alliance
            </div>
          </div>
        </a>

        {/* Navigation */}

        <nav className="flex flex-wrap items-center gap-6 text-sm">

          <a
            href="/"
            className="text-zinc-400 hover:text-white transition"
          >
            Home
          </a>

          <a
            href="/#communities"
            className="text-zinc-400 hover:text-white transition"
          >
            Community
          </a>

          <a
            href="/#apply"
            className="text-zinc-400 hover:text-white transition"
          >
            Apply
          </a>

          <a
            href="/community-card"
            className="text-zinc-400 hover:text-white transition"
          >
            Digital Card
          </a>

         <a
             href="/contact"
            className="text-zinc-400 hover:text-white transition"
         >
             Contact
         </a>        

  <a
            href="/profile"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium"
          >
            Profile
          </a>

        </nav>

      </div>

    </header>
  )
}
