// import React, { useState } from "react";

// export const Profile = ({ close }) => {
//   const [petData, setPetData] = useState({
//     petName: "",
//     breed: "",
//     age: "",
//     description: "", // Fix: 'comments' to 'description'
//     detailed_care_info: "", // Add this line for 'detailed_care_info'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPetData({
//       ...petData,
//       [name]: value,
//     });
//   };

//   const handleAddPet = () => {
//     console.log("Pet added:", petData);
//     close();
//   };

//   return (
//     <div>
//       <h2>Add Pet</h2>
//       <div className="mb-3">
//         <label htmlFor="petName">Pet Name</label>
//         <input
//           type="text"
//           id="petName"
//           name="petName"
//           value={petData.petName}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="breed">Breed</label>
//         <input
//           type="text"
//           id="breed"
//           name="breed"
//           value={petData.breed}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="age">Age</label>
//         <input
//           type="text"
//           id="age"
//           name="age"
//           value={petData.age}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="description">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={petData.description}
//           onChange={handleChange}
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="detailed_care_info">Detailed Care Info</label>
//         <textarea
//           id="detailed_care_info"
//           name="detailed_care_info"
//           value={petData.detailed_care_info}
//           onChange={handleChange}
//         />
//       </div>
//       <button type="button" onClick={handleAddPet} className="btn btn-primary">
//         Add Pet
//       </button>
//     </div>
//   );
// };

import React, { useState } from "react";

export const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        petName: "",
        breed: "",
        age: "",
        description: "",
        detailedCareInfo: "",
    });

    const [profilePicture, setProfilePicture] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    const handleAddPet = () => {
        console.log("Form Data:", formData);
        console.log("Profile Picture:", profilePicture);
        close();
    };

    return (
        <div>
            <h2>Add Pet</h2>
            <div className="mb-3">
                <label htmlFor="profilePicture">Profile Picture</label>
                <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleFileChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="first_Name">First Name</label>
                <input
                    type="text"
                    id="first_Name"
                    name="first_Name"
                    value={formData.first_Name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="last_Name">Last Name</label>
                <input
                    type="text"
                    id="last_Name"
                    name="last_Name"
                    value={formData.last_Name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phone_Number">Phone Number</label>
                <input
                    type="tel"
                    id="phone_Number"
                    name="phone_Number"
                    value={formData.phone_Number}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="pet_Name">Pet Name</label>
                <input
                    type="text"
                    id="pet_Name"
                    name="pet_Name"
                    value={formData.pet_Name}
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
                    value={formData.breed}
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
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="detailed_Care_Info">Detailed Care Info</label>
                <textarea
                    id="detailed_Care_Info"
                    name="detailed_Care_Info"
                    value={formData.detailed_Care_Info}
                    onChange={handleChange}
                />
            </div>
            <button type="button" onClick={handleAddPet} className="btn btn-primary">
                Add Pet
            </button>
        </div>
    );
};
