const axios = require("axios")
const base64 = require('base-64');

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			backendURL: process.env.BACKEND_URL,
			token: null,
			timeSlotsStartingDay: {
				"date": (new Date).getDate(),
				"month": (new Date).getMonth(),
				"year": (new Date).getFullYear()
			},
			activeScheduleTab: "nav-timeslots",
			payPalToken: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (email, password) => {
				try {
					let options = {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ "email": email, "password": password }),
					};

					const response = await fetch(process.env.BACKEND_URL + "api/login", options);

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
			setAccessToken: (savedToken) => {
				setStore({ token: savedToken })
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setTimeslotsStartingDay: (obj) => {
				setStore({ timeSlotsStartingDay: obj })
			},
			signup: async (formData) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/signup", {
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
			signupPet: async (formData) => {
				try {
					let response = await fetch(process.env.BACKEND_URL + "api/signupPet", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ "name": formData.name, "bread": formData.bread, "age": formData.age, "description": formData.description, "detailed_care_info": formData.detailed_care_info })
					})
				}
				catch (error) {
					console.log(error)
				}
			},
			changeActiveScheduleTab: (payload) => {
				setStore({ activeScheduleTab: payload })
			},
			getPayPalToken: async () => {
				try {
					const client_id = process.env.PAYPAL_CLIENT_ID
					const client_secret = process.env.PAYPAL_CLIENT_SECRET

					const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token',
						new URLSearchParams({
							'grant_type': 'client_credentials'
						}),
						{
							headers:
							{
								'Content-Type': 'application/x-www-form-urlencoded',
								'Authorization': 'Basic ' + base64.encode(client_id + ":" + client_secret)
							}
						})
					console.log(response.data.access_token)
					setStore({ payPalToken: response.data.access_token });

				} catch (error) {
					console.log(Promise.reject(error));
				}
			}
		}
	}
}

export default getState;
