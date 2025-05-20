
import { User, Pet, Appointment } from './types';

// Initialize localStorage with default data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem('users')) {
    // Create an admin user by default
    const adminUser: User = {
      id: '1',
      email: 'admin@vetclinic.com',
      password: 'admin123', // In real app, we'd use hashed passwords
      name: 'Admin User',
      role: 'admin'
    };
    
    localStorage.setItem('users', JSON.stringify([adminUser]));
    localStorage.setItem('pets', JSON.stringify([]));
    localStorage.setItem('appointments', JSON.stringify([]));
  }
};

// Users
export const getUsers = (): User[] => {
  initializeLocalStorage();
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

// Pets
export const getPets = (): Pet[] => {
  initializeLocalStorage();
  const pets = localStorage.getItem('pets');
  return pets ? JSON.parse(pets) : [];
};

export const getPetsByOwnerId = (ownerId: string): Pet[] => {
  const pets = getPets();
  return pets.filter(pet => pet.ownerId === ownerId);
};

export const getPetById = (id: string): Pet | undefined => {
  const pets = getPets();
  return pets.find(pet => pet.id === id);
};

export const addPet = (pet: Pet): void => {
  const pets = getPets();
  pets.push(pet);
  localStorage.setItem('pets', JSON.stringify(pets));
};

// Appointments
export const getAppointments = (): Appointment[] => {
  initializeLocalStorage();
  const appointments = localStorage.getItem('appointments');
  return appointments ? JSON.parse(appointments) : [];
};

export const getAppointmentsByUserId = (userId: string): Appointment[] => {
  const appointments = getAppointments();
  return appointments.filter(appointment => appointment.userId === userId);
};

export const getAppointmentsByStatus = (status: Appointment['status']): Appointment[] => {
  const appointments = getAppointments();
  return appointments.filter(appointment => appointment.status === status);
};

export const addAppointment = (appointment: Appointment): void => {
  const appointments = getAppointments();
  appointments.push(appointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const updateAppointment = (updatedAppointment: Appointment): void => {
  const appointments = getAppointments();
  const index = appointments.findIndex(appointment => appointment.id === updatedAppointment.id);
  
  if (index !== -1) {
    appointments[index] = updatedAppointment;
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }
};
