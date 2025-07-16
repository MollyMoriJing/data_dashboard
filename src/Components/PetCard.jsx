import React from "react";
import "./PetCard.css";

const PetCard = ({ imageUrl, name, breed, gender, age, city, size, id, url }) => {
  const handleLearnMore = () => {
    // Option 1: Open the Petfinder URL in a new tab
    window.open(url, '_blank');
    
    // Option 2: If you want to show more details in a modal or expandable section
    // You could add a callback prop here like: onLearnMore(id)
  };

  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img src={imageUrl} alt={`Picture of ${name}`} className="pet-card-image" />
        <div className="pet-card-overlay">
          <button className="pet-card-button" onClick={handleLearnMore}>
            Learn More
          </button>
        </div>
      </div>
      
      <div className="pet-card-content">
        <h3 className="pet-card-name">{name}</h3>
        
        <div className="pet-card-details">
          <div className="pet-card-detail">
            <span className="detail-icon">🐕</span>
            <span className="detail-text">{breed}</span>
          </div>
          
          <div className="pet-card-detail">
            <span className="detail-icon">{gender === 'Male' ? '♂️' : '♀️'}</span>
            <span className="detail-text">{gender}</span>
          </div>
          
          <div className="pet-card-detail">
            <span className="detail-icon">🎂</span>
            <span className="detail-text">{age || 'Unknown'}</span>
          </div>
          
          <div className="pet-card-detail">
            <span className="detail-icon">📏</span>
            <span className="detail-text">{size || 'Unknown'}</span>
          </div>
          
          <div className="pet-card-detail">
            <span className="detail-icon">📍</span>
            <span className="detail-text">{city || 'Unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;