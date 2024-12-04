import React from 'react';
import { categories } from '../data/categories';

interface ProductFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
}

export default function ProductFilter({
  selectedCategory,
  onCategoryChange,
  onPriceRangeChange,
}: ProductFilterProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="all"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={() => onCategoryChange('all')}
              className="text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="all" className="ml-2 text-gray-700">All Products</label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="radio"
                id={category.id}
                name="category"
                value={category.id}
                checked={selectedCategory === category.id}
                onChange={() => onCategoryChange(category.id)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor={category.id} className="ml-2 text-gray-700">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Price Range</h4>
        <div className="space-y-4">
          <button
            onClick={() => onPriceRangeChange(0, 100)}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded"
          >
            Under ₹100
          </button>
          <button
            onClick={() => onPriceRangeChange(100, 500)}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded"
          >
            ₹100 - ₹500
          </button>
          <button
            onClick={() => onPriceRangeChange(500, 1000)}
            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 rounded"
          >
            ₹500 - ₹1000
          </button>
        </div>
      </div>
    </div>
  );
}