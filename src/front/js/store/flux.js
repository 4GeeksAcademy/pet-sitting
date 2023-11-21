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
			],
			timeSlotsStartingDay: {
				"date": 1,
				"month": 1,
				"year": 2023
			},
			activeScheduleTab: "nav-timeslots",
			typeOfSchedule: 'dog-walking'
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setTimeslotsStartingDay: (obj) => {
				setStore({timeSlotsStartingDay: obj})
			},
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
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
				}
				catch (error) {
					console.log(error)
				}
			},
			changeActiveScheduleTab: (payload) => {
					setStore({activeScheduleTab: payload})
			},
			setTypeOfSchedule: (payload) => {
				setStore({typeOfSchedule: payload})
			}
		}
	};
};

export default getState;
