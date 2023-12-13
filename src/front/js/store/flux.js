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
          updateAccount: async (userData) => {
              try {
                  const token = sessionStorage.getItem("token");
             
                  const response = await fetch(`${process.env.BACKEND_URL}/api/account`, {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${token}`,
                      },
                      body: JSON.stringify(
                    
                          userData
                         
                      ),
                  });
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return await response.json();
              } catch (error) {
                  throw new Error(`Error: ${error.message}`);
              }
          },
          updatePet: async (petData) => {

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
          setAccessToken: (savedToken) => {
            setStore({ token: savedToken });
          },
          setTimeslotsStartingDay: (obj) => {
            setStore({ timeSlotsStartingDay: obj });
          },
          setPaymentSuccessful: (payload) => {
            setStore({ paymentSuccessful: payload });
          },
          logout: async () => {
            sessionStorage.removeItem("token");
            setStore({ token: null });
          }
      },
  };
}
export default getState;












// const getState = ({ getStore, getActions, setStore }) => {
//   return {
//     store: {
//       token: null,
//       timeSlotsStartingDay: {
//         "date": new Date().getDate(),
//         "month": new Date().getMonth(),
//         "year": new Date().getFullYear()
//       },
//       activeScheduleTab: "nav-timeslots",
//       payPalToken: null,
//       paymentSuccessful: false,
//     },
//     actions: {
//       changeActiveScheduleTab: (payload) => {
//         setStore({ activeScheduleTab: payload });
//       },
//       login: async (email, password) => {
//         try {
//           let options = {
//             method: "POST",
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//           };
//           const response = await fetch(process.env.BACKEND_URL + "/api/login", options);
//           console.log('Login response:', response);
//           if (response.status === 200) {
//             const data = await response.json();
//             console.log("access token", data.access_token);
//             sessionStorage.setItem("token", data.access_token);
//             sessionStorage.setItem("email", email);
//             setStore({
//               token: data.access_token,
//               email: email,
//             });
//             return true;
//           } else {
//             console.error("Login failed. Please check your credentials.");
//             return false;
//           }
//         } catch (error) {
//           console.error("Login error:", error);
//           alert("An error occurred during login.");
//           return false;
//         }
//       },
//       signup: async (formData) => {
//         try {
//           const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
//             method: "POST",
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               "email": formData.email,
//               "password": formData.password,
//               "first_name": formData.first_name,
//               "last_name": formData.last_name
//             })
//           });
//           let data = await response.json();
//           if (data) {
//             console.log(data.message);
//             return true;
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       },

//       // updateAccount: async (userData, pets) => {
//       //   try {
//       //     const token = sessionStorage.getItem("token");
//       //     const email = sessionStorage.getItem("email");
//       //     console.log({ ...userData, email: email });
//       //     console.log(process.env.BACKEND_URL);
          
//       //     const response = await fetch(`${process.env.BACKEND_URL}/api/account`, {
            
//       //       method: "POST",
//       //       headers: {
//       //         "Content-Type": "application/json",
//       //         "Authorization": `Bearer ${token}`,
//       //       },
//       //       body: JSON.stringify({
//       //         userData: { ...userData, email: email },
//       //         pets: pets
//       //       }),
//       //     });
//       //     if (!response.ok) {
//       //       throw new Error(`HTTP error! Status: ${response.status}`);
//       //     }
//       //     return await response.json();
//       //   } catch (error) {
//       //     throw new Error(`Error: ${error.message}`);
//       //   }
//       // },
//       updateAccount: async (userData, pets) => {
//         try {
//           const token = sessionStorage.getItem("token");
//           const email = sessionStorage.getItem("email");
      
//           const apiUrl = `${process.env.BACKEND_URL}/api/account`;
      
//           console.log("Request URL:", apiUrl);
      
//           const requestBody = JSON.stringify({
//             userData: { ...userData, email: email },
//             pets: pets
//           });
      
//           console.log("Request Body:", requestBody);
      
//           const response = await fetch(apiUrl, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               "Authorization": `Bearer ${token}`,
//             },
//             body: requestBody,
//           });
      
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
      
//           const responseData = await response.json();
//           console.log("Response Data:", responseData);
      
//           return responseData;
//         } catch (error) {
//           console.error(`Error: ${error.message}`);
//           throw new Error(`Fetch error: ${error.message}`);
//         }
//       },
      
      
      
//       setAccessToken: (savedToken) => {
//         setStore({ token: savedToken });
//       },
//       exampleFunction: () => {
//         getActions().changeColor(0, "green");
//       },
//       setTimeslotsStartingDay: (obj) => {
//         setStore({ timeSlotsStartingDay: obj });
//       },
//       setPaymentSuccessful: (payload) => {
//         setStore({ paymentSuccessful: payload });
//       },
//       logout: async () => {
//         sessionStorage.removeItem("token");
//         setStore({ token: null });
//       }
//     }
//   };
// };

// export default getState;