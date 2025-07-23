import React from "react";
import { Link } from "react-router-dom";
import "./PetCard.css";

const PetCard = ({ imageUrl, name, breed, gender, age, city, size, id, url }) => {
  const handlePetfinderLink = (e) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img src={imageUrl} alt={`Picture of ${name}`} className="pet-card-image" />
        <div className="pet-card-overlay">
          <Link to={`/dog/${id}`} className="pet-card-link">
            <button className="pet-card-button primary">
              View Details
            </button>
          </Link>
          <button 
            className="pet-card-button secondary" 
            onClick={handlePetfinderLink}
          >
            Adopt on Petfinder
          </button>
        </div>
      </div>
      
      <div className="pet-card-content">
        <Link to={`/dog/${id}`} className="pet-card-name-link">
          <h3 className="pet-card-name">{name}</h3>
        </Link>
        
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