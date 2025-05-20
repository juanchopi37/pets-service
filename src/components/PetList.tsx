
import React from 'react';
import { Pet } from '../utils/types';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Fade
} from '@mui/material';
import { Pets, PetsOutlined } from '@mui/icons-material';

interface PetListProps {
  pets: Pet[];
}

const PetList: React.FC<PetListProps> = ({ pets }) => {
  const getSpeciesIcon = (species: string) => {
    return <Pets className="h-5 w-5" />;
  };

  if (pets.length === 0) {
    return (
      <Box textAlign="center" p={3}>
        <Typography color="text.secondary">No pets registered yet.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {pets.map((pet, index) => (
        <Grid item xs={12} sm={6} md={4} key={pet.id}>
          <Fade in={true} timeout={(index + 1) * 300}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Box sx={{ 
                    bgcolor: 'primary.light', 
                    opacity: 0.1, 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center', 
                    borderRadius: '50%', 
                    p: 1,
                    mr: 1
                  }}>
                    {getSpeciesIcon(pet.species)}
                  </Box>
                  <Typography variant="h6">{pet.name}</Typography>
                </Box>
                
                <Box sx={{ '& > p': { mb: 0.5 } }}>
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" fontWeight="medium">Species:</Box> {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" fontWeight="medium">Breed:</Box> {pet.breed}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    <Box component="span" fontWeight="medium">Age:</Box> {pet.age} years
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      ))}
    </Grid>
  );
};

export default PetList;
