import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  User,
  X,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

const PERKS = [
  { label: "Free next-day shipping on every order" },
  { label: "60-day no-questions returns" },
  { label: "Early access to member-only drops" },
];

const MODE_LABEL = {
  login: "MEMBER ACCESS",
  register: "NEW MEMBERSHIP",
  otp: "VERIFYING IDENTITY",
};

function generateCardNumber() {
  const last = Math.floor(1000 + Math.random() * 9000);
  return `•••• •••• •••• ${last}`;
}

export default function AuthModal({ open, onClose }) {
  const [screen, setScreen] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const inputRefs = useRef([]);
  const cardNumber = useMemo(() => generateCardNumber(), []);

  useEffect(() => {
    if (screen !== "otp") return;
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [screen, timer]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateRegister = () => {
    const newErrors = {};
    let valid = true;

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
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

  const mockDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSubmit = async () => {
    if (screen === "register") {
      if (!validateRegister()) return;
      setLoading(true);
      await mockDelay();
      toast.success("OTP sent to your mobile!", { position: "top-center" });
      setScreen("otp");
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      setCanResend(false);
      setLoading(false);
      return;
    }

    if (!form.email || !form.password) {
      setErrors({
        email: !form.email ? "Email is required" : "",
        password: !form.password ? "Password is required" : "",
      });
      return;
    }

    setLoading(true);
    await mockDelay();
    toast.success("Login successful! Welcome back.", { icon: "🚀" });
    setTimeout(() => closeModal(), 800);
    setLoading(false);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && index === 5 && otp.join("").length === 6) {
      verifyOtpHandler();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pastedData)) return;
    setOtp(pastedData.split(""));
    inputRefs.current[5]?.focus();
  };

  const resendOtp = async () => {
    if (!form.mobile) return toast.error("Mobile number is required");
    setLoading(true);
    await mockDelay();
    toast.success("New OTP sent successfully");
    setOtp(["", "", "", "", "", ""]);
    setTimer(30);
    setCanResend(false);
    inputRefs.current[0]?.focus();
    setLoading(false);
  };

  const verifyOtpHandler = async () => {
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Please enter complete 6-digit OTP");
    setLoading(true);
    await mockDelay(1200);
    toast.success("Account verified successfully!", {
      icon: <CheckCircle2 className="text-emerald-600" />,
      position: "top-center",
    });
    setTimeout(() => closeModal(), 1200);
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ fullName: "", email: "", mobile: "", password: "", confirmPassword: "" });
    setOtp(["", "", "", "", "", ""]);
    setErrors({});
  };

  const closeModal = () => {
    resetForm();
    setScreen("login");
    setShowPassword(false);
    setShowConfirm(false);
    setTimer(30);
    setCanResend(false);
    onClose();
  };

  const switchScreen = (newScreen) => {
    setScreen(newScreen);
    if (newScreen === "login") resetForm();
  };

  return (
    <div
      className="pc-sans fixed inset-0 z-50 flex items-center justify-center bg-[#0B0D14]/80 backdrop-blur-xl p-4"
      onClick={closeModal}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap');
        .pc-serif { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }
        .pc-sans { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        @keyframes pcShimmer {
          0% { transform: translateX(-160%) rotate(15deg); opacity: 0; }
          15% { opacity: .5; }
          100% { transform: translateX(160%) rotate(15deg); opacity: 0; }
        }
        @keyframes pcFadeSlide {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pc-shimmer { animation: pcShimmer 1.5s ease forwards; }
        .pc-fade { animation: pcFadeSlide .35s ease; }
        .pc-focus:focus-visible { outline: 2px solid #C08A3E; outline-offset: 2px; }
      `}</style>

      <div
        className="relative w-full max-w-4xl bg-[#F4EFE7] rounded-[28px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          aria-label="Close"
          className="pc-focus group absolute right-5 top-5 z-50 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C08A3E] md:bg-black/5 md:hover:bg-[#C08A3E] transition-all duration-200 hover:rotate-90 hover:scale-110"
        >
          <X size={18} className="text-white md:text-[#10131C] group-hover:text-white transition-colors duration-200" />
        </button>

        {/* Left brand / membership panel */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#10131C] to-[#1B2030] text-[#FBF9F5] p-8 md:w-[42%] md:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-10">
              <div className="w-10 h-10 rounded-xl bg-[#C08A3E]/15 border border-[#C08A3E]/40 flex items-center justify-center">
                <ShieldCheck size={20} className="text-[#E4C687]" />
              </div>
              <div>
                <div className="pc-serif text-xl font-medium tracking-tight leading-none">PrimeCart</div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#8B92A3] mt-1">Premium Shopping</div>
              </div>
            </div>

            <h1 className="pc-serif text-3xl md:text-[2.35rem] font-medium leading-[1.05] tracking-tight mb-3">
              {screen === "login"
                ? "Welcome back to the club"
                : screen === "register"
                ? "Membership has its privileges"
                : "One more step to unlock it all"}
            </h1>
            <p className="text-[#9AA1B2] text-[15px] hidden md:block">
              {screen === "otp"
                ? `We've texted a code to +91 ${form.mobile}`
                : "Join a shopping experience built around you."}
            </p>

            <ul className="hidden md:flex flex-col gap-3 mt-8">
              {PERKS.map((perk) => (
                <li key={perk.label} className="flex items-start gap-3 text-sm text-[#C7CCD8]">
                  <Sparkles size={15} className="text-[#C08A3E] mt-0.5 shrink-0" />
                  <span>{perk.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Membership card, signature element */}
          <div key={screen} className="relative mt-8 hidden md:block">
            <div className="relative rounded-2xl p-5 h-36 bg-gradient-to-br from-[#C08A3E] via-[#8A6A3B] to-[#10131C] overflow-hidden shadow-lg">
              <div className="pc-shimmer absolute -inset-y-10 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="pc-serif text-lg tracking-tight">PC</span>
                <span className="text-[10px] tracking-[0.16em] text-[#FBF9F5]/80">{MODE_LABEL[screen]}</span>
              </div>
              <div className="relative z-10 mt-8 text-lg tracking-[0.12em] font-medium text-[#FBF9F5]">
                {cardNumber}
              </div>
              <div className="relative z-10 mt-3 text-[11px] uppercase tracking-wide text-[#FBF9F5]/70">
                {form.fullName || "Member Name"}
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 p-6 md:p-10 overflow-y-auto">
          {screen !== "otp" && (
            <div className="relative flex bg-[#F1EDE4] rounded-full p-1 mb-7 max-w-xs">
              <button
                onClick={() => switchScreen("login")}
                className="pc-focus relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-200 hover:text-[#10131C]"
                style={{ color: screen === "login" ? "#10131C" : "#8A8478" }}
              >
                Sign in
              </button>
              <button
                onClick={() => switchScreen("register")}
                className="pc-focus relative z-10 flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-200 hover:text-[#10131C]"
                style={{ color: screen === "register" ? "#10131C" : "#8A8478" }}
              >
                Join
              </button>
              <div
                className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow transition-transform duration-300 ease-out"
                style={{ transform: screen === "register" ? "translateX(calc(100% + 8px))" : "translateX(0)" }}
              />
            </div>
          )}

          {(screen === "login" || screen === "register") && (
            <div key={screen} className="pc-fade space-y-5">
              {screen === "register" && (
                <>
                  <Field
                    icon={<User size={18} />}
                    label="Full name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    error={errors.fullName}
                  />
                  <Field
                    icon={<Phone size={18} />}
                    label="Mobile number"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    error={errors.mobile}
                    type="tel"
                  />
                </>
              )}

              <Field
                icon={<Mail size={18} />}
                label="Email address"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                error={errors.email}
                type="email"
              />

              <PasswordField
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
                error={errors.password}
              />

              {screen === "register" && (
                <>
                  <PasswordField
                    label="Confirm password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    show={showConfirm}
                    toggle={() => setShowConfirm(!showConfirm)}
                    error={errors.confirmPassword}
                  />
                  <div className="h-1.5 bg-[#EDE9DF] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width:
                          form.password.length === 0
                            ? "0%"
                            : form.password.length < 4
                            ? "25%"
                            : form.password.length < 6
                            ? "50%"
                            : form.password.length < 8
                            ? "75%"
                            : "100%",
                        backgroundColor:
                          form.password.length < 4
                            ? "#C0392B"
                            : form.password.length < 6
                            ? "#C08A3E"
                            : form.password.length < 8
                            ? "#8A9A5B"
                            : "#1F6F5C",
                      }}
                    />
                  </div>
                </>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="pc-focus group relative w-full mt-2 py-4 overflow-hidden bg-[#10131C] text-[#FBF9F5] font-medium text-base rounded-2xl active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_12px_30px_-10px_rgba(16,19,28,0.5)] hover:shadow-[0_16px_36px_-8px_rgba(192,138,62,0.55)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#C08A3E] to-[#8A6A3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      {screen === "login" ? "Signing in..." : "Creating account..."}
                    </>
                  ) : (
                    <>
                      {screen === "login" ? "Sign in" : "Create account"}
                      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </button>
            </div>
          )}

          {screen === "otp" && (
            <div key="otp" className="pc-fade">
              <button
                onClick={() => setScreen("register")}
                className="pc-focus flex items-center gap-2 text-[#6B7280] hover:text-[#10131C] text-sm font-medium mb-6 transition-colors"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <h3 className="pc-serif text-2xl font-medium tracking-tight text-[#10131C]">
                Enter your code
              </h3>
              <p className="text-[#6B7280] mt-2 mb-8 text-[15px]">
                6 digits sent to <span className="font-medium text-[#10131C]">+91 {form.mobile}</span>
              </p>

              <div className="flex gap-2.5 justify-between mb-8" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, i)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-label={`Digit ${i + 1}`}
                    className="pc-focus w-11 h-14 md:w-12 md:h-16 text-center text-2xl font-medium border-2 border-[#E7E2D9] bg-white rounded-xl focus:border-[#C08A3E] outline-none transition-colors"
                  />
                ))}
              </div>

              <div className="text-center mb-8">
                {canResend ? (
                  <button onClick={resendOtp} disabled={loading} className="pc-focus text-[#10131C] font-medium hover:underline text-sm">
                    Resend code
                  </button>
                ) : (
                  <p className="text-sm text-[#8A8478]">
                    Resend available in <span className="font-mono font-semibold text-[#10131C]">{timer}</span>s
                  </p>
                )}
              </div>

              <button
                onClick={verifyOtpHandler}
                disabled={loading || otp.join("").length !== 6}
                className="pc-focus w-full py-4 bg-[#1F6F5C] hover:bg-[#195a4a] text-white font-medium text-base rounded-2xl active:scale-[0.98] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-8px_rgba(31,111,92,0.55)] disabled:opacity-60 disabled:hover:translate-y-0 flex items-center justify-center"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  "Verify & continue"
                )}
              </button>
            </div>
          )}

          <p className="text-center text-xs text-[#A6A196] mt-8">Secured by PrimeCart · Your data is safe</p>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, label, name, value, onChange, placeholder, error, type = "text" }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium uppercase tracking-wide text-[#8A8478] mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A6A196]">{icon}</div>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="pc-focus w-full pl-11 pr-4 py-3.5 bg-white border border-[#E7E2D9] rounded-xl focus:border-[#C08A3E] outline-none transition-colors text-[15px] text-[#10131C]"
        />
      </div>
      {error && <p className="mt-1.5 text-[#C0392B] text-xs pl-1">{error}</p>}
    </div>
  );
}

function PasswordField({ label, name, value, onChange, show, toggle, error }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-medium uppercase tracking-wide text-[#8A8478] mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A6A196]">
          <Lock size={18} />
        </div>
        <input
          id={name}
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder="••••••••"
          className="pc-focus w-full pl-11 pr-12 py-3.5 bg-white border border-[#E7E2D9] rounded-xl focus:border-[#C08A3E] outline-none transition-colors text-[15px] text-[#10131C]"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={show ? "Hide password" : "Show password"}
          className="pc-focus absolute right-4 top-1/2 -translate-y-1/2 text-[#A6A196] hover:text-[#10131C] transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-[#C0392B] text-xs pl-1">{error}</p>}
    </div>
  );
}