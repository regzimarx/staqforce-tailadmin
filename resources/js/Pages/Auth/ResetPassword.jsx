import React from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '../../Components/Layouts/GuestLayout';

const ResetPassword = ({ token, email, status, errors }) => {
  const { data, setData, post, processing } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('password.store'));
  };

  return (
    <GuestLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Reset Password
          </h3>
        </div>
        <form onSubmit={submit}>
          <div className="p-6.5">
            {status && (
              <div className="mb-4 text-sm font-medium text-green-600">
                {status}
              </div>
            )}

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

            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <div className="mb-5.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              {errors.password_confirmation && (
                <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={processing}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {processing ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </GuestLayout>
  );
};

export default ResetPassword;