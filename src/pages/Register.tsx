
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const success = register(email, password, name);
    if (success) {
      navigate('/home');
    } else {
      setError('Email already in use');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 page-transition">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <div className="flex items-center justify-center mb-6">
          <PawPrint className="h-10 w-10 text-vet-blue mr-2" />
          <h1 className="text-2xl font-bold text-center text-vet-dark">
            Create VetCare Account
          </h1>
        </div>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="vet-input w-full"
              placeholder="John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="vet-input w-full"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="vet-input w-full"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="vet-input w-full"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            className="vet-button vet-button-primary w-full"
          >
            Register
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? {' '}
            <Link to="/login" className="text-vet-blue hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
