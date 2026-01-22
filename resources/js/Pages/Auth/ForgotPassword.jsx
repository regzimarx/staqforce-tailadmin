import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '../../Components/Layouts/GuestLayout';

const ForgotPassword = ({ status }) => {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <GuestLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Forgot Password
          </h3>
        </div>
        <form onSubmit={submit}>
          <div className="p-6.5">
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
              </p>
              
              {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                  {status}
                </div>
              )}
            </div>

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {processing ? 'Sending...' : 'Email Password Reset Link'}
            </button>

            <div className="mt-6 text-center">
              <a href={route('login')} className="text-primary hover:underline">
                Back to login
              </a>
            </div>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
};

export default ForgotPassword;