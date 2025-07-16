import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import PetCard from "./Components/PetCard";
import DogChart from "./Components/DogChart";
import StatCard from "./Components/StatCard";
import SearchFilter from "./Components/SearchFilter";
import LoadingSpinner from "./Components/LoadingSpinner";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const SECRET_KEY = import.meta.env.VITE_APP_SECRET_KEY;
const API_URL = "https://api.petfinder.com/v2/animals";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modeAge, setModeAge] = useState(null);
  const [mostCommonBreed, setMostCommonBreed] = useState(null);
  const [ageCategoryCounts, setAgeCategoryCounts] = useState({});
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [pageNumber, setPageNumber] = useState(Math.floor(Math.random() * 680) + 1);
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef(null);

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
        setLoading(false);
      }
    };
    getAccessToken();
  }, []);

  // Get Dog information
  useEffect(() => {
    const getAnimals = async () => {
      if (!accessToken) return;
      
      setLoading(true);
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            type: "dog",
            page: pageNumber,
            limit: 100,
            gender: selectedGender,
          },
        });

        const animalList = response.data.animals;

        const processedAnimals = animalList
          .filter((animal) => {
            const nameIsValid = /^[A-Za-z\s]+$/.test(animal.name);
            return nameIsValid && animal.photos.length > 0;
          })
          .map((animal) => ({
            imageUrl: animal.photos[0].medium,
            name: animal.name,
            breed: animal.breeds.primary,
            age: animal.age,
            gender: animal.gender,
            url: animal.url,
            id: animal.id,
            city: animal.contact.address.city,
            size: animal.size,
          }));

        // Remove duplicates based on name, breed, age, and gender
        const uniqueAnimals = processedAnimals.reduce((acc, current) => {
          const x = acc.find(
            (item) =>
              item.name === current.name && 
              item.breed === current.breed && 
              item.age === current.age && 
              item.gender === current.gender
          );
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);

        setAnimals(uniqueAnimals);

        const ageCounts = {};
        uniqueAnimals.forEach((animal) => {
          const ageCategory = animal.age;
          ageCounts[ageCategory] = (ageCounts[ageCategory] || 0) + 1;
        });

        let mode = null;
        let maxCount = 0;

        for (const ageCategory in ageCounts) {
          if (ageCounts[ageCategory] > maxCount) {
            maxCount = ageCounts[ageCategory];
            mode = ageCategory;
          }
        }

        setModeAge(mode);
        setAgeCategoryCounts(ageCounts);

        // Calculate the most common breed
        const breedCounts = {};
        uniqueAnimals.forEach((animal) => {
          const breed = animal.breed;
          breedCounts[breed] = (breedCounts[breed] || 0) + 1;
        });

        let mostCommonBreed = null;
        let breedMaxCount = 0;

        for (const breed in breedCounts) {
          if (breedCounts[breed] > breedMaxCount) {
            breedMaxCount = breedCounts[breed];
            mostCommonBreed = breed;
          }
        }

        setMostCommonBreed(mostCommonBreed);
        console.log("Dog Data:", uniqueAnimals);
      } catch (error) {
        console.error("Error getting animal data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAnimals();
  }, [accessToken, selectedGender, pageNumber]);

  const nextDogPage = () => {
    const randomNum = Math.floor(Math.random() * 680) + 1;
    setPageNumber(randomNum);
  };

  // Function to filter animals based on search input and filters
  const filterAnimals = (animals, searchInput, selectedAge, selectedSize) => {
    return animals.filter((animal) => {
      // Search filter (city or breed)
      const matchesSearch = searchInput === "" || 
        animal.city.toLowerCase().includes(searchInput.toLowerCase()) ||
        animal.breed.toLowerCase().includes(searchInput.toLowerCase());
      
      // Age filter
      const matchesAge = selectedAge === null || animal.age === selectedAge;
      
      // Size filter
      const matchesSize = selectedSize === null || animal.size === selectedSize;
      
      return matchesSearch && matchesAge && matchesSize;
    });
  };
  
  const filteredAnimals = filterAnimals(animals, searchInput, selectedAge, selectedSize);

  const handleButtonClick = () => {
    setIsAnimating(true);
    nextDogPage();

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  if (loading && !accessToken) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1 className="app-title">🐕 Pawsome Adoption Hub</h1>
          <p className="app-subtitle">Find your perfect furry companion</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Statistics Dashboard */}
          <section className="stats-section">
            <h2 className="section-title">Dashboard Overview</h2>
            <div className="stats-grid">
              <StatCard
                title="Most Common Age Group"
                value={modeAge || "Loading..."}
                icon="🎂"
              />
              <StatCard
                title="Most Popular Breed"
                value={mostCommonBreed || "Loading..."}
                icon="🏆"
              />
              <StatCard
                title="Adoption Ready Dogs"
                value={filteredAnimals.length}
                icon="🐾"
              />
            </div>
          </section>

          {/* Chart Section */}
          <section className="chart-section" style={{ display: 'none' }}>
            <h2 className="section-title">Age Distribution</h2>
            <div className="chart-container">
              <DogChart data={filteredAnimals} />
            </div>
          </section>

          {/* Filters Section */}
          <section className="filters-section">
            <div className="filters-container">
              <SearchFilter
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                selectedAge={selectedAge}
                setSelectedAge={setSelectedAge}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                onMoreDogs={handleButtonClick}
                isAnimating={isAnimating}
              />
            </div>
          </section>

          {/* Dogs Grid */}
          <section className="dogs-section">
            <h2 className="section-title">
              Available Dogs ({filteredAnimals.length})
            </h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className="dogs-grid">
                {filteredAnimals.map((dog, index) => (
                  <PetCard
                    key={`${dog.id}-${index}`}
                    imageUrl={dog.imageUrl}
                    name={dog.name}
                    breed={dog.breed}
                    age={dog.age}
                    gender={dog.gender}
                    city={dog.city}
                    size={dog.size}
                    url={dog.url}
                    id={dog.id}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Pawsome Adoption Hub. Made with ❤️ for our furry friends.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;