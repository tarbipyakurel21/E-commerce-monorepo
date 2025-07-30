'use client';

import { useRouter } from 'next/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import LocationIndicator from '@/components/Navbar/LocationIndicator';
import SearchBar from '@/components/Navbar/SearchBar';
import type { RootState } from '@/redux/store';

const TopNav = () => {
  const router = useRouter();
  
  // ✅ Correctly access cart items from Redux state
  const cartData = useSelector((state: RootState) => state.cart.data);

  // ✅ Safely compute total quantity in cart
  const cartCount = cartData?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  // ✅ Compute total price
const cartTotal = cartData?.items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
) ?? 0;


  return (
    <div className="bg-gray-900 text-white shadow-sm px-3 py-1 w-full text-sm">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">

        {/* Logo + Location */}
        <div className="flex items-center justify-between w-full md:w-1/3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/')}
            role="button"
            aria-label="Go to homepage"
          >
            <img src="/favicon.ico" alt="MyShop Logo" className="h-7" />
            <h5 className="text-base font-semibold hidden sm:block">MyShop</h5>
          </div>

          <div className="hidden md:block">
            <LocationIndicator />
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full md:w-2/5">
          <SearchBar />
        </div>

        {/* Action buttons */}
        <div className="w-full md:w-1/4 flex items-center justify-between md:justify-end gap-4">

          {/* Sign In */}
          <div
            onClick={() => router.push('/login')}
            className="cursor-pointer flex flex-col justify-center items-start leading-tight"
            role="button"
            aria-label="Login"
          >
            <span className="text-[11px]">Hello, sign in</span>
            <span className="text-sm font-semibold -mt-0.5">Account & Lists</span>
          </div>

          {/* Orders */}
          <div
            onClick={() => router.push('/orders')}
            className="hidden md:flex flex-col justify-center items-start leading-tight cursor-pointer"
            role="button"
            aria-label="Go to orders"
          >
            <span className="text-[11px]">Returns</span>
            <span className="text-sm font-semibold -mt-0.5">& Orders</span>
          </div>

     {/* Cart */}
<div
  onClick={() => router.push('/cart')}
  className="relative flex flex-col items-center gap-0.5 cursor-pointer hover:text-yellow-400 transition-colors"
  role="button"
  aria-label="Go to cart"
>
  {/* Cart icon with badge */}
  <div className="relative">
    <FaShoppingCart className="text-2xl" />
    {cartCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold px-[6px] py-[1px] rounded-full border border-white shadow">
        {cartCount}
      </span>
    )}
  </div>

  {/* Cart total price below the icon */}
  <span className="text-xs font-semibold text-white">
    ${cartTotal.toFixed(2)}
  </span>
</div>


        </div>
      </div>
    </div>
  );
};

export default TopNav;
