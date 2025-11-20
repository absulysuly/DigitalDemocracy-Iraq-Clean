import React from 'react';

interface DisabledNoticeProps {
  title: string;
  description: string;
}

export default function DisabledNotice({ title, description }: DisabledNoticeProps) {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-xl bg-white p-8 text-center shadow-md dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
}
