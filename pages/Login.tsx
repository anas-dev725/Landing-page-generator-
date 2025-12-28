import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, Loader2, ArrowRight, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { login, register, getCurrentUser } from '../services/authService';

export const Login: React.FC = () => {
  // Check if any users exist in local storage to default to Login view
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem('launchcopy_users');
  });
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      navigate('/app', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (isLogin) {
        login(username.trim(), password.trim());
      } else {
        register(username.trim(), password.trim());
      }
      navigate('/app');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors relative">
      
      {/* Back to Home Button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <Link 
            to="/" 
            className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-bold transition-colors bg-white/50 dark:bg-slate-900/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800"
        >
            <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 transition-colors">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 group mb-6">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 dark:bg-indigo-600 text-white shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Rocket className="h-6 w-6 fill-current" />
                </div>
            </Link>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start generating high-converting copy today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Username</label>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-medium pr-12"
                    placeholder="Enter your password"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    tabIndex={-1}
                >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                    {isLogin ? 'Log In' : 'Sign Up'} <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => { setIsLogin(!isLogin); setError(''); }}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-950 p-6 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800">
            &copy; {new Date().getFullYear()} LaunchCopy. All rights reserved.
        </div>
      </div>
    </div>
  );
};