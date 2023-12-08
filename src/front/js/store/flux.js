const getState = ({ getStore, getActions, setStore }) => {

    return {
        store: {
            backendURL: process.env.BACKEND_URL,
            token: null,
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
            ],
            timeSlotsStartingDay: {
                "date": (new Date).getDate(),
                "month": (new Date).getMonth(),
                "year": (new Date).getFullYear()
            },
            activeScheduleTab: "nav-timeslots",
            typeOfSchedule: 'dog-walk'
        },
        actions: {
            // Use getActions to call a function within a fuction
            setAccessToken: (savedToken) => {
                setStore({ token: savedToken })
            },
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

                    const response = await fetch(process.env.BACKEND_URL + "/api/login", options);

                    console.log('Login response:', response);

                    if (response.status === 200) {
                        const data = await response.json();
                        console.log("access token", data.access_token);
                        sessionStorage.setItem("token", data.access_token);
                        sessionStorage.setItem("email", email);
                        setStore({
                            token: data.access_token,
                            email: email,
                        });
                        // setIsLoggedIn=true
                        return true;
                    } else {
                        console.error("Login failed. Please check your credentials.");
                        return false;
                    }
                } catch (error) {
                    console.error("Login error:", error);
                    alert("An error occurred during login.");
                    return false;
                }
            },


           
            signup: async (formData) => {
                try {
                    const token = localStorage.getItem("token");

                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "email": formData.email,
                            "password": formData.password,
                            "first_name": formData.first_name,
                            "last_name": formData.last_name
                        })
                    });

                    let data = await response.json();

                    if (data) {
                        console.log(data.message)
                        return true;
                    }
                } catch (error) {
                    console.log(error)
                }
            },

            updateAccount: async (userData, pets) => {
                try {
                    const token = sessionStorage.getItem("token");
                    const email = sessionStorage.getItem("email");
                    console.log({ ...userData, email: email });
                    const response = await fetch(`${process.env.BACKEND_URL}/api/account`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            userData: { ...userData, email: email },
                            pets: pets
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    return await response.json();
                } catch (error) {
                    throw new Error(`Error: ${error.message}`);
                }
            },

            addPet: async (petData) => {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch(`${process.env.BACKEND_URL}/api/pets`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(petData),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    return await response.json();
                } catch (error) {
                    throw new Error(`Error: ${error.message}`);
                }
            },
            changeActiveScheduleTab: (payload) => {
                setStore({ activeScheduleTab: payload })
            },
            logout: async () => {
                sessionStorage.removeItem("token")
                setStore({ token: null })


            }
        },
    };

}



export default getState;





// 	return {
// 		store: {
// 			backendURL: process.env.BACKEND_URL,
// 			token: null,
// 			timeSlotsStartingDay: {
// 				"date": (new Date).getDate(),
// 				"month": (new Date).getMonth(),
// 				"year": (new Date).getFullYear()
// 			},
// 			activeScheduleTab: "nav-timeslots",
// 			payPalToken: null,
// 			paymentSuccessful: false,
// 			activeScheduleTab: "nav-timeslots",
// 			typeOfSchedule: 'dog-walk'
// 		},
// 		actions: {
// 			// Use getActions to call a function within a fuction
// 			login: async (email, password) => {
// 				const store = getStore();
// 				try {
// 					let options = {
// 						method: "POST",
// 						headers: {
// 							'Content-Type': 'application/json',
// 						},
// 						body: JSON.stringify({ email, password }),
// 					};
// 					const response = await fetch(process.env.BACKEND_URL + "api/login", options);
// 					console.log('Login response:', response);
// 					if (response.status === 200) {
// 						const data = await response.json();
// 						console.log("access token", data.access_token);
// 						sessionStorage.setItem("token", data.access_token);
// 						sessionStorage.setItem("email", email);
// 						setStore({
// 							token: data.access_token,
// 							email: email,
// 						});
// 						return true;
// 					} else {
// 						console.error("Login failed. Please check your credentials.");
// 						return false;
// 					}
// 				} catch (error) {
// 					console.error("Login error:", error);
// 					alert("An error occurred during login.");
// 					return false;
// 				}
// 			},
// 			setAccessToken: (savedToken) => {
// 				setStore({ token: savedToken })
// 			},
// 			exampleFunction: () => {
// 				getActions().changeColor(0, "green");
// 			},
// 			setTimeslotsStartingDay: (obj) => {
// 				setStore({ timeSlotsStartingDay: obj })
// 			},
// 			signup: async (formData) => {
// 				try {

// 					let response = await fetch(process.env.BACKEND_URL + "api/signup", {
// 						method: "POST",
// 						headers: { "Content-Type": "application/json" },
// 						body: JSON.stringify({ "email": formData.email, "password": formData.password, "first_name": formData.first_name, "last_name": formData.last_name })
// 					})
// 					let data = await response.json()

// 					if (data) {
// 						console.log(data.message)
// 						return true
// 					}
// 				} catch (error) { console.log(error) }
// 			},
// 			updateStoreFromStorage: () => {
// 				let accessToken = sessionStorage.getItem("token");
// 				let userString = sessionStorage.getItem("user");
// 				let userObject = JSON.parse(userString);
// 				if (accessToken && accessToken != "" && accessToken != "undefined") {
// 					setStore({ accessToken: accessToken });
// 					setStore({ user: userObject });
// 				}
// 			},

// 			logUserInTheStore: (data) => {
// 				setStore({
// 					user: data.user,
// 					accessToken: data.token,
// 					activeuser: data.user.id,
// 				});
// 				sessionStorage.setItem("token", data.token);
// 				sessionStorage.setItem("user", JSON.stringify(data.user));
// 			},

// 			//   resetPassword: (token, newPassword) => {
// 			// 	const store = getStore();
// 			// 	return fetch("/api/reset-password", {
// 			// 		method: 'PUT',
// 			// 		headers: { "Content-Type": "application/json" },
// 			// 		body: JSON.stringify({ token: token, new_password: newPassword }),
// 			// 	})
// 			// 	.then(response => {
// 			// 		if (response.ok) {
// 			// 			return response.json();
// 			// 		} else {
// 			// 			throw new Error('Error resetting password.');
// 			// 		}
// 			// 	})
// 			// 	.catch(error => {
// 			// 		console.error(error);
// 			// 		throw error;
// 			// 	});
// 			// }

// 			resetPassword: (token, newPassword) => {
// 				const store = getStore();
// 				console.log("Reset Password Request:", process.env.BACKEND_URL + "/api/reset-password");
// 				console.log("Token:", token);
// 				console.log("New Password:", newPassword);

// 				return fetch(process.env.BACKEND_URL + "/api/reset-password", {
// 					method: 'POST',
// 					headers: { "Content-Type": "application/json" },
// 					body: JSON.stringify({ token: token, new_password: newPassword }),
// 				})
// 					.then(response => {
// 						console.log("Reset Password Response:", response);

// 						if (response.ok) {
// 							return response.json();
// 						} else {
// 							throw new Error('Error resetting password.');
// 						}
// 					})
// 					.catch(error => {
// 						console.error("Reset Password Error:", error);
// 						throw error;
// 					});
// 			}

// 		},

// 	};
// }




// 			signupPet: async (formData) => {
// 				try {
// 					let response = await fetch(process.env.BACKEND_URL + "api/signupPet", {
// 						method: "POST",
// 						headers: { "Content-Type": "application/json" },
// 						body: JSON.stringify({ "name": formData.name, "bread": formData.bread, "age": formData.age, "description": formData.description, "detailed_care_info": formData.detailed_care_info })
// 					})
// 				}
// 				catch (error) {
// 					console.log(error)
// 				}
// 			},
// 			changeActiveScheduleTab: (payload) => {
// 				setStore({ activeScheduleTab: payload })
// 			},
// 			setPaymentSuccessful: (payload) => {
// 				setStore({ paymentSuccessful: payload })
// 			}
// 		}
// 	};
// }


// export default getState;








// 			signupPet: async (formData) => {
// 				try {
// 					let response = await fetch(process.env.BACKEND_URL + "api/signupPet", {
// 						method: "POST",
// 						headers: { "Content-Type": "application/json" },
// 						body: JSON.stringify({ "name": formData.name, "bread": formData.bread, "age": formData.age, "description": formData.description, "detailed_care_info": formData.detailed_care_info })
// 					})
// 				}
// 				catch (error) {
// 					console.log(error)
// 				}
// 			},
// 			changeActiveScheduleTab: (payload) => {
// 				setStore({ activeScheduleTab: payload })
// 			}
// 		}
// 	}
// }


