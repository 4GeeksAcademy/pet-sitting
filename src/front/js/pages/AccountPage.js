import React from "react"







export  const AccountPage =()=>{


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
{/* <label htmlFor="profilePicture">Profile Picture</label>
<input
    type="file"
    id="email"
    name="email"
    onChange={handleFileChange}
/> */}
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

}