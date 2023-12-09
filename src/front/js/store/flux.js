const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
            timeSlotsStartingDay: {
                "date": (new Date).getDate(),
                "month": (new Date).getMonth(),
                "year": (new Date).getFullYear()
            },
            activeScheduleTab: "nav-timeslots",
            token: null,
            payPalToken: null,
            paymentSuccessful: false,
        },
        actions: {
            changeActiveScheduleTab: (payload) => {
                setStore({ activeScheduleTab: payload })
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
        
                    if (data.access_token) {
                      sessionStorage.setItem("token", data.access_token);
                      sessionStorage.setItem("email", email);
                      setStore({
                        token: data.access_token,
                        email: email,
                      });
                      return true;
                    } else {
                      console.error("Login failed. Please check your credentials.");
                      return false;
                    }
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
            setAccessToken: (savedToken) => {
                setStore({ token: savedToken })
            },
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            setTimeslotsStartingDay: (obj) => {
                setStore({ timeSlotsStartingDay: obj })
            },
            changeActiveScheduleTab: (payload) => {
                setStore({ activeScheduleTab: payload })
            },
            setPaymentSuccessful: (payload) => {
                setStore({ paymentSuccessful: payload })
            },
            logout: async () => {
                sessionStorage.removeItem("token")
                setStore({ token: null })
            }
        }
    };
}
export default getState;