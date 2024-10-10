// src/api.js
import axios from 'axios';

// Function to fetch both tickets and users
export const fetchData = async () => {
  try {
    const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment'); // Replace with your actual API URL
    const { tickets, users } = response.data; // Destructure tickets and users from the API response
    return { tickets, users };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
