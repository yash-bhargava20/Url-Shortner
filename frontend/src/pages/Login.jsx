import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { loginUser, clearError } from "../features/auth/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(form));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-900/80 p-10 shadow-glow">
        <div className="mb-10 space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-300">
            DevOps-Friendly
          </p>

          <h1 className="text-4xl font-semibold">Login to your dashboard</h1>

          <p className="text-slate-400">
            Access analytics, shorten URLs and manage your links.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm">
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            />
          </label>

          <label className="block text-sm">
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-sky-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-300 hover:text-sky-200">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
