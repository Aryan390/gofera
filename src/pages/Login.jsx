import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useUser, useUserActions } from "../context/UserContext";
import { LogIn, Mail, Lock, UserPlus, Phone } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useUser();
  const { login, register, clearError } = useUserActions();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // // Clear error when switching modes
  // useEffect(() => {
  //   clearError();
  // }, [isLogin, clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    let result;
    if (isLogin) {
      result = await login({
        email: formData.email,
        password: formData.password,
      });
    } else {
      result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone,
      });
    }

    if (result.success) {
      console.log("Authentication successful");
      // Navigation will happen automatically via useEffect
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24">
      <div className="glass-card p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 animate-glow">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">
            {isLogin ? "Welcome Back" : "Join RideShare"}
          </h1>
          <p className="text-glass-foreground">
            {isLogin
              ? "Sign in to your account"
              : "Create your account to get started"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-glass-foreground mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-glass w-full"
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-glass-foreground mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-glass w-full pl-12"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-glass-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-glass w-full pl-12"
                  placeholder="Enter your phone number"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-glass-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-glass w-full pl-12"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-glass-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-glass w-full pl-12"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-primary-glass w-full flex items-center justify-center space-x-2 text-lg font-semibold"
          >
            {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            <span>{isLogin ? "Sign In" : "Create Account"}</span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-glass-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          {/* <button
            onClick={() => setIsLogin(!isLogin)}
            className="btn-glass mt-2 text-primary hover:text-primary-glow"
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button> */}
          <button
            onClick={handleToggleMode}
            className="text-blue-500 hover:text-blue-600 font-medium text-sm mt-1"
            disabled={isLoading}
          >
            {isLogin ? "Create Account" : "Sign In"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
