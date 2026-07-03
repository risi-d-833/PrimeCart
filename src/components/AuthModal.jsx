import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

export default function AuthModal({ open, onClose }) {
  const [screen, setScreen] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const inputRefs = useRef([]);

  useEffect(() => {
    if (screen !== "otp") return;

    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = window.setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [screen, timer]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateRegister = () => {
    const newErrors = {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    };

    let valid = true;

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
      valid = false;
    }

    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid mobile number";
      valid = false;
    }

    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (screen === "register") {
      if (!validateRegister()) return;

      setLoading(true);
      window.setTimeout(() => {
        setLoading(false);
        setScreen("otp");
        setOtp(["", "", "", "", "", ""]);
        setTimer(30);
        setCanResend(false);
      }, 1200);
      return;
    }

    if (!form.email || !form.password) {
      setErrors((prev) => ({
        ...prev,
        email: !form.email ? "Email is required" : "",
        password: !form.password ? "Password is required" : "",
      }));
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      closeModal();
      alert("Login successful");
    }, 1200);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "Enter" && index === 5) {
      verifyOtp();
    }
  };

  const resendOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
  };

  const verifyOtp = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("Please enter the complete 6-digit OTP");
      return;
    }

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      closeModal();
      alert("Account created successfully");
    }, 1500);
  };

  const closeModal = () => {
    setScreen("login");
    setForm({
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    setErrors({
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-5 top-5 z-20 rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
        >
          <X size={18} />
        </button>

        <div className="bg-gradient-to-r from-black via-[#4b3a28] to-[#8A6E4B] px-8 py-8 text-white">
          <h2 className="text-3xl font-bold">
            {screen === "login"
              ? "Welcome Back 👋"
              : screen === "register"
                ? "Create Account"
                : "Verify OTP"}
          </h2>
          <p className="mt-2 text-sm text-gray-200">
            {screen === "login"
              ? "Login to continue shopping."
              : screen === "register"
                ? "Join PrimeCart today."
                : `OTP sent to ${form.mobile || "your mobile"}`}
          </p>
        </div>

        <div className="space-y-5 p-8">
          {(screen === "login" || screen === "register") && (
            <>
              {screen === "register" && (
                <>
                  <Input
                    icon={<User size={18} />}
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    error={errors.fullName}
                  />
                  <Input
                    icon={<Phone size={18} />}
                    label="Mobile Number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    error={errors.mobile}
                  />
                </>
              )}

              <Input
                icon={<Mail size={18} />}
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
              />

              <PasswordInput
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                show={showPassword}
                toggle={() => setShowPassword((prev) => !prev)}
                error={errors.password}
              />

              {screen === "register" && (
                <>
                  <PasswordInput
                    label="Confirm Password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={showConfirm}
                    toggle={() => setShowConfirm((prev) => !prev)}
                    error={errors.confirmPassword}
                  />

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all ${
                        form.password.length < 4
                          ? "w-1/4 bg-red-500"
                          : form.password.length < 6
                            ? "w-2/4 bg-yellow-500"
                            : form.password.length < 8
                              ? "w-3/4 bg-blue-500"
                              : "w-full bg-green-500"
                      }`}
                    />
                  </div>
                </>
              )}

              {screen === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#8A6E4B]"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-[#8A6E4B] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {screen === "login" ? "Logging in..." : "Sending OTP..."}
                  </span>
                ) : screen === "login" ? (
                  "Login"
                ) : (
                  "Send OTP"
                )}
              </button>
            </>
          )}

          {screen === "otp" && (
            <>
              <div className="mb-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setScreen("register")}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <ArrowLeft size={18} />
                </button>
                <div>
                  <h2 className="text-2xl font-bold">Verify OTP</h2>
                  <p className="text-sm text-gray-500">
                    OTP sent to{" "}
                    <span className="font-semibold">{form.mobile}</span>
                  </p>
                </div>
              </div>

              <div className="mb-8 flex justify-center">
                <div className="rounded-full bg-green-100 p-5">
                  <ShieldCheck size={40} className="text-green-600" />
                </div>
              </div>

              <div className="flex justify-between gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    value={digit}
                    maxLength={1}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-14 w-14 rounded-2xl border text-center text-2xl font-bold outline-none focus:border-[#8A6E4B] focus:ring-2 focus:ring-[#8A6E4B]/20"
                  />
                ))}
              </div>

              <div className="mt-6 text-center">
                {canResend ? (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="font-semibold text-[#8A6E4B] hover:underline"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <p className="text-gray-500">
                    Resend OTP in <span className="font-bold">{timer}s</span>
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading}
                className="mt-8 w-full rounded-full bg-black py-3 font-semibold text-white transition hover:bg-[#8A6E4B] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP & Create Account"
                )}
              </button>
            </>
          )}

          {(screen === "login" || screen === "register") && (
            <>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm text-gray-400">OR</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-full border py-3 font-semibold transition hover:bg-gray-50"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  className="h-5"
                  alt="Google"
                />
                Continue with Google
              </button>

              <div className="text-center text-sm">
                {screen === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setScreen("register")}
                      className="ml-1 font-bold text-[#8A6E4B]"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setScreen("login")}
                      className="ml-1 font-bold text-[#8A6E4B]"
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ icon, label, name, value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <div className="flex items-center rounded-2xl border bg-gray-50 px-4">
        <span className="text-gray-400">{icon}</span>
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-3 outline-none"
        />
      </div>
      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

function PasswordInput({ label, name, value, onChange, show, toggle, error }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <div className="flex items-center rounded-2xl border bg-gray-50 px-4">
        <Lock size={18} className="text-gray-400" />
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="Enter Password"
          className="w-full bg-transparent px-3 py-3 outline-none"
        />
        <button type="button" onClick={toggle} className="text-gray-400">
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error ? <p className="mt-1 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
