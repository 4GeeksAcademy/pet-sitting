
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

					const response = await fetch(getStore().backendURL + "api/login", options);

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
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setTimeslotsStartingDay: (obj) => {
				setStore({ timeSlotsStartingDay: obj })
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(getStore().backendURL + "/api/hello")
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
					let response = await fetch(getStore().backendURL + "api/signup", {
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
					let response = await fetch(getStore().backendURL + "api/signupPet", {
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
			setTypeOfSchedule: (payload) => {
				setStore({ typeOfSchedule: payload })
			}
		}
	};
}

export default getState;






