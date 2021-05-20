import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.thecatapi.com/v1',
  headers: {
    'Content-type': "application/json",
    'x-api-key': process.env.REACT_APP_API_KEY
  }
});