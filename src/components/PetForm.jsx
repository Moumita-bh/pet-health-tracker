
// components/PetForm.jsx
const PetForm = ({ currentPet, setCurrentPet, addPet }) => {
  return (
    <div className="bg-white p-4 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Add New Pet</h2>
      <input
        type="text"
        placeholder="Pet Name"
        className="border p-2 w-full mb-2"
        value={currentPet.name}
        onChange={(e) => setCurrentPet(prev => ({ ...prev, name: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Pet Type (e.g., dog or cat)"
        className="border p-2 w-full mb-2"
        value={currentPet.type}
        onChange={(e) => setCurrentPet(prev => ({ ...prev, type: e.target.value }))}
      />
      <button
        onClick={addPet}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Pet
      </button>
    </div>
  );
};

export default PetForm;
