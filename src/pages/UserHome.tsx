
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPetsByOwnerId, getAppointmentsByUserId } from '../utils/localStorage';
import { Pet, Appointment } from '../utils/types';
import Navbar from '../components/Navbar';
import PetForm from '../components/PetForm';
import PetList from '../components/PetList';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentList from '../components/AppointmentList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { CalendarIcon, PawPrint } from 'lucide-react';

const UserHome: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [activeTab, setActiveTab] = useState("pets");
  
  // If not logged in, redirect to login
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  // Load pets and appointments
  useEffect(() => {
    if (currentUser) {
      const userPets = getPetsByOwnerId(currentUser.id);
      setPets(userPets);
      
      const userAppointments = getAppointmentsByUserId(currentUser.id);
      setAppointments(userAppointments);
    }
  }, [currentUser]);

  const handlePetAdded = () => {
    if (currentUser) {
      setPets(getPetsByOwnerId(currentUser.id));
    }
  };

  const handleAppointmentAdded = () => {
    if (currentUser) {
      setAppointments(getAppointmentsByUserId(currentUser.id));
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 page-transition">
      <Navbar />
      
      <div className="vet-container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-vet-dark">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your pets and appointments all in one place.
          </p>
        </motion.div>
        
        <div className="mt-8">
          <Tabs defaultValue="pets" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="pets" className="flex items-center">
                <PawPrint className="mr-2 h-4 w-4" /> 
                My Pets
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" /> 
                Appointments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="pets">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <PetForm ownerId={currentUser.id} onPetAdded={handlePetAdded} />
                </div>
                <div className="lg:col-span-2">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 text-vet-dark">My Pets</h2>
                    <PetList pets={pets} />
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="appointments">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <AppointmentCalendar 
                    userId={currentUser.id} 
                    pets={pets} 
                    onAppointmentAdded={handleAppointmentAdded} 
                  />
                </div>
                <div className="lg:col-span-3">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 text-vet-dark">My Appointments</h2>
                    <AppointmentList 
                      appointments={appointments} 
                      pets={pets} 
                    />
                  </motion.div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
