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
// home
import Home from './pages/Home';
//admin pricing 
import AdminPricing from './pages/AdminPricing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Default Route - Redirects straight to Login */}
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route path="/" element={<Home />} />

        {/*Admin pricing */}
        <Route path="/admin/pricing" element={<AdminPricing />} />


          {/* Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
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
          
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes - User must be logged in */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Pet Routes */}
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

          {/* Booking Routes */}
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
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;