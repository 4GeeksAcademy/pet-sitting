// import React, { useState, useEffect } from "react"



// const PetForm = ({pets,setPets}) => {

//     const [petData, setPetData] = useState({ pet_name: "", breed: "", age: 0, description: "", detailed_care_info: "" })
//     const addPet = () => {
//         setPets([...pets, petData]);
//         setPetData({
//           pet_name: "",
//           breed: "",
//           age: 0,
//           description: "",
//           detailed_care_info: "",
//         });
//       };


//       const handlePetChange = (e) => {
//         const { name, value } = e.target;
//         setPetData({
//           ...petData,  // Fix the typo here
//           [name]: value,
//         });
//       };
//       };
//     return (
//         <div className="modal fade" id="addPetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//                         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div className="modal-body">
//                         <div>
//                             <label htmlFor="pet_name">Pet Name *</label>
//                             <input
//                                 type="text"
//                                 id="pet_name"
//                                 name="pet_name"
//                                 value={petData.pet_name}
//                                 onChange={(e) => setPetData({ pet_name: e.target.value })}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="breed">Breed *</label>
//                             <input
//                                 type="text"
//                                 id="breed"
//                                 name="breed"
//                                 value={petData.breed}
//                                 onChange={(e) => setPetData({  breed: e.target.value })}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="age">Age *</label>
//                             <input
//                                 type="text"
//                                 id="age"
//                                 name="age"
//                                 value={petData.age}
//                                 onChange={(e) => setPetData({ age: parseInt(e.target.value) })}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="description">Description</label>
//                             <input
//                                 type="text"
//                                 id="description"
//                                 name="description"
//                                 value={petData.description}
//                                 onChange={(e) => setPetData({ description: e.target.value })}
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="detailed_care_info">Detailed care info *</label>
//                             <input
//                                 type="text"
//                                 id="detailed_care_info"
//                                 name="detailed_care_info"
//                                 value={petData.detailed_care_info}
//                                 onChange={(e) => setPetData({  detailed_care_info: e.target.value })}
//                             />
//                         </div>
//                     </div>
//                     <div className="modal-footer">
//                         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                         <button type="button" className="btn btn-primary"onClick={()=>addPet()}>Save changes</button>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// };

// export default PetForm ;


import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const PetForm = ({ pets, setPets, editPetIndex, setEditModalOpen }) => {
    const [petData, setPetData] = useState({
      pet_name: "",
      breed: "",
      age: 0,
      description: "",
      detailed_care_info: "",
    });
  
    const addPet = () => {
      setPets([...pets, petData]);
      setPetData({
        pet_name: "",
        breed: "",
        age: 0,
        description: "",
        detailed_care_info: "",
      });
    };
  
    const handlePetChange = (e) => {
      const { name, value } = e.target;
      setPetData({
        ...petData,
        [name]: value,
      });
    };
  
    return (
      <div className="modal fade" id="addPetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add/Edit Pet</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* Input fields for pet information */}
              <div>
                <label htmlFor="pet_name">Pet Name *</label>
                <input
                  type="text"
                  id="pet_name"
                  name="pet_name"
                  value={petData.pet_name}
                  onChange={handlePetChange}
                />
              </div>
              <div>
                <label htmlFor="breed">Breed *</label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  value={petData.breed}
                  onChange={handlePetChange}
                />
              </div>
              <div>
                <label htmlFor="age">Age *</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={petData.age}
                  onChange={handlePetChange}
                />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={petData.description}
                  onChange={handlePetChange}
                />
              </div>
              <div>
                <label htmlFor="detailed_care_info">Detailed care info *</label>
                <input
                  type="text"
                  id="detailed_care_info"
                  name="detailed_care_info"
                  value={petData.detailed_care_info}
                  onChange={handlePetChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={addPet}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export { PetForm };