import React, { useContext } from 'react'; 
import { Outlet, useNavigate } from 'react-router-dom'; 
import { ShowProfileContext } from '../../context/ShowProfileContext'; 
import { FaTimes } from 'react-icons/fa'; 
 
function Buyer() { 
  const navigate = useNavigate(); 
  const { showProfile, setShowProfile } = useContext(ShowProfileContext); 
 
  const localuser = localStorage.getItem('userData'); 
  const userData = JSON.parse(localuser); 
 
  function handleLogout() { 
    localStorage.removeItem('userData'); 
    setShowProfile(false); 
    navigate('/'); 
  } 
 
  return ( 
    <div> 
      <nav style={{ display: 'flex', gap: '30px', marginLeft: '550px', justifyContent: 'flex-end' }}> 
        <button onClick={()=>{navigate('homebuyer')}}>Home</button> 
        <button onClick={()=>{navigate('news')}}>News</button> 
        <button>Weathers affecting Crops</button> 
        <input type='text' placeholder='search here' /> 
        <button>Cart</button> 
        <button onClick={() => setShowProfile(true)}>Profile</button> {/* Corrected this line */} 
      </nav> 
 
      {/* Profile */} 
      {showProfile && ( 
        <div 
          style={{ 
            position: 'fixed', 
            top: '15vh', 
            right: '5vw', 
            backgroundColor: '#fff', 
            border: '1px solid #ddd', 
            borderRadius: '8px', 
            padding: '20px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
            zIndex: '1000', 
          }} 
        > 
          <div style={{ marginBottom: '10px' }}> 
            <p> 
              <img 
                src={userData?.ProfileImage || 'default-image-url'} 
                alt='Profile' 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  objectFit: 'cover', 
                }} 
              /> 
            </p> 
          </div> 
          <button 
            onClick={() => setShowProfile(false)} // Corrected this line 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              cursor: 'pointer', 
              fontSize: '20px', 
              color: '#f44336', 
            }} 
          > 
            <FaTimes /> 
          </button> 
          <div style={{ marginBottom: '10px' }}> 
            <p><strong>Name:</strong> {userData?.Username || 'N/A'}</p> 
          </div> 
          <div style={{ marginBottom: '10px' }}> 
            <p><strong>Email:</strong> {userData?.Email || 'N/A'}</p> 
          </div> 
          <div style={{ marginBottom: '10px' }}> 
            <p><strong>Contact:</strong> {userData?.Phone || 'N/A'}</p> 
          </div> 
          <div style={{ marginBottom: '10px' }}> 
            <p><strong>Role:</strong> {userData?.role || 'N/A'}</p> 
          </div> 
          <button 
            onClick={handleLogout} 
            style={{ 
              backgroundColor: '#f44336', 
              color: '#fff', 
              border: 'none', 
              padding: '10px', 
              borderRadius: '6px', 
              cursor: 'pointer', 
              fontSize: '14px', 
              width: '100%', 
            }} 
          > 
            Log Out 
          </button> 
        </div> 
      )} 
      {/* Profile */} 
      <Outlet /> 
    </div> 
  ); 
} 
 
export default Buyer;