'use client';

import { toast as reactToast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Toast = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    draggable
    pauseOnFocusLoss={false}
    theme="colored"
    transition={Slide}
    toastClassName="bg-white shadow-md border-l-4 border-amber-500 rounded px-4 py-3 text-sm text-black"
/>
);

export const toast = {
  success: (msg: string) => reactToast.success(`✅ ${msg}`),
  error: (msg: string) => reactToast.error(`❌ ${msg}`),
  info: (msg: string) => reactToast.info(`ℹ️ ${msg}`),
  loading: (msg: string) => reactToast.loading(`⏳ ${msg}`),
  update: (
    id: string | number,
    msg: string,
    type: 'success' | 'error' | 'info'
  ) =>
    reactToast.update(id, {
      render: msg,
      type,
      isLoading: false,
      autoClose: 3000,
    }),
};
