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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
<<<<<<< HEAD
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
=======
>>>>>>> 18dcec07105a3a1ae4a1765f2105588976eaf8b0
			signup: async (formData)=>{
				try{
					let response = await fetch(getStore().backendURL+"/api/signup",{
						method:"POST",
						headers:{"Content-Type":"application/json"},
						body: JSON.stringify({"email":formData.email,"password":formData.password,"first_name":formData.first_name,"last_name":formData.last_name})

					})
					let data = await response.json()
				

					if (data) {
						console.log(data.message)
						return true
					}
				} catch (error) { console.log(error) }
			},

<<<<<<< HEAD
			// signupPet: async (formData)=>{
			// 	try{
			// 		let response = await fetch(getStore().backendURL+"/api/signupPet",{
			// 			method:"POST",
			// 			headers:{"Content-Type":"application/json"},
			// 			body: JSON.stringify({"name":formData.name,"bread":formData.bread,"age":formData.age,"description":formData.description,"detailed_care_info":formData.detailed_care_info})
			// 		})

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				// const demo = store.demo.map((elm, i) => {
				// 	if (i === index) elm.background = color;
				// 	return elm;
				// });

				//reset the global store
				setStore({ demo: demo });
			}
		}
=======
			
		},

>>>>>>> 18dcec07105a3a1ae4a1765f2105588976eaf8b0
	};
}

export default getState;






	
