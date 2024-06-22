'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import React from 'react';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);

  const handleSignUp = async () => {
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      if (res?.user) {
        sessionStorage.setItem('user', JSON.stringify(res.user));
        setEmail('');
        setPassword('');
      }
    } catch (e) {
      console.error('Sign-up error:', e);
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>
        {error && <p className="text-red-500">{error.message}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
