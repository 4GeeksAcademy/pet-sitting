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
			signup: async (formData) => {
				try {
					let response = await fetch(getStore().backendURL + "/api/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "email": formData.email, "password": formData.password, "first_name": formData.first_name, "last_name": formData.last_name })

					})
					let data = await response.json()


					if (data) {
						console.log(data.message)
						return true
					}
				} catch (error) { console.log(error) }
			},
			updateStoreFromStorage: () => {
				let accessToken = sessionStorage.getItem("token");
				let userString = sessionStorage.getItem("user");
				let userObject = JSON.parse(userString);
				if (accessToken && accessToken != "" && accessToken != "undefined") {
					setStore({ accessToken: accessToken });
					setStore({ user: userObject });
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello");
					const data = await resp.json();
					setStore({ message: data.message });
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			logUserInTheStore: (data) => {
				setStore({
					user: data.user,
					accessToken: data.token,
					activeuser: data.user.id,
				});
				sessionStorage.setItem("token", data.token);
				sessionStorage.setItem("user", JSON.stringify(data.user));
			},

			//   resetPassword: (token, newPassword) => {
			// 	const store = getStore();
			// 	return fetch("/api/reset-password", {
			// 		method: 'PUT',
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify({ token: token, new_password: newPassword }),
			// 	})
			// 	.then(response => {
			// 		if (response.ok) {
			// 			return response.json();
			// 		} else {
			// 			throw new Error('Error resetting password.');
			// 		}
			// 	})
			// 	.catch(error => {
			// 		console.error(error);
			// 		throw error;
			// 	});
			// }

			resetPassword: (token, newPassword) => {
				const store = getStore();
				console.log("Reset Password Request:", process.env.BACKEND_URL + "/api/reset-password");
				console.log("Token:", token);
				console.log("New Password:", newPassword);

				return fetch(process.env.BACKEND_URL + "/api/reset-password", {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ token: token, new_password: newPassword }),
				})
					.then(response => {
						console.log("Reset Password Response:", response);

						if (response.ok) {
							return response.json();
						} else {
							throw new Error('Error resetting password.');
						}
					})
					.catch(error => {
						console.error("Reset Password Error:", error);
						throw error;
					});
			}

		},

	};
}

export default getState;







