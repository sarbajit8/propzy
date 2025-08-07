import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Plus,
  Search,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
const AddBasicDetails = () => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [propertyManagedBy, setPropertyManagedBy] = useState("");
  const [lookingTo, setLookingTo] = useState("");
  const [managerStaysAtProperty, setManagerStaysAtProperty] = useState("");
  const [checkBrokerage, setCheckBrokerage] = useState("");
  const [floorNumber, setFloorNumber] = useState("");


  // City selection states
  const [selectedCity, setSelectedCity] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [apartmentName, setApartmentName] = useState("");

  // Detailed property selection states
  const [detailedPropertyType, setDetailedPropertyType] = useState("");
  const [bhkType, setBhkType] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [coveredArea, setCoveredArea] = useState("");


  const [propertyAge, setPropertyAge] = useState("");
  const [bathroomCount, setBathroomCount] = useState("");
  const [balconyCount, setBalconyCount] = useState("");
  const [furnishType, setFurnishType] = useState("");
  const [coveredParking, setCoveredParking] = useState("");
  const [openParking, setOpenParking] = useState("");

  // Furnishings and Amenities states
  const [isFurnishingsModalOpen, setIsFurnishingsModalOpen] = useState(false);
  const [selectedFurnishings, setSelectedFurnishings] = useState({});
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Error handling states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cityInputRef = useRef(null);
  const dropdownRef = useRef(null);

// Add this useEffect after your existing useEffect
useEffect(() => {
  // Clear PG selection if property type changes to Commercial
  if (propertyType === "Commercial" && lookingTo === "PG") {
    setLookingTo("");
    // Also clear any related errors
    if (errors.lookingTo) {
      setErrors((prev) => ({ ...prev, lookingTo: "" }));
    }
  }
}, [propertyType, lookingTo]); // Add lookingTo to dependencies


    const navigate = useNavigate();
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

  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  // Furnishings data
  const flatFurnishings = [
    { name: "Dining Table", icon: "🍽️", type: "single" },
    { name: "Washing Machine", icon: "🧺", type: "single" },
    { name: "Cupboard", icon: "🗄️", type: "single" },
    { name: "Sofa", icon: "🛋️", type: "single" },
    { name: "Microwave", icon: "📺", type: "single" },
    { name: "Stove", icon: "🔥", type: "single" },
    { name: "Fridge", icon: "❄️", type: "single" },
    { name: "Water Purifier", icon: "💧", type: "single" },
    { name: "Gas Pipeline", icon: "⛽", type: "single" },
    { name: "Chimney", icon: "🏠", type: "single" },
    { name: "Modular Kitchen", icon: "🍳", type: "single" },
    { name: "Fan", icon: "🌀", type: "counter" },
    { name: "Light", icon: "💡", type: "counter" },
    { name: "AC", icon: "❄️", type: "counter" },
    { name: "Wardrobe", icon: "👔", type: "counter" },
    { name: "TV", icon: "📺", type: "counter" },
    { name: "Bed", icon: "🛏️", type: "counter" },
    { name: "Geyser", icon: "🚿", type: "counter" },
  ];

  const societyAmenities = [
    { name: "Gym", icon: "💪" },
    { name: "Swimming Pool", icon: "🏊" },
    { name: "Clubhouse", icon: "🏢" },
    { name: "Library", icon: "📚" },
    { name: "Security", icon: "🛡️" },
    { name: "Kids Play Area", icon: "🎠" },
    { name: "Garden", icon: "🌳" },
    { name: "Tennis Court", icon: "🎾" },
    { name: "Basketball Court", icon: "🏀" },
    { name: "Jogging Track", icon: "🏃" },
    { name: "Power Backup", icon: "⚡" },
    { name: "Lift", icon: "🛗" },
    { name: "CCTV", icon: "📹" },
    { name: "Intercom", icon: "📞" },
    { name: "Fire Safety", icon: "🚨" },
  ];

  // Handle furnishing selection
  const handleFurnishingToggle = (furnishing) => {
    if (furnishing.type === "single") {
      setSelectedFurnishings((prev) => ({
        ...prev,
        [furnishing.name]: prev[furnishing.name] ? false : true,
      }));
    } else {
      // For counter type, we'll handle increment/decrement separately
    }
  };

  const handleFurnishingCounter = (furnishingName, action) => {
    setSelectedFurnishings((prev) => {
      const currentCount = prev[furnishingName] || 0;
      const newCount =
        action === "increment"
          ? currentCount + 1
          : Math.max(0, currentCount - 1);
      return {
        ...prev,
        [furnishingName]: newCount,
      };
    });
  };

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity.name)
        ? prev.filter((a) => a !== amenity.name)
        : [...prev, amenity.name]
    );
  };

  const getSelectedFurnishingsCount = () => {
    return Object.values(selectedFurnishings).filter(
      (value) => value > 0 || value === true
    ).length;
  };

  const getSelectedAmenitiesCount = () => selectedAmenities.length;

  // Error validation
  const validateForm = () => {
    const newErrors = {};

    if (!propertyType) newErrors.propertyType = "Property type is required";
    if (!lookingTo) newErrors.lookingTo = "Looking to option is required";
   
    if (!apartmentName.trim())
      newErrors.apartmentName = "Apartment/Property name is required";
    if (!detailedPropertyType)
      newErrors.detailedPropertyType = "Detailed property type is required";
   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle city selection
  const handleCitySelect = (city) => {
    try {
      setSelectedCity(city);
      setCitySearchTerm(city);
      setIsCityDropdownOpen(false);
      // Clear city error when selected
      if (errors.selectedCity) {
        setErrors((prev) => ({ ...prev, selectedCity: "" }));
      }
    } catch (error) {
      console.error("Error selecting city:", error);
      setErrors((prev) => ({
        ...prev,
        selectedCity: "Error selecting city. Please try again.",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      if (!validateForm()) {
        setIsSubmitting(false);
        // Show error toast for validation failures
        toast.error('Please fill in all required fields!', {
          duration: 4000,
          position: 'top-center',
        });
        return;
      }

      // Show loading toast
      const loadingToast = toast.loading('Saving property details...', {
        position: 'top-center',
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted successfully:", {
        propertyType,
        lookingTo,
        apartmentName,
        detailedPropertyType,
      });

      // Dismiss loading toast and show success toast
      toast.dismiss(loadingToast);
      toast.success('Property details saved successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#10B981',
          color: '#fff',
        },
      });

      // Navigate after a short delay to let user see the success message
      setTimeout(() => {
        navigate(`/admin/add-products/add-location/${propertyType}/${detailedPropertyType}`);
      }, 1000);

    } catch (error) {
      console.error("Submission error:", error);
      
      // Show error toast
      toast.error('Failed to save property details. Please try again.', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      });
      
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to save property details. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const steps = [
    { id: 1, title: "Property Details", status: "in-progress", progress: 3 },
    { id: 2, title: "Room Details", status: "pending" },
    { id: 3, title: "Amenities", status: "pending" },
    { id: 4, title: "Other Details", status: "pending" },
    { id: 5, title: "Photos", status: "pending", score: "+15%" },
    { id: 6, title: "Review", status: "pending" },
  ];

  const commonAreas = [
    "Living Room",
    "Kitchen",
    "Dining Hall",
    "Study Room / Library",
    "Breakout Room",
  ];



  const ErrorMessage = ({ error }) =>
    error ? (
      <div className="flex items-center mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    ) : null;

  return (        
            <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-10">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-4 sm:mb-6 lg:mb-8 flex flex-col xs:flex-row xs:items-center">
                <span>Add Property Details</span>
                <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 xs:mt-0 xs:ml-2 sm:ml-4"></div>
              </h3>

              {/* Display submission error */}
              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center text-red-800">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    {errors.submit}
                  </div>
                </div>
              )}

              {/* APARTMENT/PROPERTY NAME */}
              <div className="mb-6 sm:mb-8 lg:mb-10">
                <div className="flex items-center gap-2 pb-4">
                  <h1>Apartment/Property Name</h1>
                  <p className="text-red-500">*</p>
                </div>
                <input
                  type="text"
                  value={apartmentName}
                  onChange={(e) => {
                    setApartmentName(e.target.value);
                    if (errors.apartmentName) {
                      setErrors((prev) => ({ ...prev, apartmentName: "" }));
                    }
                  }}
                  placeholder="Enter apartment or property name..."
                  className={`w-full px-4 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 bg-white/50 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-300 focus:bg-white transition-all duration-300 ${errors.apartmentName ? "border-red-300" : "border-slate-200"
                    }`}
                />
                <ErrorMessage error={errors.apartmentName} />
              </div>

             {/* PROPERTY TYPE */}
<div className="mb-6 sm:mb-8 lg:mb-10">
  <div className="flex items-center gap-2 pb-4">
    <h1>Property Type</h1>
    <p className="text-red-500">*</p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
    {["Residential", "Commercial"].map((option) => (
      <button
        key={option}
        onClick={() => {
          setPropertyType(option);
          
          // Clear PG selection if Commercial is selected
          if (option === "Commercial" && lookingTo === "PG") {
            setLookingTo("");
          }
          
          if (errors.propertyType) {
            setErrors((prev) => ({ ...prev, propertyType: "" }));
          }
        }}
        className={`p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 text-center transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-lg ${
          propertyType === option
            ? "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-lg shadow-purple-500/10"
            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white/50 hover:bg-white/80"
        } ${errors.propertyType ? "border-red-300" : ""}`}
      >
        <div className="font-semibold text-xs sm:text-sm lg:text-base leading-tight">
          {option}
        </div>
      </button>
    ))}
  </div>
  <ErrorMessage error={errors.propertyType} />
</div>


            {/* LOOKING TO */}
<div className="mb-6 sm:mb-8 lg:mb-10">
  <div className="flex items-center gap-2 pb-4">
    <h1>Looking To</h1>
    <p className="text-red-500">*</p>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
    {["Sell", "Rent/lease", "PG"]
      .filter(option => {
        // Hide PG option if property type is Commercial
        if (option === "PG" && propertyType === "Commercial") {
          return false;
        }
        return true;
      })
      .map((option) => (
        <button
          key={option}
          onClick={() => {
            setLookingTo(option);
            if (errors.lookingTo) {
              setErrors((prev) => ({ ...prev, lookingTo: "" }));
            }
          }}
          className={`p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl border-2 text-center transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-lg ${
            lookingTo === option
              ? "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-lg shadow-purple-500/10"
              : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white/50 hover:bg-white/80"
          } ${errors.lookingTo ? "border-red-300" : ""}`}
        >
          <div className="font-semibold text-xs sm:text-sm lg:text-base leading-tight">
            {option}
          </div>
        </button>
      ))}
  </div>
  <ErrorMessage error={errors.lookingTo} />
</div>


        


              {/* DETAILED PROPERTY TYPE - Only show for Residential */}
             {propertyType === "Residential" && (
  <div className="mb-6 sm:mb-8 lg:mb-10">
    <div className="flex items-center gap-2 pb-4">
      <h1>Property Type</h1>
      <p className="text-red-500">*</p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {[
        { name: "Apartment" },
        { name: "Independent House or Villa" },
       
        { name: "Independent Floor" },
        { name: "Plot" },
        { name: "Penthouse" },
        { name: "Studio" },
        { name: "Farm House" },
         { name: "Other" },


      ].filter(type => {
        // Show all property types if Looking To is "Sell"
        if (lookingTo === "Sell") {
          return true;
        }
        
        // For other options (Rent/lease, PG), apply specific filters
        if (lookingTo === "PG") {
          // For PG, exclude Land/Plot, Farm House, Studio, other
          return !["Land/Plot", "Farm House", "Studio"].includes(type.name);
        }
        
        if (lookingTo === "Rent/lease") {
          // For Rent/lease, exclude Land/Plot
          return type.name !== "Land/Plot";
        }
        
        // Default: show all
        return true;
      }).map((type) => (
        <button
          key={type.name}
          onClick={() => {
            setDetailedPropertyType(type.name);
            if (errors.detailedPropertyType) {
              setErrors((prev) => ({
                ...prev,
                detailedPropertyType: "",
              }));
            }
          }}
          className={`p-3 sm:p-4 rounded-lg border-2 text-center transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px] ${
            detailedPropertyType === type.name
              ? "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-lg shadow-purple-500/10"
              : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white/50 hover:bg-white/80"
          } ${errors.detailedPropertyType ? "border-red-300" : ""}`}
        >
          <div className="font-semibold text-xs sm:text-sm leading-tight text-center">
            {type.name}
          </div>
        </button>
      ))}
    </div>

    <ErrorMessage error={errors.detailedPropertyType} />
  </div>
)}


              {/* DETAILED PROPERTY TYPE - Only show for commertial */}
              {propertyType === "Commercial" && (
                <div className="mb-6 sm:mb-8 lg:mb-10">
                  <div className="flex items-center gap-2 pb-4">
                    <h1>Property Type</h1>
                    <p className="text-red-500">*</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { name: "Office" },
                      { name: "Retail Shop" },
                      { name: "Warehouse" },
                      { name: "Factory" },
                      { name: "Plot" },
                      { name: "Showroom" },
                       { name: "other" },


                    ].filter(type => {
                      // Hide Land/Plot if Looking To is Rent/lease or PG
                      if (type.name === "Land/Plot" && (lookingTo === "Rent/lease" || lookingTo === "PG")) {
                        return false;
                      }
                      return true;
                    }).map((type) => (
                      <button
                        key={type.name}
                        onClick={() => {
                          setDetailedPropertyType(type.name);
                          if (errors.detailedPropertyType) {
                            setErrors((prev) => ({
                              ...prev,
                              detailedPropertyType: "",
                            }));
                          }
                        }}
                        className={`p-3 sm:p-4 rounded-lg border-2 text-center transition-all duration-300 transform active:scale-95 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px] ${detailedPropertyType === type.name
                          ? "border-purple-300 bg-gradient-to-br from-purple-50 to-blue-50 text-purple-700 shadow-lg shadow-purple-500/10"
                          : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white/50 hover:bg-white/80"
                          } ${errors.detailedPropertyType ? "border-red-300" : ""}`}
                      >
                        <div className="font-semibold text-xs sm:text-sm leading-tight text-center">
                          {type.name}
                        </div>
                      </button>
                    ))}
                  </div>

                  <ErrorMessage error={errors.detailedPropertyType} />
                </div>
              )}





              <div className="border-t border-slate-200 pt-6 sm:pt-8 lg:pt-10">
                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-slate-200">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/25 ${isSubmitting
                      ? "bg-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl"
                      }`}
                  >
                    {isSubmitting ? "Saving..." : "Save & Continue"}
                  </button>
                </div>
              </div>
            </div>
     
  );
};

export default AddBasicDetails;

