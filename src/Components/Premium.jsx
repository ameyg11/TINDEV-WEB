
import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constants';

const CheckIcon = ({ className = 'w-6 h-6' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const TierIcon = ({ className = 'w-5 h-5' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2 1 21h22L12 2zm0 4.8 6.4 11.2H5.6L12 6.8z" />
  </svg>
);

const Feature = ({ children, highlighted }) => (
  <li className="flex items-start gap-3">
    <div
      className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
        highlighted
          ? 'bg-yellow-300/30'
          : 'bg-gray-300 dark:bg-gray-700'
      }`}
    >
      <CheckIcon
        className={`w-3.5 h-3.5 ${
          highlighted ? 'text-yellow-600' : 'text-gray-700 dark:text-gray-300'
        }`}
      />
    </div>
    <span
      className={`text-sm ${
        highlighted
          ? 'text-white/90'
          : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {children}
    </span>
  </li>
);

const Premium = () => {

  const handleBuyClick = async (type) => {
    try{
      const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount,    // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: 'TinDev',
        description: 'Connect to other developers seamlessly with some cool features',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes.firstName +  " " + notes.lastName,
          email: notes.emailId,
          contact: '********99'
        },
        theme: {
          color: '#F37254'
        },
      };

    const rzp = new window.Razorpay(options);
    rzp.open();
    }catch(err){
      console.log(err.message)
    }
  };

  return (
    <div className="relative font-sans flex flex-col items-center justify-center bg-white dark:bg-black min-h-screen px-4 py-20">
      
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white text-center">
        Choose Your
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 ml-2">
          Membership
        </span>
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mt-4 text-center max-w-xl">
        Pick a plan that fits your workflow and unlock powerful tools to help your team grow.
      </p>

      {/* Membership Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">

        {/* Silver Membership */}
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <TierIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">
              Silver
            </h3>
          </div>

          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="text-5xl font-bold">99</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">/ month</span>
          </div>

          <p className="mb-8 text-sm text-gray-700 dark:text-gray-300">
            Essential tools to help individuals and small teams stay organized.
          </p>

          <button onClick={() => handleBuyClick("silver")} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3.5 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Get Silver
          </button>

          <ul className="space-y-4 mt-8">
            <Feature>Basic Scheduling</Feature>
            <Feature>Email Notifications</Feature>
            <Feature>Unlimited Projects</Feature>
            <Feature>Standard Support</Feature>
          </ul>
        </div>

        {/* Gold Membership */}
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-black p-8 rounded-2xl shadow-xl border border-yellow-300">
          
          <div className="flex items-center gap-3 mb-6">
            <TierIcon className="w-6 h-6 text-black " />
            <h3 className="text-xs font-bold tracking-widest uppercase text-black ">
              Gold
            </h3>
          </div>

          <div className="flex items-baseline gap-1.5 mb-6">
            <span className="text-5xl font-bold">299</span>
            <span className="text-black text-sm">/ month</span>
          </div>

          <p className="mb-8 text-sm text-black ">
            Advanced tools, high performance, integrations, and priority support.
          </p>

          <button  onClick={() => handleBuyClick("gold")} className="w-full bg-white text-yellow-900 font-semibold py-3.5 rounded-lg hover:bg-gray-100 transition">
            Get Gold
          </button>

          <ul className="space-y-4 mt-8 ">
            <Feature highlighted>Everything in Silver</Feature>
            <Feature highlighted>Advanced Permissions</Feature>
            <Feature highlighted>Priority Support</Feature>
            <Feature highlighted>Automated Workflows</Feature>
            <Feature highlighted>Premium Integrations</Feature>
            <Feature highlighted>Project Templates</Feature>
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Premium;