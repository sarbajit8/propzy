import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Crosshair, 
  AlertCircle, 
  ChevronDown,
  Check,
  Building,
  Home
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ResidentialLocation = ({prop,propdetails}) => {
  // Location states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedSubLocality, setSelectedSubLocality] = useState("");
  const [apartmentSociety, setApartmentSociety] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const navigate = useNavigate();

  // Search states
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [localitySearchTerm, setLocalitySearchTerm] = useState("");
  const [subLocalitySearchTerm, setSubLocalitySearchTerm] = useState("");
  
  // Dropdown states
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLocalityDropdownOpen, setIsLocalityDropdownOpen] = useState(false);
  const [isSubLocalityDropdownOpen, setIsSubLocalityDropdownOpen] = useState(false);
  
  // Loading and error states
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for dropdowns
  const cityDropdownRef = useRef(null);
  const localityDropdownRef = useRef(null);
  const subLocalityDropdownRef = useRef(null);

  // Major Indian cities
  const indianCities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", 
    "Kolkata", "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", 
    "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", 
    "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", 
    "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", 
    "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", 
    "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", 
    "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", 
    "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad", 
    "Tiruchirappalli", "Bareilly", "Mysore", "Tiruppur", "Gurgaon", 
    "Aligarh", "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Guntur", 
    "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", 
    "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", 
    "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", 
    "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", 
    "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad", 
    "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", 
    "Gaya", "Jalgaon", "Udaipur"
  ];

  // Sample localities based on selected city
  const sampleLocalities = {
    "Mumbai": ["Andheri East", "Andheri West", "Bandra East", "Bandra West", "Borivali East", "Borivali West", "Malad East", "Malad West", "Powai", "Lower Parel", "Worli", "Juhu", "Santacruz East", "Santacruz West"],
    "Delhi": ["Connaught Place", "Karol Bagh", "Lajpat Nagar", "Dwarka", "Rohini", "Janakpuri", "Saket", "Vasant Kunj", "Greater Kailash", "South Extension"],
    "Bangalore": ["Koramangala", "Indiranagar", "Whitefield", "Electronic City", "HSR Layout", "BTM Layout", "Jayanagar", "Rajajinagar", "Malleshwaram", "Hebbal"],
    "Pune": ["Hinjewadi", "Kothrud", "Viman Nagar", "Aundh", "Baner", "Wakad", "Hadapsar", "Kharadi", "Magarpatta", "Kalyani Nagar"],
  };

  // Sample sub-localities
  const sampleSubLocalities = [
    "Sector 1", "Sector 2", "Sector 3", "Phase 1", "Phase 2", "Phase 3", 
    "Block A", "Block B", "Block C", "Block D", "Main Road", "Cross Road", 
    "Market Area", "Residential Area", "Commercial Area", "Near Metro Station",
    "Near Hospital", "Near School", "Near Mall"
  ];

  // Filter functions
  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  // Updated locality filtering - now shows suggestions only if there are predefined localities for the city
  const filteredLocalities = selectedCity && sampleLocalities[selectedCity] 
    ? sampleLocalities[selectedCity].filter((locality) =>
        locality.toLowerCase().includes(localitySearchTerm.toLowerCase())
      )
    : [];

  const filteredSubLocalities = sampleSubLocalities.filter((subLocality) =>
    subLocality.toLowerCase().includes(subLocalitySearchTerm.toLowerCase())
  );

  // Location detection function
  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }

    setIsDetectingLocation(true);
    const loadingToast = toast.loading('Detecting your location...', {
      position: 'top-center',
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          
          if (response.ok) {
            const data = await response.json();
            console.log('Location data:', data);
            
            if (data && data.address) {
              const address = data.address;
              
              // Extract location details
              const detectedCity = address.city || address.town || address.state_district || address.state;
              const detectedLocality = address.suburb || address.neighbourhood || address.village;
              const detectedSubLocality = address.residential || address.quarter;
              
              // Update form fields
              if (detectedCity) {
                const matchedCity = indianCities.find(
                  city => city.toLowerCase().includes(detectedCity.toLowerCase())
                );
                
                if (matchedCity) {
                  setSelectedCity(matchedCity);
                  setCitySearchTerm(matchedCity);
                } else {
                  setSelectedCity(detectedCity);
                  setCitySearchTerm(detectedCity);
                }
              }
              
              if (detectedLocality) {
                setSelectedLocality(detectedLocality);
                setLocalitySearchTerm(detectedLocality);
              }
              
              if (detectedSubLocality) {
                setSelectedSubLocality(detectedSubLocality);
                setSubLocalitySearchTerm(detectedSubLocality);
              }
              
              toast.dismiss(loadingToast);
              toast.success('Location detected successfully!', {
                duration: 3000,
                position: 'top-center',
              });
              
              setErrors({});
            } else {
              throw new Error('Could not determine location details');
            }
          } else {
            throw new Error('Failed to fetch location details');
          }
        } catch (error) {
          console.error('Error getting location details:', error);
          toast.dismiss(loadingToast);
          toast.error('Could not determine address from your location. Please enter manually.');
          setUserLocation({ latitude, longitude });
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.dismiss(loadingToast);
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            toast.error('Location request timed out.');
            break;
          default:
            toast.error('An unknown error occurred while detecting location.');
            break;
        }
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000
      }
    );

    setTimeout(() => setIsDetectingLocation(false), 15000);
  };

  // Handle selections
  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearchTerm(city);
    setIsCityDropdownOpen(false);
    // Reset locality when city changes
    setSelectedLocality("");
    setLocalitySearchTerm("");
    if (errors.selectedCity) {
      setErrors((prev) => ({ ...prev, selectedCity: "" }));
    }
  };

  // Updated locality handler - now accepts any input
  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality);
    setLocalitySearchTerm(locality);
    setIsLocalityDropdownOpen(false);
    if (errors.selectedLocality) {
      setErrors((prev) => ({ ...prev, selectedLocality: "" }));
    }
  };

  // Updated locality input handler - allows free typing
  const handleLocalityInputChange = (e) => {
    const value = e.target.value;
    setLocalitySearchTerm(value);
    setSelectedLocality(value); // Set the selected locality to whatever is typed
    setIsLocalityDropdownOpen(value.length > 0 && filteredLocalities.length > 0); // Only show dropdown if there are suggestions
    if (errors.selectedLocality) {
      setErrors((prev) => ({ ...prev, selectedLocality: "" }));
    }
  };

  const handleSubLocalitySelect = (subLocality) => {
    setSelectedSubLocality(subLocality);
    setSubLocalitySearchTerm(subLocality);
    setIsSubLocalityDropdownOpen(false);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!selectedCity) newErrors.selectedCity = "City is required";
    if (!selectedLocality || !selectedLocality.trim()) newErrors.selectedLocality = "Locality is required";
    if (!apartmentSociety.trim()) newErrors.apartmentSociety = "Apartment/Society is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        toast.error('Please fill in all required fields!', {
          duration: 4000,
          position: 'top-center',
        });
        return;
      }

      const loadingToast = toast.loading('Saving location details...', {
        position: 'top-center',
      });
         
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Location saved successfully:", {
        selectedCity,
        selectedLocality,
        selectedSubLocality,
        apartmentSociety,
        houseNo,
        userLocation
      });

      toast.dismiss(loadingToast);
      toast.success('Location saved successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });
      
      // Navigation will now work
      setTimeout(() => {
        navigate(`/admin/add-products/add-property-details/${prop}/${propdetails}`);
      }, 1000);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error('Failed to save location. Please try again.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
      if (localityDropdownRef.current && !localityDropdownRef.current.contains(event.target)) {
        setIsLocalityDropdownOpen(false);
      }
      if (subLocalityDropdownRef.current && !subLocalityDropdownRef.current.contains(event.target)) {
        setIsSubLocalityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ErrorMessage = ({ error }) =>
    error ? (
      <div className="flex items-center mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    ) : null;

  return (
    <>
      <Toaster />
      
      <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-10">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-4 sm:mb-6 lg:mb-8 flex flex-col xs:flex-row xs:items-center">
          <span>Where is your property located?</span>
          <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 xs:mt-0 xs:ml-2 sm:ml-4"></div>
        </h3>

        <p className="text-slate-600 mb-6 sm:mb-8">
          An accurate location helps you connect with the right buyers
        </p>

        {/* Auto-detect Location Button */}
        <div className="mb-6 sm:mb-8">
          <button
            type="button"
            onClick={detectLocation}
            disabled={isDetectingLocation}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-xl border-2 border-dashed transition-all duration-300 ${
              isDetectingLocation
                ? "border-blue-300 bg-blue-50 text-blue-600 cursor-not-allowed"
                : "border-blue-400 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:border-blue-500"
            }`}
          >
            {isDetectingLocation ? (
              <>
                <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">Detecting location...</span>
              </>
            ) : (
              <>
                <Crosshair className="w-5 h-5" />
                <span className="font-medium">Pick my location</span>
              </>
            )}
          </button>
        </div>

        {/* City Selection */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">City</h2>
            <span className="text-red-500">*</span>
          </div>
          
          <div className="relative" ref={cityDropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={citySearchTerm}
                onChange={(e) => {
                  setCitySearchTerm(e.target.value);
                  setIsCityDropdownOpen(true);
                  if (errors.selectedCity) {
                    setErrors((prev) => ({ ...prev, selectedCity: "" }));
                  }
                }}
                onFocus={() => setIsCityDropdownOpen(true)}
                placeholder="Search for your city..."
                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 ${
                  errors.selectedCity ? "border-red-300" : "border-slate-200"
                }`}
              />
              
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {selectedCity ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    isCityDropdownOpen ? "rotate-180" : ""
                  }`} />
                )}
              </div>
            </div>

            {/* City Dropdown */}
            {isCityDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{city}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-500 text-center">
                    No cities found matching "{citySearchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
          
          <ErrorMessage error={errors.selectedCity} />
        </div>

        {/* Locality Selection - Now allows free typing */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Locality</h2>
            <span className="text-red-500">*</span>
          </div>
          
          <div className="relative" ref={localityDropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={localitySearchTerm}
                onChange={handleLocalityInputChange}
                onFocus={() => {
                  if (filteredLocalities.length > 0 && localitySearchTerm) {
                    setIsLocalityDropdownOpen(true);
                  }
                }}
                placeholder="Type your locality name..."
                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 ${
                  errors.selectedLocality ? "border-red-300" : "border-slate-200"
                }`}
              />
              
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {selectedLocality && selectedLocality.trim() ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    isLocalityDropdownOpen ? "rotate-180" : ""
                  }`} />
                )}
              </div>
            </div>

            {/* Locality Dropdown - Only shows if there are suggestions */}
            {isLocalityDropdownOpen && filteredLocalities.length > 0 && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                <div className="px-3 py-2 text-xs text-slate-500 border-b border-slate-100">
                  Suggestions (you can also type your own)
                </div>
                {filteredLocalities.map((locality) => (
                  <button
                    key={locality}
                    onClick={() => handleLocalitySelect(locality)}
                    className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{locality}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <ErrorMessage error={errors.selectedLocality} />
        </div>

        {/* Sub Locality Selection (Optional) */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Sub Locality</h2>
            <span className="text-slate-400 text-sm">(Optional)</span>
          </div>
          
          <div className="relative" ref={subLocalityDropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={subLocalitySearchTerm}
                onChange={(e) => {
                  setSubLocalitySearchTerm(e.target.value);
                  setIsSubLocalityDropdownOpen(true);
                }}
                onFocus={() => setIsSubLocalityDropdownOpen(true)}
                placeholder="Search for sub locality..."
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 border-slate-200"
              />
              
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {selectedSubLocality ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    isSubLocalityDropdownOpen ? "rotate-180" : ""
                  }`} />
                )}
              </div>
            </div>

            {/* Sub Locality Dropdown */}
            {isSubLocalityDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {filteredSubLocalities.length > 0 ? (
                  filteredSubLocalities.map((subLocality) => (
                    <button
                      key={subLocality}
                      onClick={() => handleSubLocalitySelect(subLocality)}
                      className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{subLocality}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-500 text-center">
                    No sub localities found matching "{subLocalitySearchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Apartment/Society */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">Apartment/Society</h2>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={apartmentSociety}
              onChange={(e) => {
                setApartmentSociety(e.target.value);
                if (errors.apartmentSociety) {
                  setErrors((prev) => ({ ...prev, apartmentSociety: "" }));
                }
              }}
              placeholder="Enter apartment or society name..."
              className={`w-full px-4 py-3 pl-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 ${
                errors.apartmentSociety ? "border-red-300" : "border-slate-200"
              }`}
            />
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
          <ErrorMessage error={errors.apartmentSociety} />
        </div>

        {/* House No (Optional) */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">
                {propdetails === "Plot" ? "Plot No" : "Flat No"}
              </h2>
            <span className="text-slate-400 text-sm">(Optional)</span>
          </div>
          <div className="relative">
            <input
              type="text"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              placeholder="Enter house/flat number..."
              className="w-full px-4 py-3 pl-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 border-slate-200"
            />
            <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* Location Summary */}
        {(selectedCity || selectedLocality || apartmentSociety) && (
          <div className="mb-6 sm:mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-green-800 font-medium mb-2">Location Summary:</h3>
            <div className="text-green-700 text-sm space-y-1">
              {selectedCity && <div>City: {selectedCity}</div>}
              {selectedLocality && <div>Locality: {selectedLocality}</div>}
              {selectedSubLocality && <div>Sub Locality: {selectedSubLocality}</div>}
              {apartmentSociety && <div>Apartment/Society: {apartmentSociety}</div>}
              {houseNo && <div>House No: {houseNo}</div>}
              {userLocation && (
                <div className="text-xs text-green-600 mt-2">
                  GPS Coordinates: {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-slate-200">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/25 ${
              isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Location"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ResidentialLocation;
