
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserById, getPetsByOwnerId, getAppointmentsByUserId } from '../utils/localStorage';
import { User, Pet, Appointment } from '../utils/types';
import Navbar from '../components/Navbar';
import PetList from '../components/PetList';
import AppointmentList from '../components/AppointmentList';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Divider,
  Button,
  Tabs,
  Tab,
  Fade
} from '@mui/material';
import { ArrowBack, Person, Email } from '@mui/icons-material';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // Redirect if not admin
    if (!isAdmin) {
      navigate('/home');
      return;
    }

    // Load user data
    if (userId) {
      const userData = getUserById(userId);
      if (userData) {
        setUser(userData);
        setPets(getPetsByOwnerId(userId));
        setAppointments(getAppointmentsByUserId(userId));
      } else {
        navigate('/admin');
      }
    }
  }, [userId, isAdmin, navigate]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      <Navbar />
      
      <Container className="py-8" maxWidth="lg">
        <Box mb={4}>
          <Button 
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin')}
            sx={{ mb: 2 }}
          >
            Back to Dashboard
          </Button>
          
          <Fade in={true} timeout={500}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h1" fontWeight="bold" mb={3}>
                Client Details
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1" component="span" fontWeight="medium">
                      Name:
                    </Typography>
                    <Typography variant="body1" component="span" ml={1}>
                      {user.name}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1" component="span" fontWeight="medium">
                      Email:
                    </Typography>
                    <Typography variant="body1" component="span" ml={1}>
                      {user.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="user information tabs">
                    <Tab label="Pets" />
                    <Tab label="Appointments" />
                  </Tabs>
                </Box>
                
                <Box role="tabpanel" hidden={tabValue !== 0} sx={{ py: 3 }}>
                  {tabValue === 0 && (
                    <Fade in={true} timeout={500}>
                      <div>
                        <PetList pets={pets} />
                      </div>
                    </Fade>
                  )}
                </Box>
                
                <Box role="tabpanel" hidden={tabValue !== 1} sx={{ py: 3 }}>
                  {tabValue === 1 && (
                    <Fade in={true} timeout={500}>
                      <div>
                        <AppointmentList appointments={appointments} pets={pets} />
                      </div>
                    </Fade>
                  )}
                </Box>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default UserDetails;
