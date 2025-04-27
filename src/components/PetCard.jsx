import {useState} from 'react';


const PetCard = ({ pet, addRecord, isPreview }) => {
  const [recordText, setRecordText] = useState("");

  const getFallbackImage = (type) => {
    const lower = type.toLowerCase();
    if (lower.includes("dog")) return "https://images.dog.ceo/breeds/labrador/n02099712_5642.jpg"; // real hosted image
    if (lower.includes("cat")) return "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg"; // real cat photo from TheCatAPI
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg"; // general pet
  };
  

  const handleAddRecord = () => {
    if (recordText.trim()) {
      addRecord(pet.id, recordText.trim());
      setRecordText("");
    }
  };

  const imageUrl = pet.image || getFallbackImage(pet.type);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <img
        src={imageUrl}
        alt={pet.name}
        className="w-[700px] h-auto max-h-64 object-contain rounded mb-2 bg-white justify-content-center"
      />
      <h2 className="text-xl font-bold mb-1">{pet.name}</h2>
      <p className="text-gray-600 mb-3">Type: {pet.type}</p>

      {!isPreview && (
        <>
          <input
            className="input"
            placeholder="Add vaccination, vet visit or medication"
            value={recordText}
            onChange={(e) => setRecordText(e.target.value)}
          />
          <button
            onClick={handleAddRecord}
            className="bg-green-600 text-white mt-2 px-3 py-1 rounded hover:bg-green-700"
          >
            Add Record
          </button>
        </>
      )}

      <ul className="list-disc mt-3 pl-5 text-sm text-gray-700">
        {pet.records.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default PetCard;

