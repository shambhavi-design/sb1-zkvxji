import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import PaymentModal from '../components/PaymentModal';
import OrderStatus from '../components/OrderStatus';
import toast from 'react-hot-toast';

export default function Cart() {
  const { state, dispatch } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<{
    orderId: string;
    status: 'processing' | 'dispatched' | 'delivered';
    dispatchDate?: Date;
    estimatedDelivery?: Date;
  } | null>(null);

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity: Math.max(0, quantity) },
    });
    toast.success('Cart updated successfully!');
  };

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Item removed from cart!');
  };

  const handlePaymentComplete = () => {
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const dispatchDate = new Date();
    dispatchDate.setDate(dispatchDate.getDate() + 1);
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    setOrderStatus({
      orderId,
      status: 'processing',
      dispatchDate,
      estimatedDelivery,
    });

    toast.success('Payment successful! Thank you for your purchase.');
    state.items.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id });
    });

    // Simulate order status updates
    setTimeout(() => {
      setOrderStatus(prev => prev ? { ...prev, status: 'dispatched' } : null);
      toast.success('Your order has been dispatched!');
    }, 5000);

    setTimeout(() => {
      setOrderStatus(prev => prev ? { ...prev, status: 'delivered' } : null);
      toast.success('Your order has been delivered!');
    }, 10000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Shopping Cart</h1>

      {orderStatus && (
        <div className="mb-8">
          <OrderStatus {...orderStatus} />
        </div>
      )}

      {state.items.length === 0 && !orderStatus ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-600">Your cart is empty</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="text-lg font-semibold text-purple-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <MinusCircle className="h-5 w-5" />
                    </button>
                    <span className="text-gray-600">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-purple-800 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-purple-800">₹{total}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}