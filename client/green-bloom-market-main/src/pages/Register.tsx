import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    specialChar: /[\W_]/.test(password),
  };

  const isPasswordValid = Object.values(validations).every(Boolean);

  const getPasswordStrength = () => {
    const passed = Object.values(validations).filter(Boolean).length;
    if (passed <= 2) return 'Weak';
    if (passed === 3) return 'Moderate';
    return 'Strong';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isPasswordValid) {
      setError('Password does not meet all criteria.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (email === 'admin098@gmail.com') {
      setError('This email is reserved for admin use');
      return;
    }

    setLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        alert('Registration successful! You can now log in.');
        navigate('/login');
      } else {
        setError('A user with this email already exists.');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validationList = [
    { label: 'At least 8 characters', valid: validations.length },
    { label: 'One uppercase letter', valid: validations.uppercase },
    { label: 'One lowercase letter', valid: validations.lowercase },
    { label: 'One special character', valid: validations.specialChar },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Join Green Bloom and start your gardening journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute right-2 top-2 text-gray-500">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <div className="text-sm font-medium">Strength: {getPasswordStrength()}</div>
                  <ul className="text-sm space-y-1 mt-2">
                    {validationList.map((rule, index) => (
                      <li key={index} className={rule.valid ? 'text-green-600' : 'text-red-600'}>
                        {rule.valid ? <CheckCircle size={14} className="inline mr-1" /> : <XCircle size={14} className="inline mr-1" />}
                        {rule.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={confirmPassword && confirmPassword !== password ? 'border-red-500' : ''}
                  />
                  {confirmPassword && confirmPassword !== password && (
                    <p className="text-sm text-red-500">Passwords do not match</p>
                  )}
                </div>
                {error && (
                  <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md">{error}</div>
                )}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline">Sign in here</Link>
              </div>
              <div className="mt-2 text-center text-xs text-muted-foreground">
                Note: You must register first before you can log in
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
