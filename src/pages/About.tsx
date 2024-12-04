import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-8"
      >
        <h1 className="text-3xl font-bold text-purple-800 mb-6">About MMCOE Stationery Store</h1>
        
        <div className="prose prose-purple max-w-none">
          <p className="text-gray-600 mb-6">
            Welcome to MMCOE Stationery Store, your trusted partner in academic excellence. Located at the heart of MMCOE campus,
            we've been serving students and faculty with high-quality stationery and academic supplies since our establishment.
          </p>
          
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide students and faculty with convenient access to high-quality stationery and academic supplies at competitive prices,
            while ensuring exceptional customer service and a seamless shopping experience.
          </p>
          
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Extensive range of academic and stationery supplies</li>
            <li>Competitive prices for students</li>
            <li>Convenient campus location</li>
            <li>Quality products from trusted brands</li>
            <li>Excellent customer service</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Store Hours</h2>
          <p className="text-gray-600 mb-6">
            Monday - Friday: 8:00 AM - 6:00 PM<br />
            Saturday: 9:00 AM - 2:00 PM<br />
            Sunday: Closed
          </p>
        </div>
      </motion.div>
    </div>
  );
}