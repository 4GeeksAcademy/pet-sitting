import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { PetForm } from "../component/PetForm.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';


export const Account = () => {
  const { store, actions } = useContext(Context);

  const [userData, setUserData] = useState({
    phone_number: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  // Pet States
  const [pets, setPets] = useState([]);
  const [petFormData, setPetFormData] = useState({
    pet_name: "",
    breed: "",
    age: "",
    description: "",
    detailed_care_info: "",
    pet_picture: null
  });

  const [editPetModalOpen, setEditPetModalOpen] = useState(false);
  const [editPetIndex, setEditPetIndex] = useState(null);


  const [submissionModalMessage, setSubmissionModalMessage] = useState(""); // New state for submission modal message
  const navigate = useNavigate();

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    console.log(pets)
    const resp = await actions.updateAccount(userData, pets);
    if (resp.success) {
      setSubmissionModalMessage("Update successful!");
      setShowSubmissionModal(true);
    } else {
      setSubmissionModalMessage("Update unsuccessful. Please try again.");
      setShowSubmissionModal(true);
    }
  };

  const addPet = () => {
    setPets([...pets, petFormData]);
    setPetFormData({
      pet_name: "",
      breed: "",
      age: "",
      description: "",
      detailed_care_info: "",
      pet_picture: null
    });
  };

  const openEditPetModal = (index) => {
    setPetFormData(pets[index]);
    setEditPetIndex(index);
    setEditPetModalOpen(true);
  };

  const closeEditPetModal = () => {
    setPetFormData({
      pet_name: "",
      breed: "",
      age: "",
      description: "",
      detailed_care_info: "",
      pet_picture: null
    });
    setEditPetIndex(null);
    setEditPetModalOpen(false);
  };

  const handlePetChange = (petData, idx) => {
    const { name, value } = e.target;
    setPetFormData({
      ...petFormData,
      [name]: value
    });
  };

  const updatePetByIdx = (pet, idx) => {
    setPets(pets.splice(idx, 1, pet));
  };

  const handleEditPet = () => {
    if (editPetIndex !== null) {
      const updatedPets = [...pets];
      updatedPets[editPetIndex] = petFormData;
      setPets(updatedPets);
    }
    closeEditPetModal();
  };

  const handleDeletePet = (index) => {
    const updatedPets = [...pets];
    updatedPets.splice(index, 1);
    // setPets(updatedPets);
  };

  useEffect(() => {
    console.log(pets)
  }, [pets])

  return (
    <div>
      {store.token ? (
        <div className="account_form">
          <h2>Client information</h2>
          <div className="form-group">
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
              <label htmlFor="zip">Zip *</label>
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

          {submissionModalMessage && (
            <div>
              {submissionModalMessage}
            </div>
          )}

          <div className="pet_form">
            <h2>Pet information</h2>
            {pets.map((pet, idx) => (
              <div key={idx}>
                <PetForm petFormData={pet} idx={idx} handlePetChange={updatePetByIdx} />
                <button type="button" onClick={() => openEditPetModal(idx)}>
                  <FontAwesomeIcon icon={faPenToSquare} /> Edit Pet
                </button>



                <button type="button" onClick={() => handleDeletePet(idx)}>
                  <FontAwesomeIcon icon={faTrashCan} /> Delete Pet
                </button>
              </div>
            ))}
            {/* Edit pet modal */}
            {editPetModalOpen && (
              <div>
                <h2>Edit Pet</h2>
                {/* Your form for editing pet details */}
                <PetForm petFormData={petFormData} handlePetChange={handlePetChange} />
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
