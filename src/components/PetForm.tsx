
import React, { useState } from 'react';
import { Pet } from '../utils/types';
import { addPet } from '../utils/localStorage';
import { motion } from 'framer-motion';

interface PetFormProps {
  ownerId: string;
  onPetAdded: () => void;
}

const PetForm: React.FC<PetFormProps> = ({ ownerId, onPetAdded }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState<number>(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!name || !breed || age < 0) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    const newPet: Pet = {
      id: Date.now().toString(),
      name,
      species,
      breed,
      age,
      ownerId
    };

    addPet(newPet);
    
    // Reset form
    setName('');
    setSpecies('dog');
    setBreed('');
    setAge(0);
    setIsSubmitting(false);
    onPetAdded();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg p-6 shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4 text-vet-dark">Register a New Pet</h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Pet Name*
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="vet-input w-full"
            placeholder="Buddy"
          />
        </div>
        
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
            Species*
          </label>
          <select
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="vet-input w-full"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="bird">Bird</option>
            <option value="rabbit">Rabbit</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
            Breed*
          </label>
          <input
            id="breed"
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="vet-input w-full"
            placeholder="Golden Retriever"
          />
        </div>
        
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age (years)*
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            className="vet-input w-full"
            min="0"
          />
        </div>
        
        <button 
          type="submit" 
          className="vet-button vet-button-secondary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registering...' : 'Register Pet'}
        </button>
      </form>
    </motion.div>
  );
};

export default PetForm;
