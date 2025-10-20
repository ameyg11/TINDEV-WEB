'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice'; // Make sure this path is correct
import { BASE_URL } from '../utils/constants'; // Make sure this path is correct

// --- SVG Icons (for clean component structure) ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const LockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>;
const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"></polyline></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>;
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path></svg>;

// --- Main Auth Component ---
const Auth = () => {
  // State for toggling between Login and Signup
  const [isLoginForm, setIsLoginForm] = useState(true);
  
  // State for multi-step signup form
  const [step, setStep] = useState(1);
  
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- API Handlers ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(
        BASE_URL + '/login',
        { emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId: email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- UI Control Handlers ---
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleFormMode = () => {
    setIsLoginForm(!isLoginForm);
    // Reset state when switching forms
    setStep(1);
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setError('');
    setIsLoading(false);
  };

  // --- Render Logic ---
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100 dark:bg-black">
      <div className="w-full max-w-md">
        {isLoginForm ? (
          // --- Login Form ---
          <div className="signin-card bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Welcome Back</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to continue</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email-login" className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500"><MailIcon /></div>
                    <input id="email-login" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="auth-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm" required />
                </div>
              </div>
              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password-login" className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500"><LockIcon /></div>
                    <input id="password-login" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="auth-input w-full pl-9 pr-10 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm" required />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
                </div>
              </div>
              {/* Error Message */}
              {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
              {/* Submit Button */}
              <button type="submit" disabled={isLoading} className="auth-button w-full flex items-center justify-center">
                {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white dark:border-gray-900 border-t-transparent"></div> : 'Sign In'}
              </button>
            </form>
             {/* Toggle to Signup */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{' '}
                <button onClick={toggleFormMode} className="font-medium text-gray-900 dark:text-gray-100 hover:underline focus:outline-none">Sign up</button>
              </p>
            </div>
          </div>
        ) : (
          // --- Multi-Step Signup Form ---
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Step {step} of 3</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round((step / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="auth-progress bg-gray-900 dark:bg-gray-100 h-2 rounded-full" style={{ width: `${(step / 3) * 100}%` }} />
              </div>
            </div>

            <div className="signin-card bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full mb-4"><UserIcon /></div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Create account</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step === 1 && "Let's start with your name"}
                  {step === 2 && "Now, set up your credentials"}
                  {step === 3 && "Almost done! Review your details"}
                </p>
              </div>
              
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Step 1: Name */}
                {step === 1 && <div className="auth-step space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-900 dark:text-gray-100">First Name</label>
                        <input id="firstName" type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="e.g., John" className="auth-input w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm" required />
                    </div>
                     <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-900 dark:text-gray-100">Last Name</label>
                        <input id="lastName" type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="e.g., Doe" className="auth-input w-full px-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm" required />
                    </div>
                    <button type="button" onClick={handleNextStep} disabled={!firstName || !lastName} className="auth-button w-full flex items-center justify-center gap-2">Next Step <ArrowRightIcon /></button>
                </div>}

                {/* Step 2: Credentials */}
                {step === 2 && <div className="auth-step space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email-signup" className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500"><MailIcon /></div>
                            <input id="email-signup" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" className="auth-input w-full pl-9 pr-3 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm" required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password-signup" className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500"><LockIcon /></div>
                            <input id="password-signup" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" className="auth-input w-full pl-9 pr-10 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md text-sm" required />
                            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
                        </div>
                    </div>
                    <button type="button" onClick={handleNextStep} disabled={!email || !password} className="auth-button w-full flex items-center justify-center gap-2">Next Step <ArrowRightIcon /></button>
                </div>}

                {/* Step 3: Review */}
                {step === 3 && <div className="auth-step space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded-md space-y-2 text-sm">
                        <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400">First Name:</span><span className="font-medium text-gray-900 dark:text-gray-100">{firstName}</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400">Last Name:</span><span className="font-medium text-gray-900 dark:text-gray-100">{lastName}</span></div>
                        <div className="flex justify-between items-center"><span className="text-gray-600 dark:text-gray-400">Email:</span><span className="font-medium text-gray-900 dark:text-gray-100">{email}</span></div>
                    </div>
                    {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
                    <button type="submit" disabled={isLoading} className="auth-button w-full flex items-center justify-center">
                        {isLoading ? <div className="flex items-center justify-center gap-2"><div className="animate-spin rounded-full h-4 w-4 border-2 border-white dark:border-gray-900 border-t-transparent"></div> Creating Account...</div> : 'Create Account'}
                    </button>
                </div>}
              </form>
              
              {/* Back button */}
              {step > 1 && <button onClick={handlePrevStep} className="mt-4 w-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium flex items-center justify-center gap-2">
                <ArrowLeftIcon /> Back
              </button>}

              {/* Toggle to Login */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Already have an account?{' '}
                  <button onClick={toggleFormMode} className="font-medium text-gray-900 dark:text-gray-100 hover:underline focus:outline-none">Sign in</button>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;

// --- Styles for animations and focus states (place in a global CSS file or a <style> tag) ---
const styles = `
  .auth-input {
    color: #111827; /* dark:text-gray-100 */
    background-color: #ffffff; /* dark:bg-black */
    border-color: #e5e7eb; /* dark:border-gray-800 */
    transition: all 0.2s ease-in-out;
  }
  .dark .auth-input {
      color: #f9fafb;
  }
  .auth-input::placeholder {
    color: #6b7280; /* dark:text-gray-400 */
  }
  .auth-input:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: transparent;
    --tw-ring-color: #111827; /* dark:ring-gray-100 */
    box-shadow: 0 0 0 2px var(--tw-ring-color);
  }
  .dark .auth-input:focus {
    --tw-ring-color: #f9fafb;
  }
  .auth-button {
    background-color: #111827; /* dark:bg-gray-100 */
    color: #ffffff; /* dark:text-gray-900 */
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
  }
  .dark .auth-button {
    background-color: #f9fafb;
    color: #1f2937;
  }
  .auth-button:hover {
    transform: translateY(-1px);
    background-color: #374151; /* dark:hover:bg-gray-200 */
  }
  .dark .auth-button:hover {
      background-color: #e5e7eb;
  }
  .auth-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(0);
  }
  .auth-progress {
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .auth-step {
    animation: slideIn 0.3s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; translateY(0); }
  }
  .signin-card {
    animation: fadeIn 0.3s ease-out;
  }
`;

// This part is for client-side rendering frameworks like Next.js or Create React App
// If you have a global CSS file, it's better to put the styles there.
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}