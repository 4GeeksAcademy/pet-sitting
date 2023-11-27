// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     window.location.href = "/home";
//   };

//   return (
//     <>
//       <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>(123)456-7891</div>
//       <nav className="navbar navbar-light" style={{ backgroundColor: 'beige' }}>
//         <div className="container">
//           <Link to="/" className="navbar-brand">
//             <img className="logoImg" src="https://t4.ftcdn.net/jpg/01/26/17/71/240_F_126177158_X32G1wOL21G4Cu2Yp8CQ2CrvWq9aEy0c.jpg" alt="Logo" height="30" />
//           </Link>
//           <h1 className="navbar-title">Hot Doggity Dog Walkers</h1>
//           <div className="dropdown">
//             <button
//               className="btn btn-secondary dropdown-toggle"
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
//                 <Link className="dropdown-item" href="#" onClick={handleAccount}>
//                   Account
//                 </Link>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#">
//                   Services
//                 </a>
//               </li>
//               <li>

//                 <a className="dropdown-item" href="#" onClick={handleLogout}>
//                   Insurance
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#" onClick={handleLogout}>
//                   Payments
//                 </a>
//               </li>
//               <li>
//                 <a className="dropdown-item" href="#" onClick={handleLogout}>
//                   Log out

      
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

 const handleLogout = () => {
    setIsLoggedIn(false);
    // Redirect to the home page ("/")
    history.push("/");
  };

  return (
    <>
      <div style={{ backgroundColor: 'black', color: 'white', padding: '10px', textAlign: 'center' }}>(123)456-7891</div>
      <nav className="navbar navbar-light" style={{ backgroundColor: 'beige' }}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img className="logoImg" src="https://t4.ftcdn.net/jpg/01/26/17/71/240_F_126177158_X32G1wOL21G4Cu2Yp8CQ2CrvWq9aEy0c.jpg" alt="Logo" height="30" />
          </Link>
          <h1 className="navbar-title">Hot Doggity Dog Walkers</h1>
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="/Account" className="dropdown-item">
                  Account
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Services
                </a>
              </li>
              <li>
                <Link to="/insurance" className="dropdown-item">
                  Insurance
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Payments
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
