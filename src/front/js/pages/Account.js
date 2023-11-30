import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Account = () => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  // Pet States
  const [pet, setPet] = useState([]);
  const [petFormData, setPetFormData] = useState({
    pet_name: "",
    breed: "",
    age: "",
    description: "",
    detailed_care_info: "",
    pet_picture: null,
  });

  const [editPetIndex, setEditPetIndex] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await actions.account(userData,petFormData);
      setModalMessage("Update successful!");
      setShowModal(true);
    } catch (error) {
      setModalMessage("Update unsuccessful. Please try again.");
      setShowModal(true);
    }
  };

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetFormData({
      ...petFormData,
      [name]: value,
    });
  };

  const handlePetPictureChange = (e) => {
    const file = e.target.files[0];
    setPetFormData({
      ...petFormData,
      pet_picture: file,
    });
  };

  const addPet = () => {
    setPet([...pet, petFormData]);
    setPetFormData({
      pet_name: "",
      breed: "",
      age: "",
      description: "",
      detailed_care_info: "",
      pet_picture: null,
    });
  };

  const openEditModal = (index) => {
    setEditPetIndex(index);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditPetIndex(null);
    setEditModalOpen(false);
  };

  const handleEditPet = () => {
    if (editPetIndex !== null) {
      const updatedPets = [...pet];
      updatedPets[editPetIndex] = {
        pet_name: petFormData.pet_name,
        breed: petFormData.breed,
        age: petFormData.age,
        description: petFormData.description,
        detailed_care_info: petFormData.detailed_care_info,
        pet_picture: petFormData.pet_picture,
      };
      setPet(updatedPets);
    }
    closeEditModal();
  };

  const deletePet = (index) => {
    const updatedPets = [...pet];
    updatedPets.splice(index, 1);
    setPet(updatedPets);
  };

  return (
    <div>
      <div className="account_form">
        <h2>Client information</h2>
        <div class="form-group">
          <div>
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="phone_number">Phone Number</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              value={userData.phone_number}
              onChange={handleUserChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userData.address}
              onChange={handleUserChange}
            />
          </div>
          {/* ... (other user information inputs) */}
        </div>

        {/* Pet Section */}
        <div className="pet_form">
          <h2>Pet information</h2>
          {pet.map((pet, index) => (
            <div key={index}>
              <p>{pet.pet_name}</p>
              <button type="button" onClick={() => openEditModal(index)}>
                Edit
              </button>
              <button type="button" onClick={() => deletePet(index)}>
                Delete
              </button>
            </div>
          ))}
          <div>
            <label htmlFor="pet_name">Pet Name</label>
            <input
              type="text"
              id="pet_name"
              name="pet_name"
              value={petFormData.pet_name}
              onChange={handlePetChange}
            />
          </div>
          <div>
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={petFormData.breed}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={petFormData.age}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={petFormData.description}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="detailed_care_info">Detailed care information</label>
              <input
                type="text"
                id="detailed_care_info"
                name="detailed_care_info"
                value={petFormData.detailed_care_info}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="pet_picture">Pet Picture</label>
              <input
                type="file"
                id="pet_picture"
                name="pet_picture"
                onChange={handlePetPictureChange}
              />
            </div>
          <button type="button" onClick={addPet}>
            Add Pet
          </button>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
          {/* Modal for success/failure */}
          {showModal && (
            <div className="modal">
              <p>You have successfully updated account</p>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/services"); // Navigate to "/services" after closing modal
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="edit-modal">
          <h2>Edit Pet</h2>
          <button type="button" onClick={handleEditPet}>
            Save Changes
          </button>
          <button type="button" onClick={closeEditModal}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};






{/* <div>
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={petFormData.breed}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="age">Age</label>
              <input
                type="text"
                id="age"
                name="age"
                value={petFormData.age}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={petFormData.description}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="detailed_care_info">Detailed care information</label>
              <input
                type="text"
                id="detailed_care_info"
                name="detailed_care_info"
                value={petFormData.detailed_care_info}
                onChange={handlePetChange}
              />
            </div>
            <div>
              <label htmlFor="pet_picture">Pet Picture</label>
              <input
                type="file"
                id="pet_picture"
                name="pet_picture"
                onChange={handlePetPictureChange}
              />
            </div> */}