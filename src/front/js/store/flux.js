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
			login: async (email, password) => {
				
				try {
				  const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email, password }),
				  });
		
				  if (response.ok) {
					const data = await response.json();
					console.log('Login successful', data);
					localStorage.setItem("token", data.access_token);
					return true;
				  } else {
					console.error('Login failed. Please check your credentials.');
					return false;
				  }
				} catch (error) {
				  console.error('An error occurred during login:', error);
				  return false;
				}
			  },
			
				signup: async (formData) => {
					try {
						let response = await fetch(process.env.BACKEND_URL + "/api/signup", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								"email": formData.email,
								"password": formData.password,
								"first_name": formData.first_name,
								"last_name": formData.last_name
							})
						});
					let data = await response.json()
				

					if (data) {
						console.log(data.message)
						return true
					}
				} catch (error) { console.log(error) }
			},
			account: async (formData) => {
				let token=localStorage.getItem("token")
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/account`, {
					  method: "PUT",
					  headers: {
						"Content-Type": "application/json",
						
						  "Authorization": `Bearer ${token}`,
					  },
					  body: JSON.stringify(formData),
					});
				
					if (!response.ok) {
					  throw new Error(`HTTP error! Status: ${response.status}`);
					}
				
					return await response.json();
				  } catch (error) {
					throw new Error(`Error: ${error.message}`);
				  }
			}

			
		},

	};
}

export default getState;






	
