import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES, roleDashboardPath } from "../../utils/constants";

// Add your background image here:
import arenaBg1 from "../../assets/images/arena-bg1.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // toggle mode: "user" | "admin"
  const [mode, setMode] = React.useState("user");
  const [error, setError] = React.useState("");

  const adminForm = useForm();
  const userForm = useForm({
    defaultValues: { role: ROLES.PLAYER },
  });

  const submitAdmin = async (values) => {
    setError("");
    try {
      const u = await login({ ...values, role: ROLES.ADMIN });
      navigate(roleDashboardPath(u.role), { replace: true });
    } catch (e) {
      setError(e?.message || "Invalid credentials");
    }
  };

  const submitUser = async (values) => {
    setError("");
    try {
      const u = await login(values);
      navigate(roleDashboardPath(u.role), { replace: true });
    } catch (e) {
      setError(e?.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-5">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${arenaBg1})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/90" />

      {/* Content */}
      <div className="relative w-full max-w-xl rounded-2xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-lg overflow-hidden">
        {/* Top Toggle */}
        <div className="flex">
          <button
            type="button"
            onClick={() => {
              setMode("user");
              setError("");
              adminForm.reset();
            }}
            className={`flex-1 py-4 text-sm font-semibold transition ${
              mode === "user"
                ? "bg-white text-slate-900"
                : "text-slate-200 hover:bg-white/10"
            }`}
          >
            User
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("admin");
              setError("");
              userForm.reset({ role: ROLES.PLAYER, email: "", password: "" });
            }}
            className={`flex-1 py-4 text-sm font-semibold transition ${
              mode === "admin"
                ? "bg-white text-slate-900"
                : "text-slate-200 hover:bg-white/10"
            }`}
          >
            Admin
          </button>
        </div>

        <div className="p-6">
          {/* Header */}
          <h2 className="text-white text-2xl font-semibold mb-1">
            {mode === "admin" ? "Admin Login" : "User Login"}
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            {mode === "admin"
              ? "System administration access"
              : "Arena Manager / Coach / Player"}
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Admin Form */}
          {mode === "admin" ? (
            <form
              className="space-y-4"
              onSubmit={adminForm.handleSubmit(submitAdmin)}
            >
              <div>
                <label className="text-slate-200 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                  {...adminForm.register("email", { required: true })}
                />
              </div>

              <div>
                <label className="text-slate-200 text-sm">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                  {...adminForm.register("password", { required: true })}
                />
              </div>

              <button className="w-full rounded-xl bg-white text-slate-900 font-semibold py-3 hover:bg-slate-200 transition">
                Login
              </button>
            </form>
          ) : (
            /* User Form */
            <form
              className="space-y-4"
              onSubmit={userForm.handleSubmit(submitUser)}
            >
              <div>
                <label className="text-slate-200 text-sm">Login As</label>
                <select
                  className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                  {...userForm.register("role", { required: true })}
                >
                  <option value={ROLES.MANAGER}>Arena Manager</option>
                  <option value={ROLES.COACH}>Coach</option>
                  <option value={ROLES.PLAYER}>Player</option>
                </select>
              </div>

              <div>
                <label className="text-slate-200 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                  {...userForm.register("email", { required: true })}
                />
              </div>

              <div>
                <label className="text-slate-200 text-sm">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                  {...userForm.register("password", { required: true })}
                />
              </div>

              <button className="w-full rounded-xl bg-emerald-400 text-slate-950 font-semibold py-3 hover:bg-emerald-300 transition">
                Login
              </button>

              <div className="flex items-center justify-between text-sm pt-1">
                <span className="text-slate-300">New user?</span>
                <Link
                  to="/signup"
                  className="text-white underline underline-offset-4 hover:text-slate-200"
                >
                  Create account
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
