import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook for handling authentication forms
 * @param {string} mode - Authentication mode ('signin' or 'signup')
 * @param {Function} onSwitchMode - Function to switch between signin and signup modes
 * @param {string} callbackUrl - URL to redirect to after successful authentication
 * @returns {Object} Form state and handlers
 */
export default function useAuthForm(mode, onSwitchMode, callbackUrl = '/feed') {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [suggestSignup, setSuggestSignup] = useState(false);

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (mode === 'signin') {
        await login(formData.email.trim(), formData.password);
      } else {
        await signup(formData.email.trim(), formData.password, formData.name.trim());
      }
      router.replace(callbackUrl);
    } catch (err) {
      const code = err?.code || err?.message || '';
      
      if (mode === 'signin' && typeof code === 'string' && 
          (code.includes('auth/invalid-credential') || code.includes('auth/user-not-found'))) {
        setError('We could not find an account with these credentials.');
        setSuggestSignup(true);
      } else {
        const message = err?.message || `Failed to sign ${mode === 'signin' ? 'in' : 'up'}`;
        setError(message);
        setSuggestSignup(false);
      }
    }
  };

  /**
   * Handle input field changes
   * @param {string} field - Form field name
   * @param {string} value - New field value
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return {
    formData,
    error,
    showPassword,
    suggestSignup,
    handleSubmit,
    handleInputChange,
    togglePasswordVisibility
  };
}
