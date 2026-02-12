import React, { useEffect, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-[#dc2625] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-600 font-medium">Loading...</p>
    </div>
  </div>
);

// Lazy load all route components for code splitting
// Public Pages
const HomePage = lazy(() => import('./pages/public/Home/HomePage'));
const StorePage = lazy(() => import('./pages/public/Store'));
const ProductDetailsPage = lazy(() => import('./pages/public/ProductDetail'));
const CartPage = lazy(() => import('./pages/public/Cart'));
const OrderTrackingPage = lazy(() => import('./pages/public/OrderTracking'));
const AboutPage = lazy(() => import('./pages/public/About'));
const ContactPage = lazy(() => import('./pages/public/Contact'));
const FAQPage = lazy(() => import('./pages/public/FAQ'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/auth/Login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/auth/Register/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPassword/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPassword/ResetPasswordPage'));

// Protected User Pages
const TransactionsPage = lazy(() => import('./pages/user/Transaction'));
const OrdersPage = lazy(() => import('./pages/user/Orders'));
const ProfilePage = lazy(() => import('./pages/user/Profile'));
const AddMoneyPage = lazy(() => import('./pages/user/Wallet'));

// Legal Pages - Can be loaded together as they're accessed less frequently
const LegalPages = lazy(() => import('./pages/public/Legal'));

const App: React.FC = () => {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    
    // Prefetch critical routes on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Prefetch store and cart pages (high-priority user flows)
        import('./pages/public/Store');
        import('./pages/public/Cart');
      });
    }
    
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Public Routes with Suspense */}
          <Route 
            path="/" 
            element={
              <Suspense fallback={<PageLoader />}>
                <HomePage />
              </Suspense>
            } 
          />
          <Route 
            path="/store" 
            element={
              <Suspense fallback={<PageLoader />}>
                <StorePage />
              </Suspense>
            } 
          />
          <Route 
            path="/store/product/:id" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ProductDetailsPage />
              </Suspense>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Suspense fallback={<PageLoader />}>
                <CartPage />
              </Suspense>
            } 
          />
          <Route 
            path="/about" 
            element={
              <Suspense fallback={<PageLoader />}>
                <AboutPage />
              </Suspense>
            } 
          />
          <Route 
            path="/support" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ContactPage />
              </Suspense>
            } 
          />
          <Route 
            path="/faq" 
            element={
              <Suspense fallback={<PageLoader />}>
                <FAQPage />
              </Suspense>
            } 
          />
          <Route 
            path="/tracking" 
            element={
              <Suspense fallback={<PageLoader />}>
                <OrderTrackingPage />
              </Suspense>
            } 
          />
          
          {/* Legal Routes */}
          <Route 
            path="/terms" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPages.TermsPage />
              </Suspense>
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPages.PrivacyPage />
              </Suspense>
            } 
          />
          <Route 
            path="/refund" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPages.RefundPolicyPage />
              </Suspense>
            } 
          />
          <Route 
            path="/cookie-policy" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPages.CookiePolicyPage />
              </Suspense>
            } 
          />
          <Route 
            path="/shipping-policy" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LegalPages.ShipmentPolicyPage />
              </Suspense>
            } 
          />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route 
              path="/dashboard/transactions" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <TransactionsPage />
                </Suspense>
              } 
            />
            <Route 
              path="/dashboard/orders" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <OrdersPage />
                </Suspense>
              } 
            />
            <Route 
              path="/dashboard/profile" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <ProfilePage />
                </Suspense>
              } 
            />
            <Route 
              path="/dashboard/wallet" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <AddMoneyPage />
                </Suspense>
              } 
            />
          </Route>
          
          {/* Auth Routes */}
          <Route 
            path="/login" 
            element={
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            } 
          />
          <Route 
            path="/register" 
            element={
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ForgotPasswordPage />
              </Suspense>
            } 
          />
          <Route 
            path="/reset-password" 
            element={
              <Suspense fallback={<PageLoader />}>
                <ResetPasswordPage />
              </Suspense>
            } 
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
