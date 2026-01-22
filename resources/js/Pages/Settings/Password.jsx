import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../Components/Layouts/AppLayout';

const Password = ({ user, status }) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(route('settings.password.update'), {
      onSuccess: () => reset('current_password', 'password', 'password_confirmation'),
    });
  };

  return (
    <AppLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Password Settings
            </h2>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              Password updated successfully!
            </div>
          )}

          <form onSubmit={submit} className="bg-white dark:bg-boxdark p-6 rounded-lg shadow">
            <div className="mb-4">
              <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="current_password"
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.current_password && (
                <div className="text-red-500 text-sm mt-1">{errors.current_password}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="password_confirmation"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.password_confirmation && (
                <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
              >
                {processing ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Password;