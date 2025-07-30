'use client';

import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationIndicator = () => {
  const [location, setLocation] = useState("Fetching user location...");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userLocation")) {
      detectLocation();
    } else {
      setLocation(localStorage.getItem("userLocation")!);
    }
  }, []);

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setLocation("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown city";
          const postal = data.address.postcode || "";
          const userLoc = `${city} ${postal}`;
          setLocation(userLoc);
          localStorage.setItem("userLocation", userLoc);
        } catch (err) {
          setLocation("Unable to fetch address");
        }
      },
      () => {
        setLocation("Permission denied");
      }
    );
  };

  return (
    <div className="text-center my-4 px-4">
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <button
          className="text-white bg-transparent hover:text-blue-300 transition-colors duration-200"
          onClick={() => setShowModal(true)}
        >
          <FaMapMarkerAlt className="text-xl" />
        </button>
        <span className="text-sm sm:text-base md:text-lg font-medium text-white truncate max-w-[90vw]">
          {location}
        </span>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-11/12 max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                📍 Update Your Location?
              </h2>
              <button
                className="text-white text-xl"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="p-6 text-center">
              <p className="text-base text-black sm:text-lg mb-4">
                Would you like to update your location?
              </p>

              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                  onClick={() => {
                    localStorage.removeItem("userLocation");
                    detectLocation();
                    setShowModal(false);
                  }}
                >
                  ✅ Yes, Update
                </button>
                <button
                  className="border border-red-500 text-red-500 px-5 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
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
