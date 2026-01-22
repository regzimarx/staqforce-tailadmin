import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '../../Components/Layouts/AppLayout';

const Profile = ({ user, status }) => {
  const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
    name: user.name || '',
    email: user.email || '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(route('settings.profile.update'));
  };

  return (
    <AppLayout>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-title-md2 font-bold text-black dark:text-white">
              Profile Settings
            </h2>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {status && (
            <div className="mb-4 text-sm font-medium text-green-600">
              {status}
            </div>
          )}

          <form onSubmit={submit} className="bg-white dark:bg-boxdark p-6 rounded-lg shadow">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                type="submit"
                disabled={processing}
                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
              >
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>

          <div className="mt-6 bg-white dark:bg-boxdark p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Delete Account</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Permanently delete your account and all associated data.
            </p>
            
            <div className="mt-4">
              <a
                href={route('settings.profile.destroy')}
                method="delete"
                as="button"
                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-white hover:bg-red-700 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
              >
                Delete Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;