import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),transparent_30%),rgb(15,23,42)] text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-sky-500/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-sky-300 shadow-slate-950/10">
              Modern DevOps friendly URL shortening
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-slate-100 sm:text-6xl">
                Build, share, and track short URLs with confidence.
              </h1>
              <p className="max-w-2xl text-lg text-slate-400">
                Convert long developer links into clean short codes, monitor
                clicks, generate QR codes, and keep your routing fast with Redis
                caching.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Start free
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 px-6 py-3 text-base text-slate-100 transition hover:border-sky-400 hover:text-slate-100"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-glow">
            <div className="mb-6 rounded-3xl bg-slate-950/80 p-6 text-slate-100 shadow-inner">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                Quick preview
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Developer-friendly dashboard
              </h2>
              <p className="mt-2 text-slate-400">
                Track clicks, view top URLs, and manage expiring links from one
                polished SaaS dashboard.
              </p>
            </div>
            <div className="space-y-4 text-sm text-slate-400">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-slate-100">Custom alias support</p>
                <p>
                  Shorten URLs using branded aliases and developer-friendly
                  codes.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-slate-100">Fast Redis redirects</p>
                <p>
                  Cached lookups make every redirect speedy and
                  production-ready.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-slate-100">Analytics at a glance</p>
                <p>
                  See total clicks, recent URLs, and your most visited links
                  instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-slate-800/70 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
              Why choose this app
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-100">
              Everything you need to shorten and manage links.
            </h2>
            <p className="mt-4 text-slate-400">
              Built with developer workflows in mind—secure auth, modern UI, and
              deployment-ready architecture.
            </p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Custom Aliases",
                description:
                  "Use your own short codes for easy sharing and branded redirects.",
              },
              {
                title: "QR Code Generation",
                description:
                  "Every URL can include a QR code for fast mobile access.",
              },
              {
                title: "Expiration Controls",
                description:
                  "Set automatic link expiration to keep your shareable URLs safe.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-glow"
              >
                <h3 className="text-xl font-semibold text-slate-100">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-400">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="analytics" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
                Analytics
              </p>
              <p className="mt-4 text-4xl font-semibold text-slate-100">
                Total clicks
              </p>
              <p className="mt-3 text-slate-400">
                Live counters help you understand which links are most
                effective.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
                Security
              </p>
              <p className="mt-4 text-4xl font-semibold text-slate-100">
                Rate-limit
              </p>
              <p className="mt-3 text-slate-400">
                Protect your APIs with request throttling and secure headers.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-glow">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">
                Deploy
              </p>
              <p className="mt-4 text-4xl font-semibold text-slate-100">
                Docker ready
              </p>
              <p className="mt-3 text-slate-400">
                One-click local orchestration for frontend, backend, MongoDB and
                Redis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
