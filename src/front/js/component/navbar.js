import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleLogout = async () => {
    try {
      await actions.logout();
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-brand" style={{ textAlign: 'center', color: 'black', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img className="logoImg" src="https://t4.ftcdn.net/jpg/01/26/17/71/240_F_126177158_X32G1wOL21G4Cu2Yp8CQ2CrvWq9aEy0c.jpg" alt="Logo" height="30" style={{ opacity: 0.5 }} />
          <span style={{ marginBottom: '5px' }}>Hot Doggity Dog Walkers</span>
        </div>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" style={{ color: 'black' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/signupUser" className="nav-link" style={{ color: 'black' }}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link" style={{ color: 'black' }}>Account</Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link" style={{ color: 'black' }}>Service</Link>
              </li>
              <li className="nav-item">
                <Link to="/payment" className="nav-link" style={{ color: 'black' }}>Payment</Link>
              </li>
              <li className="nav-item">
                <Link to="/insurance" className="nav-link disabled" aria-disabled="true" style={{ color: 'black' }}>Insurance</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    
  );






};







// import React, { useState, useContext } from "react";
// import { Context } from "../store/appContext";
// import { Link, useNavigate } from "react-router-dom";

// export const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);
//   const navigate = useNavigate();
//   const { store, actions } = useContext(Context);

//   const handleLogout = async () => {
//     try {
//       await actions.logout();
//       setIsLoggedIn(false);
//       navigate("/");
//     } catch (error) {
//       console.error('An error occurred during logout:', error);
//     }
//   };

//   return (
//     <>

//       <nav className="navbar navbar-light" style={{ backgroundColor: 'beige' }}>
//       <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>(123)456-7891</div>
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             <img className="logoImg" src="https://t4.ftcdn.net/jpg/01/26/17/71/240_F_126177158_X32G1wOL21G4Cu2Yp8CQ2CrvWq9aEy0c.jpg" alt="Logo" height="30" />
//           </Link>
//           <h1 className="navbar-title">Hot Doggity Dog Walkers</h1>
//         </div>
//       </nav>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Navbar</a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link active" aria-current="page">Home</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/signupUser" className="nav-link">Sign up</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/account" className="nav-link">Account</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/services" className="nav-link">Service</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/payment" className="nav-link">Payment</Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/insurance" className="nav-link disabled" aria-disabled="true">Insurance</Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//     </>
//   );
// };


{/* //   return (
//     <>
//       <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>(123)456-7891</div>
//       <nav className="navbar navbar-light" style={{ backgroundColor: 'beige' }}>
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             <img className="logoImg" src="https://t4.ftcdn.net/jpg/01/26/17/71/240_F_126177158_X32G1wOL21G4Cu2Yp8CQ2CrvWq9aEy0c.jpg" alt="Logo" height="30" />
//           </Link>
//           <h1 className="navbar-title">Hot Doggity Dog Walkers</h1>
//           <div className="dropdown">
//             <button */}
{/* //               className="btn btn-secondary dropdown-toggle"
//               type="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
//                 <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
//               </svg>
//             </button>
//             <ul className="dropdown-menu">
//               <li>
//                 <Link to="/Account" className="dropdown-item">
//                   Account
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/services" className="dropdown-item">
//                   service
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/insurance" className="dropdown-item"> */}
{/* //                   Insurance
//                 </Link>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#" onClick={handleLogout}>
//                   Payments
//                 </a>
//               </li>
//               <li>
//                 <Link to="/signupUser" className="dropdown-item">
//                   Sign up
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/" className="dropdown-item">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#" onClick={handleLogout}>
//                   Log out
//                 </a>
//               </li>
//             </ul>
//           </div> */}
{/* //         </div>
//       </nav>
//     </>
//   );
// }; */}
