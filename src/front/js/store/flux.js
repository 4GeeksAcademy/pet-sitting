const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			
			
				signup: async (formData) => {
					try {
						let response = await fetch( "https://curly-capybara-4xpg77r7vp92jxpq-3001.app.github.dev/api/signup", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ "email":formData.email, "password":formData.password,"confirm_Password":formData.confirm_Password
							// " first_name": formData.first_name, "last_name": formData.last_name, "address": formData.address, "phone_number": formData.phone_number
						 })
						})

						let data = await response.json()

						if (data) {
							console.log(data.message)
							return true
						}
					} catch (error) { console.log(error) }
				},

				// signupPet: async (formData) => {
				// 	try {
				// 		let response = await fetch(getStore().backendURL + "/api/signupPet", {
				// 			method: "POST",
				// 			headers: { "Content-Type": "application/json" },
				// 			body: JSON.stringify({
				// 				"name": formData.name,
				// 				"breed": formData.breed,
				// 				"age": formData.age,
				// 				"description": formData.description,
				// 				"detailed_care_info": formData.detailed_care_info
				// 			})
				// 		});
				
				// 		if (response.ok) {
				// 			const data = await response.json();
				// 			console.log("Pet signup successful:", data);
				// 		} else {
				// 			console.error("Pet signup failed:", response.statusText);
				// 		}
				// 	} catch (error) {
				// 		console.error("Error in signupPet:", error);
				// 	}
				// }
		}
	};
};

export default getState;
