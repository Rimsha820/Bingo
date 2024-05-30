import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-blue-300 h-12 w-full rounded-none shadow-md dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
