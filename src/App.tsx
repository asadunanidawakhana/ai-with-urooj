import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/authStore';

import { AuthGuard } from './components/layout/AuthGuard';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import Home from './pages/public/Home';
import Pricing from './pages/public/Pricing';
import PlanDetail from './pages/public/PlanDetail';
import About from './pages/public/About';
import Contact from './pages/public/Contact';
import FAQ from './pages/public/FAQ';
import Terms from './pages/public/legal/Terms';
import Privacy from './pages/public/legal/Privacy';
import Refund from './pages/public/legal/Refund';

import Checkout from './pages/checkout/Checkout';
import Payment from './pages/checkout/Payment';
import PaymentSubmission from './pages/checkout/PaymentSubmission';
import OrderStatus from './pages/checkout/OrderStatus';

import Dashboard from './pages/user/Dashboard';
import MyOrders from './pages/user/MyOrders';
import Profile from './pages/user/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import PlansManagement from './pages/admin/PlansManagement';
import OrdersManagement from './pages/admin/OrdersManagement';
import UsersManagement from './pages/admin/UsersManagement';
import CouponsManagement from './pages/admin/CouponsManagement';
import AdminSettings from './pages/admin/AdminSettings';
import OrderDetails from './pages/admin/OrderDetails';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import EmailVerification from './pages/auth/EmailVerification';

function App() {
  const checkSession = useAuthStore((state) => state.checkSession);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout><Outlet /></PublicLayout>}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/plan/:id" element={<PlanDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
        </Route>

        {/* Checkout Flow */}
        <Route path="/checkout/:id" element={
          <AuthGuard>
            <Checkout />
          </AuthGuard>
        } />
        <Route path="/checkout/payment/:orderId" element={
          <AuthGuard>
            <Payment />
          </AuthGuard>
        } />
        <Route path="/checkout/submit/:orderId" element={
          <AuthGuard>
            <PaymentSubmission />
          </AuthGuard>
        } />
        <Route path="/checkout/status/:orderId" element={
          <AuthGuard>
            <OrderStatus />
          </AuthGuard>
        } />

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/verify-email" element={<EmailVerification />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
          {/* User Routes */}
          <Route
            path="/user/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/user/orders"
            element={
              <AuthGuard>
                <MyOrders />
              </AuthGuard>
            }
          />
          <Route
            path="/user/profile"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AuthGuard requireAdmin>
                <AdminDashboard />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/plans"
            element={
              <AuthGuard requireAdmin>
                <PlansManagement />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AuthGuard requireAdmin>
                <OrdersManagement />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <AuthGuard requireAdmin>
                <OrderDetails />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AuthGuard requireAdmin>
                <UsersManagement />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/coupons"
            element={
              <AuthGuard requireAdmin>
                <CouponsManagement />
              </AuthGuard>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AuthGuard requireAdmin>
                <AdminSettings />
              </AuthGuard>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
