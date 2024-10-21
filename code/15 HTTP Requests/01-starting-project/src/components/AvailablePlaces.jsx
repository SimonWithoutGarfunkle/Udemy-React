import Places from './Places.jsx';
import { useState, useEffect } from 'react';
import ErrorMessage from './ErrorMessage.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(true);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const places = await fetchAvailablePlaces();       
        navigator.geolocation.getCurrentPosition((position) => {
          const sorted = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
          console.log('Location access granted');
          setAvailablePlaces(sorted)
          setIsFetching(false);
        }
        );

      } catch (error) {
        setError({ message: error.message || 'An unknown error occured, please try again later.' });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorMessage title="An error occured!" message={error.message} />
    );
  }


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
