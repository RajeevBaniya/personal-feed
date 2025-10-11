import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function useAuthForm(mode, onSwitchMode, callbackUrl = '/feed') {
  const { login, signup } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [suggestSignup, setSuggestSignup] = useState(false);

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
