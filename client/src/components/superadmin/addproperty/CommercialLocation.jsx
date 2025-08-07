import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Crosshair,
  AlertCircle,
  ChevronDown,
  Check,
  Building,
  Home,
  Hash,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const CommercialLocation = ({ prop,propdetails }) => {
  // Location states
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");
  const [selectedSubLocality, setSelectedSubLocality] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedCommercialProject, setSelectedCommercialProject] = useState("");
  const [address, setAddress] = useState("");
  const [projectNo, setProjectNo] = useState("");
  const [apartmentSociety, setApartmentSociety] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [locatedInside, setLocatedInside] = useState("");
  const [zoneType, setZoneType] = useState("");

  // Search states
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [localitySearchTerm, setLocalitySearchTerm] = useState("");
  const [subLocalitySearchTerm, setSubLocalitySearchTerm] = useState("");
  const [projectSearchTerm, setProjectSearchTerm] = useState("");
  const [commercialProjectSearchTerm, setCommercialProjectSearchTerm] = useState("");

  // Dropdown states
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isLocalityDropdownOpen, setIsLocalityDropdownOpen] = useState(false);
  const [isSubLocalityDropdownOpen, setIsSubLocalityDropdownOpen] = useState(false);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isCommercialProjectDropdownOpen, setIsCommercialProjectDropdownOpen] = useState(false);

  // Loading and error states
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for dropdowns
  const cityDropdownRef = useRef(null);
  const localityDropdownRef = useRef(null);
  const subLocalityDropdownRef = useRef(null);
  const projectDropdownRef = useRef(null);
  const commercialProjectDropdownRef = useRef(null);

  console.log("CommercialLocation propdetails:", propdetails);

  // Major Indian cities
  const indianCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Surat",
    "Pune",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Ludhiana",
    "Agra",
    "Nashik",
    "Faridabad",
    "Meerut",
    "Rajkot",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Varanasi",
    "Srinagar",
    "Aurangabad",
    "Dhanbad",
    "Amritsar",
    "Navi Mumbai",
    "Allahabad",
    "Ranchi",
    "Howrah",
    "Coimbatore",
    "Jabalpur",
    "Gwalior",
    "Vijayawada",
    "Jodhpur",
    "Madurai",
    "Raipur",
    "Kota",
    "Guwahati",
    "Chandigarh",
    "Solapur",
    "Hubli-Dharwad",
    "Tiruchirappalli",
    "Bareilly",
    "Mysore",
    "Tiruppur",
    "Gurgaon",
    "Aligarh",
    "Jalandhar",
    "Bhubaneswar",
    "Salem",
    "Warangal",
    "Guntur",
    "Bhiwandi",
    "Saharanpur",
    "Gorakhpur",
    "Bikaner",
    "Amravati",
    "Noida",
    "Jamshedpur",
    "Bhilai",
    "Cuttack",
    "Firozabad",
    "Kochi",
    "Nellore",
    "Bhavnagar",
    "Dehradun",
    "Durgapur",
    "Asansol",
    "Rourkela",
    "Nanded",
    "Kolhapur",
    "Ajmer",
    "Akola",
    "Gulbarga",
    "Jamnagar",
    "Ujjain",
    "Loni",
    "Siliguri",
    "Jhansi",
    "Ulhasnagar",
    "Jammu",
    "Sangli-Miraj & Kupwad",
    "Mangalore",
    "Erode",
    "Belgaum",
    "Ambattur",
    "Tirunelveli",
    "Malegaon",
    "Gaya",
    "Jalgaon",
    "Udaipur",
  ];

  // Sample localities based on selected city
  const sampleLocalities = {
    Mumbai: [
      "Andheri East",
      "Andheri West",
      "Bandra East",
      "Bandra West",
      "Borivali East",
      "Borivali West",
      "Malad East",
      "Malad West",
      "Powai",
      "Lower Parel",
      "Worli",
      "Juhu",
      "Santacruz East",
      "Santacruz West",
    ],
    Delhi: [
      "Connaught Place",
      "Karol Bagh",
      "Lajpat Nagar",
      "Dwarka",
      "Rohini",
      "Janakpuri",
      "Saket",
      "Vasant Kunj",
      "Greater Kailash",
      "South Extension",
    ],
    Bangalore: [
      "Koramangala",
      "Indiranagar",
      "Whitefield",
      "Electronic City",
      "HSR Layout",
      "BTM Layout",
      "Jayanagar",
      "Rajajinagar",
      "Malleshwaram",
      "Hebbal",
    ],
    Pune: [
      "Hinjewadi",
      "Kothrud",
      "Viman Nagar",
      "Aundh",
      "Baner",
      "Wakad",
      "Hadapsar",
      "Kharadi",
      "Magarpatta",
      "Kalyani Nagar",
    ],
  };

  // Sample sub-localities
  const sampleSubLocalities = [
    "Sector 1",
    "Sector 2",
    "Sector 3",
    "Phase 1",
    "Phase 2",
    "Phase 3",
    "Block A",
    "Block B",
    "Block C",
    "Block D",
    "Main Road",
    "Cross Road",
    "Market Area",
    "Residential Area",
    "Commercial Area",
    "Near Metro Station",
    "Near Hospital",
    "Near School",
    "Near Mall",
  ];

  // Sample commercial projects
  const sampleProjects = [
    "World Trade Center",
    "Cyber Hub",
    "Tech Park Plaza",
    "Business Bay Complex",
    "Corporate Heights",
    "Commercial Plaza",
    "IT Tech Tower",
    "Business Square",
    "Metro Mall Complex",
    "City Center",
    "Corporate Tower",
    "Trade Center",
    "Phoenix Market City",
    "Palladium Mall",
    "Select City Walk",
    "DLF Mall",
    "Express Avenue",
    "Forum Mall",
    "Nexus Mall",
    "VR Mall",
    "Orion Mall",
    "Mantri Square",
    "UB City Mall",
    "1 MG Mall",
    "Brigade Gateway",
    "Brookefield Mall",
    "Phoenix Mills",
    "High Street Phoenix",
    "Palladium Mall",
    "R City Mall",
    "Growels 101 Mall",
    "Inorbit Mall",
    "Oberoi Mall",
  ];

  // Commercial projects specific for second dropdown
  const commercialProjects = [
    "DLF Cyber City",
    "Prestige Tech Park",
    "Embassy Tech Village",
    "Manyata Tech Park",
    "RMZ Infinity",
    "Bagmane Tech Park",
    "Cessna Business Park",
    "Global Village Tech Park",
    "International Tech Park",
    "Vaswani Menlo Park",
    "ASF Insignia",
    "Unitech Cyber Park",
    "Spaze i-Tech Park",
    "JMD Megapolis",
    "Emaar Business Park",
    "Logix Cyber Park",
    "Wave Silver Tower",
    "Candor TechSpace",
    "WeWork Space",
    "CoWorks Space",
    "Smart Works",
    "Awfis Space",
    "91springboard",
    "Innov8 Coworking",
    "MyHQ Workspace"
  ];

  // Filter functions
  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  const filteredLocalities =
    selectedCity && sampleLocalities[selectedCity]
      ? sampleLocalities[selectedCity].filter((locality) =>
          locality.toLowerCase().includes(localitySearchTerm.toLowerCase())
        )
      : [];

  const filteredSubLocalities = sampleSubLocalities.filter((subLocality) =>
    subLocality.toLowerCase().includes(subLocalitySearchTerm.toLowerCase())
  );

  const filteredProjects = sampleProjects.filter((project) =>
    project.toLowerCase().includes(projectSearchTerm.toLowerCase())
  );

  const filteredCommercialProjects = commercialProjects.filter((project) =>
    project.toLowerCase().includes(commercialProjectSearchTerm.toLowerCase())
  );

  // Location detection function
  const detectLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      return;
    }

    setIsDetectingLocation(true);
    const loadingToast = toast.loading("Detecting your location...", {
      position: "top-center",
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
            console.log("Location data:", data);

            if (data && data.address) {
              const address = data.address;

              // Extract location details
              const detectedCity =
                address.city ||
                address.town ||
                address.state_district ||
                address.state;
              const detectedLocality =
                address.suburb || address.neighbourhood || address.village;
              const detectedSubLocality =
                address.residential || address.quarter;

              // Update form fields
              if (detectedCity) {
                const matchedCity = indianCities.find((city) =>
                  city.toLowerCase().includes(detectedCity.toLowerCase())
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

              // Set the full address from detected location
              if (data.display_name) {
                setAddress(data.display_name);
              }

              toast.dismiss(loadingToast);
              toast.success("Location detected successfully!", {
                duration: 3000,
                position: "top-center",
              });

              setErrors({});
            } else {
              throw new Error("Could not determine location details");
            }
          } else {
            throw new Error("Failed to fetch location details");
          }
        } catch (error) {
          console.error("Error getting location details:", error);
          toast.dismiss(loadingToast);
          toast.error(
            "Could not determine address from your location. Please enter manually."
          );
          setUserLocation({ latitude, longitude });
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.dismiss(loadingToast);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            toast.error(
              "Location access denied. Please enable location permissions."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            toast.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            toast.error("Location request timed out.");
            break;
          default:
            toast.error("An unknown error occurred while detecting location.");
            break;
        }
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000,
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

  const handleLocalitySelect = (locality) => {
    setSelectedLocality(locality);
    setLocalitySearchTerm(locality);
    setIsLocalityDropdownOpen(false);
    if (errors.selectedLocality) {
      setErrors((prev) => ({ ...prev, selectedLocality: "" }));
    }
  };

  const handleSubLocalitySelect = (subLocality) => {
    setSelectedSubLocality(subLocality);
    setSubLocalitySearchTerm(subLocality);
    setIsSubLocalityDropdownOpen(false);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setProjectSearchTerm(project);
    setIsProjectDropdownOpen(false);
  };

  const handleCommercialProjectSelect = (project) => {
    setSelectedCommercialProject(project);
    setCommercialProjectSearchTerm(project);
    setIsCommercialProjectDropdownOpen(false);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!selectedCity) newErrors.selectedCity = "City is required";
    if (!selectedLocality) newErrors.selectedLocality = "Locality is required";
    
    // Conditional validation based on propdetails
    if (propdetails === "Office") {
      if (!locatedInside) newErrors.locatedInside = "Located Inside is required";
      if (!zoneType) newErrors.zoneType = "Zone Type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        toast.error("Please fill in all required fields!", {
          duration: 4000,
          position: "top-center",
        });
        return;
      }

      const loadingToast = toast.loading("Saving location details...", {
        position: "top-center",
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Location saved successfully:", {
        selectedCity,
        selectedLocality,
        selectedSubLocality,
        selectedProject,
        selectedCommercialProject,
        address,
        projectNo,
        apartmentSociety,
        houseNo,
        locatedInside,
        zoneType,
        userLocation,
      });

      toast.dismiss(loadingToast);
      toast.success("Location saved successfully!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to save location. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setIsCityDropdownOpen(false);
      }
      if (
        localityDropdownRef.current &&
        !localityDropdownRef.current.contains(event.target)
      ) {
        setIsLocalityDropdownOpen(false);
      }
      if (
        subLocalityDropdownRef.current &&
        !subLocalityDropdownRef.current.contains(event.target)
      ) {
        setIsSubLocalityDropdownOpen(false);
      }
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target)
      ) {
        setIsProjectDropdownOpen(false);
      }
      if (
        commercialProjectDropdownRef.current &&
        !commercialProjectDropdownRef.current.contains(event.target)
      ) {
        setIsCommercialProjectDropdownOpen(false);
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

        {/* City Selection - Always shown */}
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
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isCityDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
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

        {/* Locality Selection - Always shown */}
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
                onChange={(e) => {
                  setLocalitySearchTerm(e.target.value);
                  setIsLocalityDropdownOpen(true);
                  if (errors.selectedLocality) {
                    setErrors((prev) => ({ ...prev, selectedLocality: "" }));
                  }
                }}
                onFocus={() => setIsLocalityDropdownOpen(true)}
                placeholder={
                  selectedCity ? "Search for locality..." : "Select city first"
                }
                disabled={!selectedCity}
                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 ${
                  !selectedCity ? "bg-slate-100 cursor-not-allowed" : ""
                } ${
                  errors.selectedLocality
                    ? "border-red-300"
                    : "border-slate-200"
                }`}
              />

              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {selectedLocality ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isLocalityDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>
            </div>

            {/* Locality Dropdown */}
            {isLocalityDropdownOpen && selectedCity && (
              <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                {filteredLocalities.length > 0 ? (
                  filteredLocalities.map((locality) => (
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
                  ))
                ) : (
                  <div className="px-4 py-3 text-slate-500 text-center">
                    No localities found matching "{localitySearchTerm}"
                  </div>
                )}
              </div>
            )}
          </div>

          <ErrorMessage error={errors.selectedLocality} />
        </div>

        {/* Sub Locality Selection - Always shown */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 pb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Sub Locality
            </h2>
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
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isSubLocalityDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
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

        {/* Project Selection - Show for Office, Warehouse, Factory */}
        {(propdetails === "Office" || propdetails === "Warehouse" || propdetails === "Factory") && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Project</h2>
              <span className="text-slate-400 text-sm">(Optional)</span>
            </div>

            <div className="relative" ref={projectDropdownRef}>
              <div className="relative">
                <input
                  type="text"
                  value={projectSearchTerm}
                  onChange={(e) => {
                    setProjectSearchTerm(e.target.value);
                    setIsProjectDropdownOpen(true);
                  }}
                  onFocus={() => setIsProjectDropdownOpen(true)}
                  placeholder="Search for commercial project..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 border-slate-200"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {selectedProject ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isProjectDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Project Dropdown */}
              {isProjectDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                      <button
                        key={project}
                        onClick={() => handleProjectSelect(project)}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-slate-400" />
                          <span>{project}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-slate-500 text-center">
                      No projects found matching "{projectSearchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Located Inside - Show only for Office */}
        {propdetails === "Office" && (
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center gap-2 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Located Inside</h2>
              <p className="text-red-500">*</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {["It Park", "Business Park", "Other"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setLocatedInside(option);
                    if (errors.locatedInside) {
                      setErrors((prev) => ({ ...prev, locatedInside: "" }));
                    }
                  }}
                  className={`p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 text-center transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-lg ${
                    locatedInside === option
                      ? "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-lg shadow-purple-500/10"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white/50 hover:bg-white/80"
                  } ${errors.locatedInside ? "border-red-300" : ""}`}
                >
                  <div className="font-semibold text-xs sm:text-sm lg:text-base leading-tight">
                    {option}
                  </div>
                </button>
              ))}
            </div>
            <ErrorMessage error={errors.locatedInside} />
          </div>
        )}

        {/* Zone Type - Show only for Office */}
        {propdetails === "Office" && (
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <div className="flex items-center gap-2 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Zone Type</h2>
              <p className="text-red-500">*</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {["Industrial", "Commercial", "Residential", "Transport and Communication", 
              "Public Utilities", "Public and Semi Public", "Open Spaces", "Agricultural Zone",
              "Special Economic Zone", "Natural Conservation Zone", "Government Use", "Other"
              ].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setZoneType(option);
                    if (errors.zoneType) {
                      setErrors((prev) => ({ ...prev, zoneType: "" }));
                    }
                  }}
                  className={`p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 text-center transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-lg ${
                    zoneType === option
                      ? "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-lg shadow-purple-500/10"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white/50 hover:bg-white/80"
                  } ${errors.zoneType ? "border-red-300" : ""}`}
                >
                  <div className="font-semibold text-xs sm:text-sm lg:text-base leading-tight">
                    {option}
                  </div>
                </button>
              ))}
            </div>
            <ErrorMessage error={errors.zoneType} />
          </div>
        )}

        {/* Commercial Project Selection - Show for Retail Shop & Showroom */}
        {(propdetails === "Retail Shop" || propdetails === "Showroom") && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Commercial Project</h2>
              <span className="text-slate-400 text-sm">(Optional)</span>
            </div>

            <div className="relative" ref={commercialProjectDropdownRef}>
              <div className="relative">
                <input
                  type="text"
                  value={commercialProjectSearchTerm}
                  onChange={(e) => {
                    setCommercialProjectSearchTerm(e.target.value);
                    setIsCommercialProjectDropdownOpen(true);
                  }}
                  onFocus={() => setIsCommercialProjectDropdownOpen(true)}
                  placeholder="Search for commercial project..."
                  className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 border-slate-200"
                />

                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {selectedCommercialProject ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                        isCommercialProjectDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* Commercial Project Dropdown */}
              {isCommercialProjectDropdownOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                  {filteredCommercialProjects.length > 0 ? (
                    filteredCommercialProjects.map((project) => (
                      <button
                        key={project}
                        onClick={() => handleCommercialProjectSelect(project)}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <Building className="w-4 h-4 text-slate-400" />
                          <span>{project}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-slate-500 text-center">
                      No commercial projects found matching "{commercialProjectSearchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Address - Show for Retail Shop, Showroom, Warehouse, Factory */}
        {(propdetails === "Retail Shop" || propdetails === "Showroom" || 
          propdetails === "Warehouse" || propdetails === "Factory") && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Address</h2>
              <span className="text-slate-400 text-sm">(Optional)</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete address or additional details..."
                className="w-full px-4 py-3 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 border-slate-200 resize-none"
              />
              <div className="absolute bottom-3 right-3">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <p className="text-slate-500 text-sm mt-2">
              Provide complete address, landmark, or any additional location details
            </p>
          </div>
        )}

        {/* Project No. - Show only for Plot */}
        {propdetails === "Plot" && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-2 pb-4">
              <h2 className="text-lg font-semibold text-slate-800">Project No.</h2>
              <span className="text-slate-400 text-sm">(Optional)</span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={projectNo}
                onChange={(e) => setProjectNo(e.target.value)}
                placeholder="Enter project number (e.g., P-101)"
                className="w-full px-4 py-3 pr-12 rounded-lg border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 border-slate-200"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Hash className="w-5 h-5 text-slate-400" />
              </div>
            </div>
            
            <p className="text-slate-500 text-sm mt-2">
              Enter specific project number
            </p>
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

export default CommercialLocation;
