
import React from 'react';
import { Appointment, Pet } from '../utils/types';
import { motion } from 'framer-motion';
import { CalendarIcon, Clock, Check, X } from 'lucide-react';
import { updateAppointment } from '../utils/localStorage';
import { toast } from '@/components/ui/use-toast';

interface AppointmentListProps {
  appointments: Appointment[];
  pets: Pet[];
  isAdmin?: boolean;
  onStatusChange?: () => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ 
  appointments, 
  pets, 
  isAdmin = false,
  onStatusChange 
}) => {
  const getPetName = (petId: string) => {
    const pet = pets.find(p => p.id === petId);
    return pet ? pet.name : 'Unknown Pet';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (appointment: Appointment, newStatus: Appointment['status']) => {
    const updatedAppointment = {
      ...appointment,
      status: newStatus
    };
    
    updateAppointment(updatedAppointment);
    
    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${newStatus}.`,
    });

    if (onStatusChange) {
      onStatusChange();
    }
  };

  if (appointments.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">No appointments found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <motion.div
          key={appointment.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg p-5 shadow-md card-shadow"
        >
          <div className="flex flex-wrap justify-between">
            <div className="mb-2 md:mb-0">
              <h3 className="text-lg font-medium">
                {getPetName(appointment.petId)}
              </h3>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <CalendarIcon className="mr-1 h-4 w-4" /> 
                {formatDate(appointment.date)}
                <Clock className="ml-3 mr-1 h-4 w-4" /> 
                {appointment.time}
              </div>
            </div>
            
            <div className="flex items-start">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            <p><span className="font-medium">Reason:</span> {appointment.reason}</p>
            {appointment.notes && (
              <p className="mt-1"><span className="font-medium">Notes:</span> {appointment.notes}</p>
            )}
          </div>
          
          {isAdmin && appointment.status === 'scheduled' && (
            <div className="mt-3 flex space-x-2">
              <button 
                onClick={() => handleStatusChange(appointment, 'completed')}
                className="flex items-center px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
              >
                <Check className="mr-1 h-3 w-3" /> Mark Completed
              </button>
              
              <button 
                onClick={() => handleStatusChange(appointment, 'cancelled')}
                className="flex items-center px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
              >
                <X className="mr-1 h-3 w-3" /> Cancel
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default AppointmentList;
