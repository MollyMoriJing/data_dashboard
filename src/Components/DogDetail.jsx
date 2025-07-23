import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./DogDetail.css";
import LoadingSpinner from "./LoadingSpinner";
import Sidebar from "./Sidebar";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

const DogDetail = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [dogObject, setDogObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dogID } = useParams();

  // Getting Access token
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const response = await axios.post("https://api.petfinder.com/v2/oauth2/token", {
          grant_type: "client_credentials",
          client_id: API_KEY,
          client_secret: SECRET_KEY,
        });

        const token = response.data.access_token;
        setAccessToken(token);
      } catch (error) {
        console.error("Error getting access token:", error);
        setError("Failed to authenticate with Petfinder API");
        setLoading(false);
      }
    };
    getAccessToken();
  }, []);

  useEffect(() => {
    const getAnimal = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get(`https://api.petfinder.com/v2/animals/${dogID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const singularDog = response.data.animal;

        const dogDetails = {
          imageUrl: singularDog.photos[0]?.medium || '/placeholder-dog.jpg',
          name: singularDog.name,
          breed: singularDog.breeds.primary,
          age: singularDog.age,
          gender: singularDog.gender,
          url: singularDog.url,
          id: singularDog.id,
          description: singularDog.description,
          status: singularDog.status,
          attributes: singularDog.attributes,
          contact: singularDog.contact,
          environment: singularDog.environment,
          tags: singularDog.tags || [],
          size: singularDog.size,
          coat: singularDog.coat,
          colors: singularDog.colors,
        };
        
        setDogObject(dogDetails);
      } catch (error) {
        console.error("Error getting individual dog data:", error);
        setError("Failed to load dog details");
      } finally {
        setLoading(false);
      }
    };

    getAnimal();
  }, [accessToken, dogID]);

  if (loading) {
    return (
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <div className="error-container">
            <h2>😔 Oops! Something went wrong</h2>
            <p>{error}</p>
            <Link to="/" className="back-home-btn">
              Go Back Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!dogObject) {
    return (
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <div className="error-container">
            <h2>🐕 Dog not found</h2>
            <p>The dog you're looking for doesn't exist or has been adopted.</p>
            <Link to="/" className="back-home-btn">
              Go Back Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar />
      
      <main className="main-content">
        <div className="dog-detail-page">
          <div className="container">
            <Link to="/" className="back-btn">
              ← Back to Dashboard
            </Link>
            
            <div className="dog-detail-content">
              <div className="dog-image-section">
                <img 
                  className="dog-detail-image" 
                  src={dogObject.imageUrl} 
                  alt={dogObject.name} 
                />
                <div className="status-badge">
                  {dogObject.status.toLowerCase().charAt(0).toUpperCase() + dogObject.status.toLowerCase().slice(1)}
                </div>
              </div>

              <div className="dog-info-section">
                <h1 className="dog-name">{dogObject.name}</h1>
                
                <div className="basic-info">
                  <div className="info-item">
                    <span className="info-label">🎂 Age:</span>
                    <span className="info-value">{dogObject.age || "Unknown"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🐕 Breed:</span>
                    <span className="info-value">{dogObject.breed || "Unknown"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">{dogObject.gender === 'Male' ? '♂️' : '♀️'} Gender:</span>
                    <span className="info-value">{dogObject.gender || "Unknown"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">📏 Size:</span>
                    <span className="info-value">{dogObject.size || "Unknown"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🎨 Color:</span>
                    <span className="info-value">{dogObject.colors.primary || "Unknown"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">🧥 Coat:</span>
                    <span className="info-value">{dogObject.coat || "Unknown"}</span>
                  </div>
                </div>

                {dogObject.description && (
                  <div className="description-section">
                    <h3>📝 About {dogObject.name}</h3>
                    <p className="description-text">{dogObject.description}</p>
                  </div>
                )}

                <div className="attributes-section">
                  <h3>✨ Special Qualities</h3>
                  <div className="attributes-grid">
                    {dogObject.attributes.spayed_neutered && (
                      <div className="attribute-item">✅ Spayed/Neutered</div>
                    )}
                    {dogObject.attributes.house_trained && (
                      <div className="attribute-item">🏠 House Trained</div>
                    )}
                    {dogObject.attributes.shots_current && (
                      <div className="attribute-item">💉 Shots Current</div>
                    )}
                    {dogObject.environment.children && (
                      <div className="attribute-item">👶 Good with Kids</div>
                    )}
                    {dogObject.environment.dogs && (
                      <div className="attribute-item">🐕 Good with Dogs</div>
                    )}
                    {dogObject.environment.cats && (
                      <div className="attribute-item">🐱 Good with Cats</div>
                    )}
                    {dogObject.attributes.special_needs && (
                      <div className="attribute-item">💙 Special Needs</div>
                    )}
                  </div>
                </div>

                {dogObject.tags.length > 0 && (
                  <div className="tags-section">
                    <h3>🏷️ Fun Facts</h3>
                    <div className="tags-container">
                      {dogObject.tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="contact-section">
                  <h3>💌 Interested in {dogObject.name}?</h3>
                  <div className="contact-info">
                    {dogObject.contact.phone && (
                      <div className="contact-item">
                        <span className="contact-label">📞 Phone:</span>
                        <span className="contact-value">{dogObject.contact.phone}</span>
                      </div>
                    )}
                    {dogObject.contact.email && (
                      <div className="contact-item">
                        <span className="contact-label">✉️ Email:</span>
                        <span className="contact-value">{dogObject.contact.email}</span>
                      </div>
                    )}
                    <div className="contact-item">
                      <span className="contact-label">📍 Address:</span>
                      <span className="contact-value">
                        {dogObject.contact.address.address1}
                        {dogObject.contact.address.address1 && ", "}
                        {dogObject.contact.address.city}
                        {dogObject.contact.address.state && `, ${dogObject.contact.address.state}`}
                        {" "}{dogObject.contact.address.postcode}
                        {" "}{dogObject.contact.address.country}
                      </span>
                    </div>
                  </div>
                  
                  <a 
                    href={dogObject.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="adopt-btn"
                  >
                    🐾 Adopt {dogObject.name} on Petfinder
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DogDetail;