import React, { useState } from 'react';
import axios from 'axios';


function AI() {
    const [weather, setWeather] = useState('');
    const [location, setLocation] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [soilType, setSoilType] = useState('');
    const [currentCrops, setCurrentCrops] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleButtonClick = async () => {
        setIsLoading(true); // Start loading

        try {
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCn3A8z6z1jIQn-JWoEoXQkw0Mgm8GRojw",
                method: "post",
                data: {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": `Based on the following details, what crop should be produced? Weather: ${weather}, Location: ${location}, Current Time/Month: ${currentTime}, Soil Type: ${soilType}, Current Crops: ${currentCrops}.`
                                }
                            ]
                        }
                    ]
                }
            });

            setRecommendation(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error("Error fetching the recommendation", error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="ai-container">
            <h2>Crop Recommendation</h2>
            <input
                type="text"
                placeholder="Enter Weather"
                value={weather}
                onChange={(e) => handleInputChange(e, setWeather)}
                className="ai-input"
            />
            <input
                type="text"
                placeholder="Enter Location"
                value={location}
                onChange={(e) => handleInputChange(e, setLocation)}
                className="ai-input"
            />
            <input
                type="text"
                placeholder="Enter Current Time/Month"
                value={currentTime}
                onChange={(e) => handleInputChange(e, setCurrentTime)}
                className="ai-input"
            />
            <input
                type="text"
                placeholder="Enter Soil Type"
                value={soilType}
                onChange={(e) => handleInputChange(e, setSoilType)}
                className="ai-input"
            />
            <input
                type="text"
                placeholder="Enter Current Crops"
                value={currentCrops}
                onChange={(e) => handleInputChange(e, setCurrentCrops)}
                className="ai-input"
            />
            <button onClick={handleButtonClick} disabled={isLoading}>
                Get Recommendation
            </button>
            {isLoading ? (
                <div className="ai-loading">Loading...</div>
            ) : (
                <div className="ai-recommendation-box">
                    {recommendation.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AI;
