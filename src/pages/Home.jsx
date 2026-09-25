import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Mail,
  Users,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Globe,
  Moon,
  Sun,
} from "lucide-react";

const Home = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">

      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Search className="h-5 w-5" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              BuyerFinder
            </span>
          </Link>

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              title={darkMode ? "Light Mode" : "Dark Mode"}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero */}
      <section className="overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">

          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400">
              <CheckCircle2 className="h-4 w-4" />
              International Buyer Discovery
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
              Find International Buyers
              <span className="text-blue-600"> Faster.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Discover potential businesses, find publicly available
              business contact information, and reach out to international
              buyers from one simple platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Start Finding Buyers
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Login
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Real-time business discovery
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Email discovery
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">

              {/* Preview Header */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Find Buyers
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Discover businesses in your target market
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 p-2 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <Search className="h-4 w-4" />
                </div>
              </div>

              {/* Search Box */}
              <div className="mb-4 grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500">
                    Category
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                    Home Decor
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                  <p className="text-[10px] uppercase text-slate-400 dark:text-slate-500">
                    Country
                  </p>
                  <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                    United States
                  </p>
                </div>

                <div className="rounded-lg bg-blue-600 px-3 py-2 text-center text-white">
                  <p className="text-[10px] uppercase text-blue-100">
                    Search
                  </p>
                  <p className="mt-1 text-xs font-semibold">
                    Find Buyers
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Potential Businesses
                </p>

                <span className="text-xs text-blue-600 dark:text-blue-400">
                  100+ results
                </span>
              </div>

              <div className="space-y-2">

                <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                      <Users className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Modern Home Decor
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <MapPin className="h-3 w-3" />
                        New York, USA
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    Email Found
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                      <Globe className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Urban Living Store
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <MapPin className="h-3 w-3" />
                        California, USA
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                    Business Found
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                      <Mail className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Home Style Market
                      </p>
                      <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                        <MapPin className="h-3 w-3" />
                        Texas, USA
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                    Email Found
                  </span>
                </div>

              </div>
            </div>

            {/* Small floating stat */}
            <div className="absolute -bottom-12 -left-10 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-900 sm:block">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Potential Leads
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                100+
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-6 py-8 md:grid-cols-4 dark:divide-slate-800">

          <div className="px-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              100+
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Potential Businesses
            </p>
          </div>

          <div className="px-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              USA
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Target Market
            </p>
          </div>

          <div className="px-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Email
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Business Discovery
            </p>
          </div>

          <div className="px-4 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Direct
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Email Outreach
            </p>
          </div>

        </div>
      </section>

      {/* 3 Main Capabilities */}
      <section className="bg-white px-6 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Buyer Discovery Platform
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Everything you need to discover potential buyers.
            </h2>

            <p className="mt-4 text-slate-600 dark:text-slate-400">
              BuyerFinder brings business discovery, email finding,
              and outreach into one simple workflow.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Search className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Discover Buyers
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Search potential businesses using category,
                location, and keywords.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <Mail className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Find Business Emails
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Discover publicly available business contact
                emails for potential leads.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
                <Users className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Reach Out Directly
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                Save leads and send personalized emails directly
                from the platform.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 px-6 py-16 dark:bg-slate-950">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">

          <div>
            <h2 className="text-3xl font-bold text-white">
              Ready to find your next buyer?
            </h2>

            <p className="mt-2 text-slate-400">
              Start discovering potential international businesses today.
            </p>
          </div>

          <Link
            to="/register"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 px-6 py-6 dark:bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="text-sm text-slate-500">
            © 2026 BuyerFinder
          </p>

          <p className="text-sm text-slate-500">
            International Buyer Discovery Platform
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;



