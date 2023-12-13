import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { PetForm } from "../component/PetForm.js";

export const Account = () => {
  const { store, actions } = useContext(Context);

  // State for user data
  const [userData, setUserData] = useState({
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  // State for pets
  const [pets, setPets] = useState({
    name: "",
    breed: "",
    age: "",
    description: "",
    detailed_care_info: "",
    pet_picture: null
  });

  // State for modal
  const [editPetModalOpen, setEditPetModalOpen] = useState(false);

  // State for tracking the index of the pet being edited
  const [editPetIndex, setEditPetIndex] = useState(null);

  // State for submission modal message
  const [submissionModalMessage, setSubmissionModalMessage] = useState("");

  // Handle user data change
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      console.log(pets)
      const respUser = await actions.updateAccount(userData);
      const respPet = await actions.updatePet(pets);
      if (respUser.success && respPet.success
      ) {

      } else {

      }
    } catch (error) {
      console.error("Error updating account:", error);

    }
  };

  // Handle pet data change
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPets((prevPets) => ({
      ...prevPets,
      [name]: value
    }));
  };

  // Handle adding a new pet
  const addPet = () => {
    setPets({
      name: "",
      breed: "",
      age: "",
      description: "",
      detailed_care_info: "",
      pet_picture: null
    });
  };

  // Handle opening the edit pet modal
  const openEditPetModal = (index) => {
    setPets({ ...pets[index] });
    setEditPetIndex(index);
    setEditPetModalOpen(true);
  };

  // Handle closing the edit pet modal
  const closeEditPetModal = () => {
    setPets({
      name: "",
      breed: "",
      age: "",
      description: "",
      detailed_care_info: "",
      pet_picture: null
    });
    setEditPetIndex(null);
    setEditPetModalOpen(false);
  };

  // Handle updating the pet at a specific index
  const updatePetByIdx = (pet, idx) => {
    setPets((prevPets) => ({
      ...prevPets,
      [idx]: pet
    }));
  };

  // Handle editing a pet
  const handleEditPet = () => {
    if (editPetIndex !== null) {
      setPets((prevPets) => ({
        ...prevPets,
        [editPetIndex]: pets
      }));
    }
    closeEditPetModal();
  };

  // Handle deleting a pet
  const handleDeletePet = (index) => {
    const { [index]: deletedPet, ...remainingPets } = pets;
    setPets(remainingPets);
  };

  return (
    <div>
      {store.token ? (
        <div className="account_form">
          <h2>Client information</h2>
          {/* ... (user data form fields) */}

          <div className="form-group">
            <div>
              <label htmlFor="fisrt_name">First Name *</label>
              <input
                type="text"
                id="first_name"
                name="fisrt_name"
                value={userData.first_name}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <input
                type="text"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name *</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userData.last_name}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={userData.address}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={userData.city}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={userData.state}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="zip">Zip Code *</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={userData.zip}
                onChange={handleUserChange}
              />
            </div>
            <div>
              <label htmlFor="phone_number">Phone number *</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleUserChange}
              />
            </div>
          </div>
          <div className="pet_form">
            <h2>Pet information</h2>
            {Object.keys(pets).map((petKey) => (
              <div key={petKey}>
                <PetForm petFormData={pets[petKey]} idx={petKey} handlePetChange={updatePetByIdx} />
                <button type="button" onClick={() => openEditPetModal(petKey)}>
                  Edit Pet
                </button>
                <button type="button" onClick={() => handleDeletePet(petKey)}>
                  Delete Pet
                </button>
              </div>
            ))}
            {/* Edit pet modal */}
            {editPetModalOpen && (
              <div>
                <h2>Edit Pet</h2>
                <PetForm petFormData={pets} handlePetChange={handlePetChange} />
                <button type="button" onClick={handleEditPet}>
                  Save Changes
                </button>
                <button type="button" onClick={closeEditPetModal}>
                  Cancel
                </button>
              </div>
            )}
            <button type="button" onClick={addPet}>
              Add Pet
            </button>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>You are not authorized to view this page. Please log in.</p>
        </div>
      )}
    </div>
  );
};
