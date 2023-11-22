import React, { useState } from "react";

export const SignupPets = ({ close }) => {
  const [petData, setPetData] = useState({
    petName: "",
    breed: "",
    age: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({
      ...petData,
      [name]: value,
    });
  };

  const handleAddPet = () => {
    // Handle the logic to add the pet data, you can call an action or perform any necessary operations
    console.log("Pet added:", petData);
    // Close the pet form
    close();
  };

  return (
    <div>
      <h2>Add Pet</h2>
      <div className="mb-3">
        <label htmlFor="petName">Pet Name</label>
        <input
          type="text"
          id="petName"
          name="petName"
          value={petData.petName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="breed">Breed</label>
        <input
          type="text"
          id="breed"
          name="breed"
          value={petData.breed}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age">Age</label>
        <input
          type="text"
          id="age"
          name="age"
          value={petData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description">description</label>
        <textarea
          id="description"
          name="description"
          value={petData.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor=" detailed_care_info"> Detailed care info</label>
        <textarea
          id=" detailed_care_info"
          name=" detailed_care_info"
          value={petData. detailed_care_info}
          onChange={handleChange}
        />
      </div>
      <button type="button" onClick={handleAddPet} className="btn btn-primary">
        Add Pet
      </button>
    </div>
  );
};
