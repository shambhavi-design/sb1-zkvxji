import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle } from 'lucide-react';

interface OrderStatusProps {
  orderId: string;
  status: 'processing' | 'dispatched' | 'delivered';
  dispatchDate?: Date;
  estimatedDelivery?: Date;
}

export default function OrderStatus({ orderId, status, dispatchDate, estimatedDelivery }: OrderStatusProps) {
  const steps = [
    { title: 'Order Processing', icon: Package, done: status !== 'processing' },
    { title: 'Dispatched', icon: Truck, done: status === 'dispatched' || status === 'delivered' },
    { title: 'Delivered', icon: CheckCircle, done: status === 'delivered' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Order #{orderId}</h3>
      
      <div className="relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        
        <div className="relative flex justify-between">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full 
                ${step.done ? 'bg-purple-600' : 'bg-gray-200'}`}>
                <step.icon className={`w-5 h-5 ${step.done ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-600">{step.title}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {dispatchDate && (
        <div className="mt-6 text-sm text-gray-600">
          <p>Dispatched on: {dispatchDate.toLocaleDateString()} at {dispatchDate.toLocaleTimeString()}</p>
          {estimatedDelivery && (
            <p>Estimated Delivery: {estimatedDelivery.toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}