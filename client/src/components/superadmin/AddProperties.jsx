import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Plus,
  Search,
  AlertCircle,
} from "lucide-react";
import { Outlet } from "react-router-dom";

const AddProperties = () => {
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
    if (!selectedCity) newErrors.selectedCity = "City selection is required";
    if (!apartmentName.trim())
      newErrors.apartmentName = "Apartment/Property name is required";
    if (!detailedPropertyType)
      newErrors.detailedPropertyType = "Detailed property type is required";
    if (!bhkType) newErrors.bhkType = "BHK selection is required";
    if (!builtUpArea || builtUpArea <= 0)
      newErrors.builtUpArea = "Built up area is required";
    if (!coveredArea || coveredArea <= 0)
      newErrors.coveredArea = "Covered area is required";
    if (!propertyAge || propertyAge < 0)
      newErrors.propertyAge = "Property age is required";
    if (!bathroomCount) newErrors.bathroomCount = "Bathroom count is required";
    if (balconyCount === "")
      newErrors.balconyCount = "Balcony count is required";
    if (!furnishType) newErrors.furnishType = "Furnish type is required";
    if (coveredParking === "")
      newErrors.coveredParking = "Covered parking info is required";
    if (openParking === "")
      newErrors.openParking = "Covered parking info is required";
    if (!propertyManagedBy)
      newErrors.propertyManagedBy = "Property management info is required";
    if (!managerStaysAtProperty)
      newErrors.managerStaysAtProperty = "Manager residence info is required";
    if (!floorNumber)
      newErrors.floorNumber = "Manager residence info is required";

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
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted successfully:", {
        propertyType,
        lookingTo,
        selectedCity,
        apartmentName,
        detailedPropertyType,
        bhkType,
        builtUpArea,
        coveredArea,
        propertyAge,
        bathroomCount,
        balconyCount,
        furnishType,
        coveredParking,
        propertyManagedBy,
        managerStaysAtProperty,
        selectedRooms,
      });

      // Reset form or navigate to next step
      alert("Property details saved successfully!");
    } catch (error) {
      console.error("Submission error:", error);
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

  const toggleRoom = (room) => {
    try {
      setSelectedRooms((prev) =>
        prev.includes(room) ? prev.filter((r) => r !== room) : [...prev, room]
      );
    } catch (error) {
      console.error("Error toggling room:", error);
    }
  };

  const StepItem = ({ step, isActive }) => (
    <div className="flex items-center mb-6 group">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${isActive
          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
          }`}
      >
        {step.id}
      </div>
      <div className="flex-1">
        <div
          className={`font-semibold transition-colors ${isActive
            ? "text-slate-900"
            : "text-slate-600 group-hover:text-slate-700"
            }`}
        >
          {step.title}
        </div>
        <div className="text-sm text-slate-400 flex items-center mt-1">
          {step.status === "in-progress" && (
            <>
              <span className="text-blue-500 font-medium">In progress</span>
              {step.progress && (
                <div className="ml-3 flex items-center">
                  <div className="w-20 h-2 bg-slate-200 rounded-full mr-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${step.progress * 10}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {step.progress}%
                  </span>
                </div>
              )}
            </>
          )}
          {step.status === "pending" && (
            <span className="text-slate-400">Pending</span>
          )}
          {step.score && (
            <span className="ml-2 text-emerald-500 text-xs font-semibold bg-emerald-50 px-2 py-1 rounded-full">
              Score {step.score}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const ErrorMessage = ({ error }) =>
    error ? (
      <div className="flex items-center mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-12">
        {/* Mobile Header */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
            <button className="flex items-center text-slate-600 hover:text-slate-800 mb-4 sm:mb-6 transition-colors group">
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
              <span className="text-sm sm:text-base">Return to dashboard</span>
            </button>

            <div className="mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                Post your property
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Sell or rent your property with ease
              </p>
            </div>

            {/* Horizontal Steps for Mobile */}
            <div className="overflow-x-auto pb-2 -mx-1">
              <div className="flex space-x-2 sm:space-x-4 min-w-max px-1">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm transition-all duration-300 ${index === 0
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                        : "bg-slate-100 text-slate-500"
                        }`}
                    >
                      {step.id}
                    </div>
                    <div className="mt-1 sm:mt-2 text-center max-w-[60px] sm:max-w-[80px]">
                      <div
                        className={`text-xs font-medium leading-tight ${index === 0 ? "text-slate-900" : "text-slate-600"
                          }`}
                      >
                        {step.title.split(" ")[0]}
                        <br className="sm:hidden" />
                        <span className="hidden sm:inline"> </span>
                        {step.title.split(" ").slice(1).join(" ")}
                      </div>
                      {step.status === "in-progress" && step.progress && (
                        <div className="mt-1">
                          <div className="w-full h-0.5 sm:h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-0.5 sm:h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
                              style={{ width: `${step.progress * 10}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">
                            {step.progress}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 sticky top-6">
              <button className="flex items-center text-slate-600 hover:text-slate-800 mb-8 transition-colors group">
                <ChevronLeft className="w-5 h-5 mr-2 group-hover:translate-x-[-2px] transition-transform" />
                Return to dashboard
              </button>

              <div className="mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Post your property
                </h2>
                <p className="text-slate-600">
                  Sell or rent your property with ease
                </p>
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <StepItem key={step.id} step={step} isActive={index === 0} />
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8 h-[650px] overflow-y-scroll">
           {<Outlet/>}
          </div>
        </div>
      </div>

      {/* Furnishings and Amenities Modal */}
      {isFurnishingsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">
                Add property furnishings and amenities
              </h2>
              <button
                onClick={() => setIsFurnishingsModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Flat Furnishings Section */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Flat Furnishings
                  </h3>
                  <span className="text-sm text-slate-500">
                    {getSelectedFurnishingsCount()} selected
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  {flatFurnishings.map((furnishing) => (
                    <div
                      key={furnishing.name}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                          <span className="text-xl">{furnishing.icon}</span>
                        </div>
                        <h4 className="text-sm font-medium text-slate-700 mb-3">
                          {furnishing.name}
                        </h4>

                        {furnishing.type === "single" ? (
                          <button
                            onClick={() => handleFurnishingToggle(furnishing)}
                            className={`w-full py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${selectedFurnishings[furnishing.name]
                              ? "border-purple-300 bg-purple-50 text-purple-700"
                              : "border-slate-200 text-slate-600 hover:border-slate-300"
                              }`}
                          >
                            {selectedFurnishings[furnishing.name]
                              ? "Selected"
                              : "Select"}
                          </button>
                        ) : (
                          <div className="flex items-center justify-center w-full">
                            <button
                              onClick={() =>
                                handleFurnishingCounter(
                                  furnishing.name,
                                  "decrement"
                                )
                              }
                              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                            >
                              <span className="text-lg font-bold text-slate-600">
                                −
                              </span>
                            </button>
                            <span className="mx-4 text-lg font-semibold text-slate-700 min-w-[2rem] text-center">
                              {selectedFurnishings[furnishing.name] || 0}
                            </span>
                            <button
                              onClick={() =>
                                handleFurnishingCounter(
                                  furnishing.name,
                                  "increment"
                                )
                              }
                              className="w-8 h-8 rounded-lg border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                            >
                              <span className="text-lg font-bold text-slate-600">
                                +
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Society Amenities Section */}
              <div className="p-6 border-t border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Society Amenities
                  </h3>
                  <span className="text-sm text-slate-500">
                    {getSelectedAmenitiesCount()} selected
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  {societyAmenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-3">
                          <span className="text-xl">{amenity.icon}</span>
                        </div>
                        <h4 className="text-sm font-medium text-slate-700 mb-3">
                          {amenity.name}
                        </h4>
                        <button
                          onClick={() => handleAmenityToggle(amenity)}
                          className={`w-full py-2 px-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${selectedAmenities.includes(amenity.name)
                            ? "border-purple-300 bg-purple-50 text-purple-700"
                            : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                        >
                          {selectedAmenities.includes(amenity.name)
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setIsFurnishingsModalOpen(false)}
                className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsFurnishingsModalOpen(false)}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProperties;
