import React, { useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted?: boolean;
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist, isWishlisted }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success('Added to cart!');
  };

  const handleAddToWishlist = () => {
    onAddToWishlist(product);
    toast.success('Added to wishlist!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-square">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.button
          onClick={handleAddToWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors
            ${isWishlisted ? 'bg-purple-600' : 'bg-white hover:bg-purple-50'}`}
        >
          <Heart
            className={`h-5 w-5 ${isWishlisted ? 'text-white fill-current' : 'text-purple-600'}`}
          />
        </motion.button>
      </div>
      
      <div className="p-4">
        <motion.h3
          className="text-lg font-semibold text-purple-800 mb-2"
          animate={{ color: isHovered ? '#4C1D95' : '#6B21A8' }}
        >
          {product.name}
        </motion.h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-purple-700">₹{product.price}</span>
          <motion.button
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}