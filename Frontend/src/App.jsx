import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

// Auth Pages & Components
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';

// Pet Management Pages
import PetList from './pages/PetList';
import AddPet from './pages/AddPet';
import EditPet from './pages/EditPet';
import AdminDashboard from './pages/AdminDashboard';
import ManageBookings from './pages/ManageBookings';
import ManageUsers from './pages/ManageUsers';

// Booking System Pages
import BookService from './pages/BookService';
import BookingHistory from './pages/BookingHistory';
import BookingDetails from './pages/BookingDetails';

// Home & Pricing
import Home from './pages/Home';
import AdminPricing from './pages/AdminPricing';

// 404 Page
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pets" 
            element={
              <ProtectedRoute>
                <PetList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-pet" 
            element={
              <ProtectedRoute>
                <AddPet />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-pet/:id" 
            element={
              <ProtectedRoute>
                <EditPet />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book" 
            element={
              <ProtectedRoute>
                <BookService />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings" 
            element={
              <ProtectedRoute>
                <BookingHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bookings/:id" 
            element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            } 
          />

          {/* Admin Protected Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/pricing" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPricing />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/bookings" 
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageBookings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/users" 
            element={
              <ProtectedRoute adminOnly={true}>
                <ManageUsers />
              </ProtectedRoute>
            } 
          />

          {/* Catch-all Wildcard Route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
