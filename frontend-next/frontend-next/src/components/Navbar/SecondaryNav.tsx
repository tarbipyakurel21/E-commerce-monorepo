'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const SecondaryNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const links = [
    { label: 'All', value: 'All' },
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Fashion', value: 'Fashion' },
  ];

  const currentCategory = searchParams.get('category');

  const handleClick = (category: string) => {
    router.push(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="bg-[#e7ecf0] border-y border-gray-300 px-2 py-1">
      <div className="flex justify-center flex-wrap gap-2">
        {links.map((link, index) => {
          const isActive = currentCategory === link.value;

          return (
            <button
              key={index}
              onClick={() => handleClick(link.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200
                ${isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'}
              `}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SecondaryNav;
