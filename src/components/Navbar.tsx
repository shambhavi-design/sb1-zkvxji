import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Menu } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-purple-600 hover:text-purple-800 transition-colors">Home</Link>
            <Link to="/shop" className="text-purple-600 hover:text-purple-800 transition-colors">Shop</Link>
            <Link to="/about" className="text-purple-600 hover:text-purple-800 transition-colors">About</Link>
            <Link to="/contact" className="text-purple-600 hover:text-purple-800 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-purple-600 hover:text-purple-800 transition-colors">
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="text-purple-600 hover:text-purple-800 transition-colors">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <button className="sm:hidden">
              <Menu className="h-6 w-6 text-purple-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}