import { Toaster } from 'react-hot-toast';

export default function Notification() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2000,
        style: {
          background: '#4C1D95',
          color: '#fff',
        },
        success: {
          iconTheme: {
            primary: '#fff',
            secondary: '#4C1D95',
          },
        },
      }}
    />
  );
}