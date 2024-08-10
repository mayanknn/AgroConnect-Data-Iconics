import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function InfoHub() { 
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return ( 
    <div style={{display:'flex',width:'100%',height:'auto'}}> 
      <div style={{
    width: '20%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
    gap:'3vh'
}}>
    <button
        onClick={() => handleNavigation('news')}
        style={{
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            marginBottom: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            width: '100%',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
    >
        News
    </button>
    <button
        onClick={() => handleNavigation('schemes')}
        style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            marginBottom: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            width: '100%',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}
    >
        Schemes
    </button>
    <button
        onClick={() => handleNavigation('weather')}
        style={{
            backgroundColor: '#ffc107',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            width: '100%',
            textAlign: 'left',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            
        }}
    >
        Weather
    </button>
</div>
      <div style={{height:'85vh' ,width:'80vw',marginTop:'10vh', overflow:'scroll',display:'flex',justifyContent:'center',alignItems:'center'}}>

      <Outlet />
      </div>
    </div> 
  ); 
}

export default InfoHub;
