import React, { useState, useEffect } from "react"

const PetForm = ({ petFormData, idx, handlePetChange }) => {
    const [petData, setPetData] = useState({});

    // useEffect(() => {
    //     setPetData(petFormData);
    // }, [])

    useEffect(() => handlePetChange(petData, idx), [petData]);

    return (<>
        <div>
            <label htmlFor="pet_name">Pet Name *</label>
            <input
                type="text"
                id="pet_name"
                name="pet_name"
                value={petData.pet_name}
                onChange={(e) => setPetData({ ...petData, pet_name: e.target.value })}
            />
        </div>
        <div>
            <label htmlFor="breed">Breed *</label>
            <input
                type="text"
                id="breed"
                name="breed"
                value={petData.breed}
                onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
            />
        </div>
        <div>
            <label htmlFor="age">Age *</label>
            <input
                type="text"
                id="age"
                name="age"
                value={petData.age}
                onChange={(e) => setPetData({ ...petData, age: parseInt(e.target.value) })}
            />
        </div>
        <div>
            <label htmlFor="description">Description</label>
            <input
                type="text"
                id="description"
                name="description"
                value={petData.description}
                onChange={(e) => setPetData({ ...petData, description: e.target.value })}
            />
        </div>
        <div>
            <label htmlFor="detailed_care_info">Detailed care info *</label>
            <input
                type="text"
                id="detailed_care_info"
                name="detailed_care_info"
                value={petData.detailed_care_info}
                onChange={(e) => setPetData({ ...petData, detailed_care_info: e.target.value })}
            />
        </div></>)
}

export { PetForm };