import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import { PetForm } from "../component/PetForm.js"

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
  const [pets, setPets] = useState([]);
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
  const [showSubmissionModal, setShowSubmissionModal] = useState(false); // New state for submission modal
  const [submissionModalMessage, setSubmissionModalMessage] = useState(""); // New state for submission modal message
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

    const resp = await actions.updateAccount(userData, pets);
    if (resp.success) {
      setSubmissionModalMessage("Update successful!");
      setShowSubmissionModal(true);
    } else {
      setSubmissionModalMessage("Update unsuccessful. Please try again.");
      setShowSubmissionModal(true);
    }
  };

  // try {
  //   const resp = await actions.updateAccount(userData, pets);
  //   console.log(resp);
  //   setModalMessage("Update successful!");
  //   setShowModal(true);
  // } catch (error) {
  //   setModalMessage("Update unsuccessful. Please try again.");
  //   setShowModal(true);
  // }


  // const handlePetPictureChange = (e) => {
  //   const file = e.target.files[0];
  //   setPetFormData({
  //     ...petFormData,
  //     pet_picture: file,
  //   });
  // };

  const addPet = () => {
    setPets([...pets, petFormData]);
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

  const handlePetChange = (e) => {
    const { name, value } = e.target;
    setPetFormData({
      ...petFormData,
      [name]: value,
    });
  };

  const updatePetByIdx = (pet, idx) => {
    setPets(pets.toSpliced(idx, 1, pet));
  }

  const handleEditPet = () => {
    if (editPetIndex !== null) {
      const updatedPets = [...pets];
      updatedPets[editPetIndex] = {
        pet_name: petFormData.pet_name,
        breed: petFormData.breed,
        age: petFormData.age,
        description: petFormData.description,
        detailed_care_info: petFormData.detailed_care_info,
        pet_picture: petFormData.pet_picture,
      };
      setPets(updatedPets);
    }
    closeEditModal();
  };

  const deletePet = (index) => {
    const updatedPets = [...pets];
    updatedPets.splice(index, 1);
    setPets(updatedPets);
  };


  return (
    <div>
      {store.token ? ( // Check if the user has a token
        <div className="account_form">
          <h2>Client information</h2>
          <div className="form-group">
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
            {/* ... (other user information inputs) */}
          </div>



          {submissionModalMessage && (
            <div>
              {submissionModalMessage}
            </div>
          )}


          <div className="pet_form">
            <h2>Pet information</h2>
            {pets.map((pet, idx) => <PetForm petFormData={pet} idx={idx} key={idx} handlePetChange={updatePetByIdx} />)}
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

