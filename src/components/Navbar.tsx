
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PawPrint } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="vet-container py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-8 w-8 text-vet-blue" />
            <span className="text-xl font-bold text-vet-dark">VetCare</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="text-vet-dark hover:text-vet-blue transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <Link 
                  to="/home" 
                  className="text-vet-dark hover:text-vet-blue transition-colors"
                >
                  My Pets
                </Link>
                <span className="text-vet-dark">
                  Hi, {currentUser.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="vet-button vet-button-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="vet-button border border-vet-blue text-vet-blue hover:bg-vet-blue hover:text-white"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="vet-button vet-button-primary"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
