import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const NavBar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isLanding = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-semibold text-slate-100"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500 font-bold text-slate-950">
            U
          </span>
          URL-Shortner
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>

          {isLanding && (
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
          )}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-white transition hover:border-sky-400"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-white transition hover:border-sky-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
