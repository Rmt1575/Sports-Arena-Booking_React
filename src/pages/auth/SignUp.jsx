import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../utils/constants";
import arenaBg2 from "../../assets/images/arena-bg2.png";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const form = useForm({
    defaultValues: { role: ROLES.PLAYER, name: "", email: "", password: "" },
  });

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const onSubmit = async (values) => {
    setError("");
    setSuccess("");
    try {
      await signup(values);
      setSuccess("Account created! Now login.");
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch (e) {
      setError(e.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-5">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${arenaBg2})` }}
      />

      <div className="w-full max-w-xl rounded-2xl bg-white/5 border border-white/10 p-6 shadow-xl backdrop-blur">
        <h2 className="text-white text-2xl font-semibold">Create Account</h2>
        <p className="text-slate-300 text-sm mt-1">
          Signup for Arena Manager / Coach / Player
        </p>

        <form className="mt-6 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="text-slate-200 text-sm">Role</label>
            <select
              className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
              {...form.register("role", { required: true })}
            >
              <option value={ROLES.MANAGER}>Arena Manager</option>
              <option value={ROLES.COACH}>Coach</option>
              <option value={ROLES.PLAYER}>Player</option>
            </select>
          </div>

          <div>
            <label className="text-slate-200 text-sm">Name</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
              placeholder="Your name"
              {...form.register("name", { required: "Name required" })}
            />
            <p className="text-red-300 text-sm mt-1">
              {form.formState.errors.name?.message}
            </p>
          </div>

          <div>
            <label className="text-slate-200 text-sm">Email</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
              type="email"
              placeholder="you@example.com"
              {...form.register("email", { required: "Email required" })}
            />
            <p className="text-red-300 text-sm mt-1">
              {form.formState.errors.email?.message}
            </p>
          </div>

          <div>
            <label className="text-slate-200 text-sm">Password</label>
            <input
              className="mt-1 w-full rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
              type="password"
              placeholder="min 6 chars"
              {...form.register("password", {
                required: "Password required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            <p className="text-red-300 text-sm mt-1">
              {form.formState.errors.password?.message}
            </p>
          </div>

          {error ? (
            <div className="rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 px-4 py-3 text-sm">
              {error}
            </div>
          ) : null}

          {success ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 px-4 py-3 text-sm">
              {success}
            </div>
          ) : null}

          <button className="w-full rounded-xl bg-white text-slate-900 font-semibold py-3 hover:bg-slate-200 transition">
            Create Account
          </button>

          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Already have account?</span>
            <Link
              to="/login"
              className="text-white underline underline-offset-4 hover:text-slate-200"
            >
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
