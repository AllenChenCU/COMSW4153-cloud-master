import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useStore from '../state/useStore';
import Navbar from './Navbar';
import Footer from './Footer';
import Tagline from './Tagline';
import Features from './Features';
import Testimonials from './Testimonials';
import '../App.css';

function OAuthCallback() {
    const setUserInfo = useStore((state) => state.setUserInfo);
    const [errorLoginMessage, setErrorLoginMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            fetch('https://access-nyc-437301-k9.ue.r.appspot.com/profile', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',

                    },
                  })
                .then(response => response.json())
                .then(data => {
                  if (data.token) {
            
                    setUserInfo({
                      id: data.id,
                      displayName: data.displayName,
                      email: data.email});

                    localStorage.setItem('jwtToken', data.token);

                    navigate('/login');
                  } else {
                    setErrorLoginMessage('Authentication failed. Please try again.');
                  }
                })
                .catch(error =>{
                  console.error('Error:', error);
                  setErrorLoginMessage('Authentication failed. Please try again.');
                  });
        };

        handleCallback();
    }, [setUserInfo, setErrorLoginMessage, navigate]);

    if (errorLoginMessage) {
        return (
            <div className="App">
                <Navbar />
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-red-500">{errorLoginMessage}</p>
                <button className="text-red-500" onClick={() =>{setErrorLoginMessage(''); navigate('/');}}>Go Back</button>
            </div>
            </div>
        );
    }

    return (
    <div className="App">
    <Navbar />
    <div class="spinner-border text-primary" role="status" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '3' , margin: '50px'}}>
     {/* <span class="sr-only">Loading...</span> */}
       </div> 

    <Tagline />
    <Features />
    <Testimonials />
    <Footer />
  </div>
    );
}

export default OAuthCallback