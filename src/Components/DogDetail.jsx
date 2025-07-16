import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./DogDetail.css";
const API_KEY = import.meta.env.VITE_APP_API_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;

const DogDetail = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [dogObject, setDogObject] = useState(null);
  const { dogID } = useParams();
  console.log("WE HAVE ENTERED");

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
        console.log("Access Token:", token);
        setAccessToken(token);
      } catch (error) {
        console.error("Error getting access token:", error);
      }
    };
    getAccessToken();
  }, []);
  console.log("Hello id: ", dogID);
  useEffect(() => {
    const getAnimal = async () => {
      try {
        const response = await axios.get(`https://api.petfinder.com/v2/animals/${dogID}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("REPONSE: ", response);
        const singularDog = response.data.animal; // Use "animal" instead of "animals" for a single animal

        // Create an object for the single dog with desired attributes
        const dogDetails = {
          imageUrl: singularDog.photos[0].medium,
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
          tags: singularDog.tags,
          size: singularDog.size,
          coat: singularDog.coat,
          colors: singularDog.colors,
        };
        setDogObject(dogDetails);
        console.log("Individual dog:", dogDetails);
      } catch (error) {
        console.error("Error getting individual dog data:", error);
      }
    };

    getAnimal();
  }, [accessToken, dogID]);

  return (
    <div>
      {dogObject ? (
        <>
          <div className="App-page">
            <div className="App-row">
              <div className="Details">
                <div>
                  <h2 className="Dog-Name">{dogObject.name}</h2>
                  <img className="Dog-Img" src={dogObject.imageUrl} alt={dogObject.name} />
                  <h2 className="Dog-Status">
                    {dogObject.status.toLowerCase().charAt(0).toUpperCase() + dogObject.status.toLowerCase().slice(1)}
                  </h2>
                  <div className="Main-Attributes">
                    <h3>Age: {dogObject.age || "Unknown"}</h3>
                    <h3>Breed: {dogObject.breed || "Unknown"}</h3>
                    <h3>Gender: {dogObject.gender || "Unknown"}</h3>
                  </div>
                  <div className="Extra-Attributes">
                    <h3>Size: {dogObject.size || "Unknown"}</h3>
                    <h3>Coat Color: {dogObject.colors.primary || "Unknown"}</h3>
                    <h3>Coat: {dogObject.coat || "Unknown"}</h3>
                  </div>
                  <div className="More-Attributes">
                    <h2>More Information:</h2>
                    {dogObject.attributes.spayed_neutered && <p>This dog is spayed/neutered.</p>}
                    {dogObject.attributes.house_trained && <p>This dog is house-trained.</p>}
                    {dogObject.attributes.declawed && <p>This dog is declawed.</p>}
                    {dogObject.attributes.special_needs && <p>This dog has special needs.</p>}
                    {dogObject.attributes.shots_current && <p>This dog's shots are current.</p>}
                    {dogObject.environment.children && <p>Great with kids.</p>}
                    {dogObject.attributes.dogs && <p>Great with other dogs.</p>}
                    {dogObject.attributes.cats && <p>Great with cats.</p>}
                    <div className="Dog-Tags">
                      {dogObject.tags.length > 0 && <h2 className="Tags">Fun Facts: </h2>}
                      {dogObject.tags.length > 0 && <p>{dogObject.tags.join(", ")}</p>}
                    </div>
                  </div>
                  <div className="Contact-Info">
                    <h2>Interested:</h2>
                    {dogObject.contact.phone && <h3>Phone: {dogObject.contact.phone}</h3>}
                    {dogObject.contact.email && <h3>Email: {dogObject.contact.email}</h3>}
                    <h3>
                      Address: {dogObject.contact.address.address1}
                      {dogObject.contact.address.address1 && ","} {dogObject.contact.address.city}
                      {dogObject.contact.address.state && `, ${dogObject.contact.address.state}`} {dogObject.contact.address.postcode}{" "}
                      {dogObject.contact.address.country}
                    </h3>

                    <div className="Learn-More">
                      <h3>
                        <a className="Learn-More-Button" href={dogObject.url} target="_blank">
                          Learn More
                        </a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default DogDetail;