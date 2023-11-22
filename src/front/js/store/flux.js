
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backendURL: process.env.BACKEND_URL,
			token: null
		},
		actions: {
			login: async (email, password) => {
				const store = getStore();

				try {
					let options = {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ email, password }),
					};

					const response = await fetch(store.backendURL + "/api/login", options);

					if (response.status === 200) {
						const data = await response.json();
						console.log("access token", data.access_token);
						sessionStorage.setItem("token", data.access_token);
						setStore({
							token: data.access_token,
						});
						return true;
					} else {
						alert("Login failed. Please check your credentials.");
						return false;
					}
				} catch (error) {
					console.error("Login error:", error);
					alert("An error occurred during login.");
					return false;
				}
			},
			signup: async (formData)=>{
				try{
					let response = await fetch(getStore().backendURL+"/api/signup",{
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body: JSON.stringify({"email":formData.email,"password":formData.password," first_name":formData.first_name,"last_name":formData.last_name,"address":formData.address,"phone_number":formData.phone_number})
					})

					let data = await response.json()

					if (data){
						console.log(data.message)
						return true
					}
				}catch(error){console.log(error)}
			},

			signupPet: async (formData)=>{
				try{
					let response = await fetch(getStore().backendURL+"/api/signupPet",{
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body: JSON.stringify({"name":formData.name,"bread":formData.bread,"age":formData.age,"description":formData.description,"detailed_care_info":formData.detailed_care_info})
					})

					let data = await response.json()

					if (data){
						console.log(data.message)
						return true
					}
				}catch(error){console.log(error)}
			}
		},
	};
};

export default getState;
