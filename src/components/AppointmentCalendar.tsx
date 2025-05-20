
import React, { useState } from 'react';
import { Pet, Appointment } from '../utils/types';
import { addAppointment } from '../utils/localStorage';
import { Calendar } from '@/components/ui/calendar';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon } from 'lucide-react';

interface AppointmentCalendarProps {
  userId: string;
  pets: Pet[];
  onAppointmentAdded: () => void;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ 
  userId, 
  pets,
  onAppointmentAdded 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPetId, setSelectedPetId] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedDate || !selectedTime || !selectedPetId || !reason) {
      setError('Please fill in all fields');
      return;
    }

    // Format date to ISO string for storage
    const formattedDate = selectedDate.toISOString().split('T')[0];

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      petId: selectedPetId,
      userId,
      date: formattedDate,
      time: selectedTime,
      reason,
      status: 'scheduled'
    };

    addAppointment(newAppointment);
    
    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setSelectedPetId('');
    setReason('');
    
    // Notify
    toast({
      title: "Appointment Scheduled",
      description: `Your appointment has been scheduled for ${formattedDate} at ${selectedTime}.`,
    });
    
    onAppointmentAdded();
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-vet-dark">Schedule an Appointment</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {pets.length === 0 ? (
        <div className="text-center p-4 bg-yellow-50 rounded-md">
          <p className="text-yellow-700">Please register a pet before scheduling an appointment.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pet" className="block text-sm font-medium text-gray-700 mb-1">
              Select Pet*
            </label>
            <select
              id="pet"
              value={selectedPetId}
              onChange={(e) => setSelectedPetId(e.target.value)}
              className="vet-input w-full"
            >
              <option value="">Select a pet</option>
              {pets.map(pet => (
                <option key={pet.id} value={pet.id}>
                  {pet.name} ({pet.species})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date*
            </label>
            <div className="border rounded-md p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => isWeekend(date) || isPastDate(date)}
                className="rounded-md border"
              />
            </div>
          </div>
          
          {selectedDate && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time*
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {timeSlots.map(time => (
                  <button
                    type="button"
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 text-sm rounded-md transition-colors ${
                      selectedTime === time 
                        ? 'bg-vet-blue text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit*
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="vet-input w-full h-24"
              placeholder="Please describe the reason for your visit..."
            />
          </div>
          
          <button 
            type="submit" 
            className="vet-button vet-button-primary w-full flex items-center justify-center"
            disabled={!selectedDate || !selectedTime || !selectedPetId || !reason}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Schedule Appointment
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default AppointmentCalendar;
