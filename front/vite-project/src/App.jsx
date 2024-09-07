import React, { useEffect } from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Form from './components/Form'
import './App.css';

function App() {

  useEffect(() => {
    console.log('User Agent:', navigator.userAgent);
  }, []);


  useEffect(() => {
    fetch('https://api.ipapi.is/')
    .then(response => response.json())
    .then(data => {
        console.log('IP:', data.ip);
        console.log('Country:', data.location.country);
        console.log('City:', data.location.city);
        console.log('Coordinates:', { latitude: data.location.latitude, longitude: data.location.longitude });
        console.log('isProxy:', data.is_proxy);
    })
    .catch(error => console.error('Error fetching IP data:', error));
  }, []);
  

  return (
    <>
      <Navbar/>
      <Form/>
      <Footer/>
    </>
  )
}

export default App
