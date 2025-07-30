import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-10 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* About Section */}
          <div>
            <h6 className="text-lg font-semibold mb-3">About Us</h6>
            <ul className="space-y-2 text-sm pl-0">
              <li><Link href="/about" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Company Info</Link></li>
              <li><Link href="/careers" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Careers</Link></li>
              <li><Link href="/press" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Help & Support</h6>
            <ul className="space-y-2 text-sm pl-0">
              <li><Link href="/contact" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Legal</h6>
            <ul className="space-y-2 text-sm pl-0">
              <li><Link href="/terms" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-gray-100 no-underline hover:text-gray-300 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="text-lg font-semibold mb-3">Follow Us On:</h6>
            <div className="flex space-x-4 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-100 no-underline hover:text-blue-500 transition-colors"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-100 no-underline hover:text-pink-500 transition-colors"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-gray-100 no-underline hover:text-blue-400 transition-colors"><FaTwitter /></a>
            </div>
          </div>

        </div>

        <div className="bg-gray-800 mt-10 py-4 rounded-md">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} MyShop.com
          </p>
        </div>
      </div>
    </footer>
  );
}
