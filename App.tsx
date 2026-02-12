import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';

// Global Loading Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-[#dc2625] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);

/* =========================
   Lazy Loaded Pages
========================= */

// Public
const HomePage = lazy(() => import('./pages/public/Home/HomePage'));
const StorePage = lazy(() => import('./pages/public/Store'));
const ProductDetailsPage = lazy(() => import('./pages/public/ProductDetail'));
const CartPage = lazy(() => import('./pages/public/Cart'));
const OrderTrackingPage = lazy(() => import('./pages/public/OrderTracking'));
const AboutPage = lazy(() => import('./pages/public/About'));
const ContactPage = lazy(() => import('./pages/public/Contact'));
const FAQPage = lazy(() => import('./pages/public/FAQ'));

// Legal (individually lazy loaded)
const TermsPage = lazy(() => import('./pages/public/Legal/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/public/Legal/PrivacyPage'));
const RefundPolicyPage = lazy(() => import('./pages/public/Legal/RefundPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/public/Legal/CookiePolicyPage'));
const ShipmentPolicyPage = lazy(() => import('./pages/public/Legal/ShipmentPolicyPage'));

// Auth
const LoginPage = lazy(() => import('./pages/auth/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/Register/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPassword/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPassword/ResetPasswordPage'));

// Protected
const TransactionsPage = lazy(() => import('./pages/user/Transaction'));
const OrdersPage = lazy(() => import('./pages/user/Orders'));
const ProfilePage = lazy(() => import('./pages/user/Profile'));
const AddMoneyPage = lazy(() => import('./pages/user/Wallet'));

const App: React.FC = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        import('./pages/public/Store');
        import('./pages/public/Cart');
      });
    }

    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>

            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/store/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/support" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/tracking" element={<OrderTrackingPage />} />

            {/* Legal */}
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/refund" element={<RefundPolicyPage />} />
            <Route path="/cookie-policy" element={<CookiePolicyPage />} />
            <Route path="/shipping-policy" element={<ShipmentPolicyPage />} />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/transactions" element={<TransactionsPage />} />
              <Route path="/dashboard/orders" element={<OrdersPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/dashboard/wallet" element={<AddMoneyPage />} />
            </Route>

            {/* Auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
