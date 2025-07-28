import React, { useEffect,useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationIndicator = () => {
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "Fetching user location...");
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
  if(!localStorage.getItem("userLocation")){
    detectLocation();
  }
  },[]);

  // fetch location using javascript and reverse the location using api
  const detectLocation=async()=>{
    if(!navigator.geolocation){
      setLocation("Location not supported");
      return;
    }
    // use navigator.geolocation to get the location
    navigator.geolocation.getCurrentPosition(async(pos)=>
  {
    const{latitude,longitude}=pos.coords;
    try{
      // use public location api to request the location 
      const res=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      //convert to json
      const data=await res.json();
      //put city
      const city = data.address.city || data.address.town || data.address.village || "Unknown city";
      //put postal and finally store in userLoc and then set the state
      const postal = data.address.postcode || "";
      const userLoc = `${city} ${postal}`;
      setLocation(userLoc);
      localStorage.setItem("userLocation",userLoc);
    }
    catch(err){
      setLocation("Unable to fetch address");
    }
  },()=>{ setLocation("Permission denied");

  }
);
};
  
  return (
    <div className="text-center my-2">
    <div className="d-flex justify-content-center align-items-center">
    <button
      className="btn p-0 border-0"
      style={{ color: 'white', background: 'none' }}
      onClick={() => setShowModal(true)}
    >
      {/* location logo  */}
      <FaMapMarkerAlt className="me-1" />
    </button>
     {/* set the current location */}
      <span>{location}</span>
    </div>

    {showModal && (
  <div
    className="modal fade show d-block"
    tabIndex="-1"
    style={{
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      animation: "fadeIn 0.3s ease-in-out",
    }}
    onClick={() => setShowModal(false)}
  >
    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content shadow-lg rounded-4 overflow-hidden">
        
        <div
          className="modal-header text-white"
          style={{
            background: "linear-gradient(135deg, #007bff, #6610f2)",
          }}
        >
          <h5 className="modal-title d-flex align-items-center gap-2">
            📍 Update Your Location?
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
        </div>
        
        <div className="modal-body text-center py-4">
          <p className="fs-5">Would you like to update your location?</p>
        </div>
        
        <div className="modal-footer d-flex justify-content-center gap-3 py-3">
          <button
            className="btn btn-success px-4"
            onClick={() => {
              localStorage.removeItem("userLocation");
              detectLocation();
              setShowModal(false);
            }}
          >
            ✅ Yes, Update
          </button>
          <button
            className="btn btn-outline-danger px-4"
            onClick={() => setShowModal(false)}
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</div>
  );
};

export default LocationIndicator;
