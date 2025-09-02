import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

// --- NEW, MORE APPROPRIATE ICONS ---

// For "How It Works" Section
const PostIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ConnectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ContractIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

// For "Platform Impact" Section
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const VerifiedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const GrowthIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const SuccessIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


const Home = () => {
  const {user} = useContext(AppContext);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 ">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          
          <h1 className="text-4xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
            Connecting Farmers and Buyers Directly
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            A seamless platform for farmers to sell their produce and for buyers to source fresh, quality products without intermediaries.
          </p>
            {user ? (
              <div className="mt-8 flex justify-center space-x-4">
                <Button to={`/${user.role.toLowerCase()}-dashboard`}>Go to Dashboard</Button>
              </div>
            ) : (
              <div className="mt-8 flex justify-center space-x-4">
                <Button to="/signup">Get Started</Button>
                <Button to="/login">Login</Button>
              </div>
            )}
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">A simple, three-step process to connect and transact.</p>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mx-auto">
                <PostIcon />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">1. Post or Browse</h3>
              <p className="mt-2 text-base text-gray-500">Farmers post offers of their produce, and buyers post their requirements.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mx-auto">
                <ConnectIcon />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">2. Connect Directly</h3>
              <p className="mt-2 text-base text-gray-500">Send and receive requests to connect directly with interested parties.</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mx-auto">
                <ContractIcon />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">3. Form a Contract</h3>
              <p className="mt-2 text-base text-gray-500">Once a request is accepted, create a digital contract to finalize the deal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW Platform Impact Section --- */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">Platform Impact</span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4">Trusted by Thousands</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">Our growing community of farmers and buyers creates lasting partnerships that drive agricultural success.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <UsersIcon />
              <p className="text-3xl font-bold text-gray-900 mt-4">50,000+</p>
              <p className="text-base text-gray-500">Active Farmers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <VerifiedIcon />
              <p className="text-3xl font-bold text-gray-900 mt-4">2,500+</p>
              <p className="text-base text-gray-500">Verified Buyers</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <GrowthIcon />
              <p className="text-3xl font-bold text-gray-900 mt-4">₹500M+</p>
              <p className="text-base text-gray-500">Contracts Value</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <SuccessIcon />
              <p className="text-3xl font-bold text-gray-900 mt-4">98%</p>
              <p className="text-base text-gray-500">Success Rate</p>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">For Farmers</h2>
            <p className="mt-4 text-lg text-gray-500">Expand your reach and get the best price for your hard work.</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span>Access a wider market of buyers beyond your local area.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span>Communicate directly with buyers to negotiate better terms.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span>Secure deals with formal contracts for peace of mind.</span>
              </li>
            </ul>
          </div>
          <div className="mt-10 lg:mt-0">
             <h2 className="text-3xl font-extrabold text-gray-900">For Buyers</h2>
            <p className="mt-4 text-lg text-gray-500">Source the freshest produce directly from the farm.</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span>Find a consistent and reliable supply of quality products.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span>Enjoy a transparent procurement process with no hidden costs.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-2">✓</span>
                <span>Build long-term relationships with trusted farmers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">What Our Users Say</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <blockquote className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg text-gray-700">"This platform has transformed my business. I can now sell my crops to buyers across the state, and I'm getting much better prices than before."</p>
              <footer className="mt-4">
                <p className="font-bold text-gray-900">- Ramesh Patel, Farmer</p>
              </footer>
            </blockquote>
            <blockquote className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-lg text-gray-700">"Finding high-quality, organic vegetables used to be a challenge. Now, I can connect with farmers directly and source exactly what I need for my restaurant."</p>
              <footer className="mt-4">
                <p className="font-bold text-gray-900">- Priya Sharma, Buyer</p>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

