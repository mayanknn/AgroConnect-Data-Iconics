import React from "react";

const CityComponent = (props) => {
  const { updateCity, fetchWeather } = props;

  const searchBoxStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '20px',
    border: 'black solid 1px',
    borderRadius: '2px',
    width: '100%',
  };

  const inputStyle = {
    width: '20vw',
    height: '2.5vw',
    border: '0',
    outline: '0',
    borderRadius: '3vh',
    fontSize: '0.9vw',
    paddingLeft: '1vw',
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    backgroundColor: 'black',
    fontSize: '0.9vw',
    padding: '0 10px',
    color: 'white',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '2.8vw',
    height: '2.7vw',
    borderRadius: '50%',
  };

  return (
    <>
      <img
        src={"/react-weather-app/icons/perfect-day.svg"}
        alt="Weather Logo"
        style={{ width: '140px', height: '140px', margin: '40px auto' }}
      />
      <span style={{ color: 'black', margin: '10px auto', fontSize: '18px', fontWeight: 'bold' }}>Find Weather of your city</span>
      <form onSubmit={fetchWeather} style={searchBoxStyle}>
        <input
          onChange={(e) => updateCity(e.target.value)}
          placeholder="City"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          <img src={"/path-to-search-icon"} alt="search" style={{ width: '1.2vw' }} />
        </button>
      </form>
    </>
  );
};

export default CityComponent;
