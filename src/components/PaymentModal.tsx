import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPaymentComplete: () => void;
}

export default function PaymentModal({ isOpen, onClose, total, onPaymentComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [showQR, setShowQR] = React.useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      onPaymentComplete();
      onClose();
    }, 1500);
  };

  const upiQRCode = "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"; // Replace with actual QR code

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold text-purple-900 mb-6">Payment Details</h2>
            
            <div className="mb-6">
              <p className="text-lg font-semibold text-purple-800">
                Total Amount: ₹{total}
              </p>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowQR(false);
                    }}
                    className="mr-2 text-purple-600"
                  />
                  Credit/Debit Card
                </label>

                <label className="block">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowQR(false);
                    }}
                    className="mr-2 text-purple-600"
                  />
                  UPI
                </label>

                <label className="block">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={paymentMethod === 'netbanking'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowQR(false);
                    }}
                    className="mr-2 text-purple-600"
                  />
                  Net Banking
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      placeholder="UPI ID"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowQR(!showQR)}
                      className="ml-2 p-2 text-purple-600 hover:bg-purple-50 rounded-full"
                    >
                      <QrCode className="h-6 w-6" />
                    </button>
                  </div>
                  
                  {showQR && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center space-y-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={upiQRCode}
                        alt="UPI QR Code"
                        className="w-48 h-48 object-contain"
                      />
                      <p className="text-sm text-gray-600">Scan QR code to pay</p>
                      <p className="text-sm font-medium text-purple-800">UPI ID: mmcoe.store@upi</p>
                    </motion.div>
                  )}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
              >
                Pay Now
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}