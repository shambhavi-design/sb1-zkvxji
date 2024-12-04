import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { categories } from '../data/categories';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });

  const { dispatch: cartDispatch } = useCart();
  const { state: wishlistState, dispatch: wishlistDispatch } = useWishlist();

  useEffect(() => {
    const allProducts = Object.values(products).flat();
    const filtered = allProducts.filter((product) => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
      const priceMatch = product.price >= priceRange.min && product.price <= priceRange.max;
      const searchMatch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    });
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, searchQuery]);

  const handleAddToCart = (product: Product) => {
    cartDispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleAddToWishlist = (product: Product) => {
    wishlistDispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const isProductWishlisted = (productId: string) => {
    return wishlistState.items.some(item => item.id === productId);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-4">Our Products</h1>
          
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                ${selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-purple-50'}`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300
                  ${selectedCategory === category.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-purple-50'}`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Price Range Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setPriceRange({ min: 0, max: Infinity })}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-purple-50"
            >
              All Prices
            </button>
            <button
              onClick={() => setPriceRange({ min: 0, max: 100 })}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-purple-50"
            >
              Under ₹100
            </button>
            <button
              onClick={() => setPriceRange({ min: 100, max: 500 })}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-purple-50"
            >
              ₹100 - ₹500
            </button>
            <button
              onClick={() => setPriceRange({ min: 500, max: Infinity })}
              className="px-4 py-2 rounded-full text-sm font-medium bg-white text-gray-700 hover:bg-purple-50"
            >
              Above ₹500
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              isWishlisted={isProductWishlisted(product.id)}
            />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}