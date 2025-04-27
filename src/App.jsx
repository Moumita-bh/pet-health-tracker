import { useEffect, useState } from "react";
import PetForm from "./components/PetForm";
import PetCard from "./components/PetCard";

function App() {
  const [pets, setPets] = useState([]);
  const [currentPet, setCurrentPet] = useState({ name: "", type: "", image: "" });

  // Fetch image when pet type is "dog" or "cat" AND name is provided
  useEffect(() => {
    const fetchImage = async () => {
      const type = currentPet.type.toLowerCase();
      if (type === "dog") {
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        setCurrentPet(prev => ({ ...prev, image: data.message }));
      } else if (type === "cat") {
        const res = await fetch("https://api.thecatapi.com/v1/images/search");
        const data = await res.json();
        setCurrentPet(prev => ({ ...prev, image: data[0].url }));
      } else {
        setCurrentPet(prev => ({ ...prev, image: "" })); // clear image if not dog/cat
      }
    };

    // Fetch only if name and type are filled
    if (currentPet.name.trim() && currentPet.type.trim()) {
      fetchImage();
    }
  }, [currentPet.type, currentPet.name]);

  const addPet = () => {
    if (!currentPet.name || !currentPet.type) return;
    const newPet = {
      ...currentPet,
      id: Date.now(),
      records: [],
    };
    setPets([...pets, newPet]);
    setCurrentPet({ name: "", type: "", image: "" });
  };

  const addRecord = (petId, record) => {
    setPets(pets.map(pet =>
      pet.id === petId
        ? { ...pet, records: [...pet.records, record] }
        : pet
    ));
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">🐾 Pet Health Tracker</h1>

      <PetForm currentPet={currentPet} setCurrentPet={setCurrentPet} addPet={addPet} />

      {currentPet.name && currentPet.type && currentPet.image && (
        <div className="max-w-md mx-auto mt-6">
          <h2 className="text-xl font-semibold mb-2 text-center">Live Preview</h2>
          <PetCard pet={{ ...currentPet, records: [] }} addRecord={() => {}} isPreview />
        </div>
      )}

      {pets.length > 0 && (
  <div
    className={`mt-6 ${
      pets.length === 1
        ? "flex justify-center"
        : "grid md:grid-cols-2 lg:grid-cols-3 gap-4 "
    }`}
  >
    {pets.map(pet => (
      <PetCard key={pet.id} pet={pet} addRecord={addRecord} />
    ))}
  </div>
)}

    </div>
  );
}

export default App;

