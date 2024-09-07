import React from "react";
import "../index.css"
const Navbar = () => {
    return (<>
      <div className="navbar">
         <div className="logo-left" >
            <img  src="https://tathya.uidai.gov.in/access/static/media/uidai_english_logo.dd2d2a1cdbf8dcd226664631cb383029.svg" alt="govt logo" /> 
         </div>
        
         <div className="logo-right">
           <img src="https://tathya.uidai.gov.in/access/static/media/aadhaar_english_logo.9a2d63795a7f7bdd7acb2148585336be.svg" alt="aadhar logo"/>
         </div>
         
      </div>
    </>)
}
export default Navbar;