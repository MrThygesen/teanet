export default function Header() {

  return (

    <header className="border-b border-zinc-800">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <div>

          <a href="/" className="block">

            <div className="text-lg font-semibold text-blue-400">
              EDGE SPACES
            </div>

            <div className="text-xs text-zinc-500">
              Part of EDGE Alliance
            </div>

          </a>

        </div>

        <nav className="hidden md:flex items-center gap-8">

          <a
            href="/"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Home
          </a>

          <a
            href="/#communities"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Community
          </a>

          <a
            href="/#insights"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Insights
          </a>

          <a
            href="/community-card"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Membership
          </a>

          <a
            href="/profile"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            My Membership
          </a>

        </nav>

      </div>

    </header>

  )

}
