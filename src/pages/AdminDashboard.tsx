
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAppointments, getUsers, getPets } from '../utils/localStorage';
import { Pet, Appointment, User } from '../utils/types';
import Navbar from '../components/Navbar';
import AppointmentList from '../components/AppointmentList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Box, 
  Typography, 
  Container, 
  Grid,
  Paper,
  TextField,
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Fade,
  Zoom
} from '@mui/material';
import { 
  CalendarMonth, 
  PeopleAlt, 
  AccessTime, 
  CheckCircle, 
  Search, 
  Pets 
} from '@mui/icons-material';

const AdminDashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // If not admin, redirect to home
  useEffect(() => {
    if (!isAdmin) {
      navigate('/home');
    }
  }, [isAdmin, navigate]);

  // Load data
  useEffect(() => {
    setAppointments(getAppointments());
    setPets(getPets());
    setUsers(getUsers().filter(user => user.role !== 'admin')); // Exclude admins from user list
  }, []);

  const handleAppointmentStatusChange = () => {
    // Refresh appointments when status changes
    setAppointments(getAppointments());
  };

  const upcomingAppointments = appointments.filter(a => a.status === 'scheduled');
  const completedAppointments = appointments.filter(a => a.status === 'completed');
  const cancelledAppointments = appointments.filter(a => a.status === 'cancelled');
  
  // Filter appointments based on search
  const filteredAppointments = searchTerm
    ? appointments.filter(appointment => {
        const pet = pets.find(p => p.id === appointment.petId);
        const user = users.find(u => u.id === appointment.userId);
        return (
          pet?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : appointments;

  if (!isAdmin) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Container className="py-8" maxWidth="lg">
        <Fade in={true} timeout={500}>
          <div>
            <Typography variant="h4" component="h1" fontWeight="bold" color="text.primary">
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Manage appointments, view client data, and more.
            </Typography>
          </div>
        </Fade>
        
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '100ms' }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                  <CalendarMonth fontSize="small" color="action" />
                </CardHeader>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{upcomingAppointments.length}</Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '200ms' }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
                  <PeopleAlt fontSize="small" color="action" />
                </CardHeader>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{users.length}</Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Zoom in={true} style={{ transitionDelay: '300ms' }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Registered Pets</CardTitle>
                  <Pets fontSize="small" color="action" />
                </CardHeader>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{pets.length}</Typography>
                </CardContent>
              </Card>
            </Zoom>
          </Grid>
        </Grid>
        
        <Box mt={5}>
          <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "stretch", sm: "center" }} mb={3}>
            <Typography variant="h5" component="h2" fontWeight="bold" color="text.primary" mb={{ xs: 2, sm: 0 }}>
              Appointments
            </Typography>
            <Box position="relative" width={{ xs: "100%", sm: "auto" }}>
              <Search sx={{ position: 'absolute', top: 10, left: 10, color: 'text.secondary', zIndex: 1 }} />
              <TextField
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                sx={{ pl: 4, width: { xs: '100%', sm: '250px' } }}
                InputProps={{
                  sx: { paddingLeft: 4 }
                }}
              />
            </Box>
          </Box>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center">
                <AccessTime className="mr-2 h-4 w-4" /> Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" /> Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <AppointmentList 
                appointments={filteredAppointments} 
                pets={pets} 
                isAdmin={true}
                onStatusChange={handleAppointmentStatusChange}
              />
            </TabsContent>
            
            <TabsContent value="upcoming">
              <AppointmentList 
                appointments={filteredAppointments.filter(a => a.status === 'scheduled')} 
                pets={pets} 
                isAdmin={true}
                onStatusChange={handleAppointmentStatusChange}
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <AppointmentList 
                appointments={filteredAppointments.filter(a => a.status === 'completed')} 
                pets={pets} 
                isAdmin={true}
                onStatusChange={handleAppointmentStatusChange}
              />
            </TabsContent>
            
            <TabsContent value="cancelled">
              <AppointmentList 
                appointments={filteredAppointments.filter(a => a.status === 'cancelled')} 
                pets={pets} 
                isAdmin={true}
                onStatusChange={handleAppointmentStatusChange}
              />
            </TabsContent>
          </Tabs>
        </Box>
        
        <Fade in={true} timeout={1000}>
          <Box mt={5}>
            <Typography variant="h5" component="h2" fontWeight="bold" color="text.primary" mb={3}>
              Clients
            </Typography>
            <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Table>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Pets</TableCell>
                    <TableCell>Appointments</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user.id} hover>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{pets.filter(pet => pet.ownerId === user.id).length}</TableCell>
                      <TableCell>{appointments.filter(appointment => appointment.userId === user.id).length}</TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          color="primary" 
                          sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                          onClick={() => navigate(`/user-details/${user.id}`)}
                        >
                          View Details
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No clients registered yet.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
