import React, { useEffect,useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationIndicator = () => {
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "Fetching location...");
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
    navigator.geolocation.getCurrentPosition(async(pos)=>
  {
    const{latitude,longitude}=pos.coords;
    try{
      const res=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
      const data=await res.json();
      const city = data.address.city || data.address.town || data.address.village || "Unknown city";
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
      <FaMapMarkerAlt className="me-1" />
    </button>
      <span>{location}</span>
    </div>

      {showModal && (
  <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onClick={() => setShowModal(false)}>
    <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Update Your Location</h5>
          <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>Would you like to update your location?</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn btn-primary"
            onClick={() => {
              localStorage.removeItem("userLocation");
              detectLocation();
              setShowModal(false);
            }}
          >
            Yes
          </button>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancel
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
