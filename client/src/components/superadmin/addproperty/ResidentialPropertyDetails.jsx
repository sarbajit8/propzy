import React, { useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronDown,
  Plus,
  Search,
  AlertCircle,
  Upload,
  X,
  Camera,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ResidentialPropertyDetails = ({prop, propdtl}) => {
const navigate = useNavigate();
  console.log("ResidentialPropertyDetails prop:", prop, "propdtl:", propdtl);

  // Function to determine which sections should be visible
  const getSectionVisibility = () => {
    const visibility = {
      // Show these sections for Apartment, Independent Floor, AND now also for Independent House, Villa, Penthouse, Farm House
      roomDetails: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                   propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                   propdtl === "Penthouse" || propdtl === "Farm House",
      areaDetails: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                   propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                   propdtl === "Penthouse" || propdtl === "Farm House",
      otherRooms: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                  propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                  propdtl === "Penthouse" || propdtl === "Farm House",
      furnishing: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                  propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                  propdtl === "Penthouse" || propdtl === "Farm House",
      reservedParking: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                       propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                       propdtl === "Penthouse" || propdtl === "Farm House",
      floorDetails: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                    propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                    propdtl === "Penthouse" || propdtl === "Farm House",
      availabilityStatus: propdtl === "Apartment" || propdtl === "Independent Floor" || 
                          propdtl === "Independent House or Villa" || propdtl === "Villa" || 
                          propdtl === "Penthouse" || propdtl === "Farm House",
      
      // Plot sections - Show only for Plot
      plotAreaDetails: propdtl === "Plot",
      propertyDimensions: propdtl === "Plot",
      floorsAllowed: propdtl === "Plot",
      boundaryWall: propdtl === "Plot",
      openSides: propdtl === "Plot",
      constructionDone: propdtl === "Plot",
      plotPossessionBy: propdtl === "Plot",
    };
    return visibility;
  };

  const sectionVisibility = getSectionVisibility();

  // All your existing state declarations...
  const [constructionDone, setConstructionDone] = useState("");
  const [constructionTypes, setConstructionTypes] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [propertyManagedBy, setPropertyManagedBy] = useState("");
  const [lookingTo, setLookingTo] = useState("");
  const [managerStaysAtProperty, setManagerStaysAtProperty] = useState("");
  const [checkBrokerage, setCheckBrokerage] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [propertyFloor, setPropertyFloor] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [apartmentName, setApartmentName] = useState("");
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
  const [bedroomCount, setBedroomCount] = useState("");
  const [showBedroomInput, setShowBedroomInput] = useState(false);
  const [showBathroomInput, setShowBathroomInput] = useState(false);
  const [showBalconyInput, setShowBalconyInput] = useState(false);
  const [customBedroomCount, setCustomBedroomCount] = useState("");
  const [customBathroomCount, setCustomBathroomCount] = useState("");
  const [customBalconyCount, setCustomBalconyCount] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [carpetAreaUnit, setCarpetAreaUnit] = useState("sq.ft.");
  const [superBuiltUpArea, setSuperBuiltUpArea] = useState("");
  const [superBuiltUpAreaUnit, setSuperBuiltUpAreaUnit] = useState("sq.ft.");
  const [otherRooms, setOtherRooms] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [furnishingType, setFurnishingType] = useState("");
  const [furnishingCounts, setFurnishingCounts] = useState({
    Light: 0, Fans: 0, AC: 0, TV: 0, Beds: 0, Wardrobe: 0, Geyser: 0,
  });
  const [furnishingItems, setFurnishingItems] = useState({
    Sofa: false, 'Washing Machine': false, Fridge: false, Stove: false,
    Microwave: false, 'Water Purifier': false, Chimney: false,
    'Modular Kitchen': false, Curtains: false, 'Dining Table': false, 'Exhaust Fan': false,
  });
  const [plotArea, setPlotArea] = useState("");
  const [plotAreaUnit, setPlotAreaUnit] = useState("sq.ft.");
  const [plotLength, setPlotLength] = useState("");
  const [plotBreadth, setPlotBreadth] = useState("");
  const [floorsAllowed, setFloorsAllowed] = useState("");
  const [boundaryWall, setBoundaryWall] = useState("");
  const [openSides, setOpenSides] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [possessionBy, setPossessionBy] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper functions...
  const toggleConstructionType = (type) => {
    setConstructionTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const toggleOtherRoom = (room) => {
    setOtherRooms((prev) =>
      prev.includes(room)
        ? prev.filter((r) => r !== room)
        : [...prev, room]
    );
  };

  const handleFurnishingCountChange = (item, action) => {
    setFurnishingCounts(prev => ({
      ...prev,
      [item]: action === 'increment' 
        ? prev[item] + 1 
        : Math.max(0, prev[item] - 1)
    }));
  };

  const handleFurnishingItemToggle = (item) => {
    setFurnishingItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };
const handleSubmit = async () => {
  try {
    setIsSubmitting(true);
    
    // Collect all form data
    const formData = { /* ... */ };
    
    // Navigate to upload-video page
    navigate('/admin/add-products/upload-video', { 
      state: { 
        propertyData: formData,
        propertyType: propdtl 
      } 
    });
    
  } catch (error) {
    // Handle errors
  } finally {
    setIsSubmitting(false);
  }
};

  const availableOtherRooms = [
    "Pooja Room", "Study Room", "Servant Room", "Store Room"
  ];

  const ErrorMessage = ({ error }) =>
    error ? (
      <div className="flex items-center mt-2 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-2" />
        {error}
      </div>
    ) : null;

  return (
    <div className="lg:col-span-8">
      <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-10">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-4 sm:mb-6 lg:mb-8 flex flex-col xs:flex-row xs:items-center">
          <span>Tell us about your property</span>
          <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 xs:mt-0 xs:ml-2 sm:ml-4"></div>
        </h3>

        <div className="space-y-8">
          {/* Room Details Section - Show for Apartment, Independent Floor, Independent House, Villa, Penthouse, Farm House */}
          {sectionVisibility.roomDetails && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-6">Add Room Details</h4>
              
              {/* No. of Bedrooms */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h5 className="text-base font-medium text-slate-700">No. of Bedrooms</h5>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBedroomCount(num.toString())}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-all duration-200 ${
                        bedroomCount === num.toString()
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => setShowBedroomInput(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Add other</span>
                  </button>
                </div>
                <ErrorMessage error={errors.bedroomCount} />
              </div>

              {/* No. of Bathrooms */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <h5 className="text-base font-medium text-slate-700">No. of Bathrooms</h5>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBathroomCount(num.toString())}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-all duration-200 ${
                        bathroomCount === num.toString()
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <ErrorMessage error={errors.bathroomCount} />
              </div>

              {/* Balconies */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <h5 className="text-base font-medium text-slate-700">Balconies</h5>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {[0, 1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBalconyCount(num.toString())}
                      className={`w-12 h-12 rounded-lg border-2 font-medium transition-all duration-200 ${
                        balconyCount === num.toString()
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <ErrorMessage error={errors.balconyCount} />
              </div>
            </div>
          )}

          {/* Area Details Section - Show for all residential property types */}
          {sectionVisibility.areaDetails && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h4 className="text-lg font-semibold text-slate-800">Add Area Details</h4>
              </div>
              <p className="text-sm text-slate-600 mb-6">At least one area type is mandatory</p>

              {/* Carpet Area */}
              <div className="mb-6">
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Carpet Area
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={carpetArea}
                    onChange={(e) => setCarpetArea(e.target.value)}
                    placeholder="Enter area"
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  />
                  <select
                    value={carpetAreaUnit}
                    onChange={(e) => setCarpetAreaUnit(e.target.value)}
                    className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white min-w-[100px]"
                  >
                    <option value="sq.ft.">sq.ft.</option>
                    <option value="sq.m.">sq.m.</option>
                    <option value="sq.yard">sq.yard</option>
                  </select>
                </div>
              </div>

              {/* Built-up Area */}
              <div className="mb-6">
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Built-up Area
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={builtUpArea}
                    onChange={(e) => setBuiltUpArea(e.target.value)}
                    placeholder="Enter area"
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  />
                  <select
                    className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white min-w-[100px]"
                  >
                    <option value="sq.ft.">sq.ft.</option>
                    <option value="sq.m.">sq.m.</option>
                    <option value="sq.yard">sq.yard</option>
                  </select>
                </div>
              </div>

              {/* Super built-up Area */}
              <div className="mb-8">
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Super built-up Area
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={superBuiltUpArea}
                    onChange={(e) => setSuperBuiltUpArea(e.target.value)}
                    placeholder="Enter area"
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  />
                  <select
                    value={superBuiltUpAreaUnit}
                    onChange={(e) => setSuperBuiltUpAreaUnit(e.target.value)}
                    className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white min-w-[100px]"
                  >
                    <option value="sq.ft.">sq.ft.</option>
                    <option value="sq.m.">sq.m.</option>
                    <option value="sq.yard">sq.yard</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Other Rooms Section - Show for all residential property types */}
          {sectionVisibility.otherRooms && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Other rooms</h4>
              <p className="text-sm text-slate-600 mb-6">(Optional)</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {availableOtherRooms.map((room) => (
                  <button
                    key={room}
                    onClick={() => toggleOtherRoom(room)}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 ${
                      otherRooms.includes(room)
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                      otherRooms.includes(room)
                        ? "border-purple-500 bg-purple-500"
                        : "border-slate-300"
                    }`}>
                      {otherRooms.includes(room) && (
                        <Plus className="w-3 h-3 text-white rotate-45" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{room}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Furnishing Section - Show for all residential property types */}
          {sectionVisibility.furnishing && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Furnishing</h4>
              <p className="text-sm text-slate-600 mb-6">(Optional)</p>

              <div className="flex gap-4 mb-8">
                {['Furnished', 'Semi-furnished', 'Un-furnished'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFurnishingType(type)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                      furnishingType === type
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {(furnishingType === 'Furnished' || furnishingType === 'Semi-furnished') && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {Object.entries(furnishingCounts).map(([item, count]) => (
                      <div 
                        key={item} 
                        className="flex flex-col space-y-3 p-3 sm:p-4 border-2 border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 min-h-[120px] sm:min-h-[140px]"
                      >
                        <div className="flex-1 min-h-0">
                          <h6 className="text-sm sm:text-base font-medium text-slate-700 leading-tight break-words">
                            {item}
                          </h6>
                        </div>
                        
                        <div className="flex items-center justify-center">
                          <span className="text-xl sm:text-2xl font-bold text-purple-700 bg-purple-50 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                            {count}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleFurnishingCountChange(item, 'decrement')}
                            disabled={count === 0}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                              count === 0 
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                                : 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300'
                            }`}
                            aria-label={`Decrease ${item} count`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleFurnishingCountChange(item, 'increment')}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-500 text-white hover:bg-purple-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-1"
                            aria-label={`Increase ${item} count`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {Object.entries(furnishingItems).map(([item, isSelected]) => (
                      <div 
                        key={item} 
                        className={`flex items-center gap-3 p-3 sm:p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer hover:shadow-md min-h-[60px] ${
                          isSelected 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                        onClick={() => handleFurnishingItemToggle(item)}
                      >
                        <input
                          type="checkbox"
                          id={item}
                          checked={isSelected}
                          onChange={() => handleFurnishingItemToggle(item)}
                          className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 border-2 border-slate-300 rounded focus:ring-purple-500 focus:ring-2 shrink-0"
                        />
                        <label
                          htmlFor={item}
                          className="text-xs sm:text-sm font-medium text-slate-700 cursor-pointer flex-1 leading-tight break-words"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reserved Parking Section - Show for all residential property types */}
          {sectionVisibility.reservedParking && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Reserved Parking</h4>
              <p className="text-sm text-slate-600 mb-6">(Optional)</p>

              <div className="space-y-6">
                {/* Covered Parking */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-2 border-slate-200 rounded-lg bg-white shadow-sm">
                  <div className="mb-4 sm:mb-0">
                    <h5 className="text-base font-semibold text-slate-700 mb-1">Covered Parking</h5>
                    <p className="text-sm text-slate-500">Protected parking space</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setCoveredParking(Math.max(0, (parseInt(coveredParking) || 0) - 1).toString())}
                        disabled={(parseInt(coveredParking) || 0) === 0}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          (parseInt(coveredParking) || 0) === 0 
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <input
                        type="number"
                        value={coveredParking}
                        onChange={(e) => setCoveredParking(e.target.value)}
                        className="w-16 px-2 py-1 text-center border-2 border-slate-200 rounded"
                        min="0"
                        placeholder="0"
                      />
                      
                      <button
                        onClick={() => setCoveredParking(((parseInt(coveredParking) || 0) + 1).toString())}
                        className="w-8 h-8 rounded-full bg-purple-500 text-white hover:bg-purple-600 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Open Parking */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-2 border-slate-200 rounded-lg bg-white shadow-sm">
                  <div className="mb-4 sm:mb-0">
                    <h5 className="text-base font-semibold text-slate-700 mb-1">Open Parking</h5>
                    <p className="text-sm text-slate-500">Uncovered parking space</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setOpenParking(Math.max(0, (parseInt(openParking) || 0) - 1).toString())}
                        disabled={(parseInt(openParking) || 0) === 0}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          (parseInt(openParking) || 0) === 0 
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                            : 'bg-red-500 text-white hover:bg-red-600'
                        }`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <input
                        type="number"
                        value={openParking}
                        onChange={(e) => setOpenParking(e.target.value)}
                        className="w-16 px-2 py-1 text-center border-2 border-slate-200 rounded"
                        min="0"
                        placeholder="0"
                      />
                      
                      <button
                        onClick={() => setOpenParking(((parseInt(openParking) || 0) + 1).toString())}
                        className="w-8 h-8 rounded-full bg-purple-500 text-white hover:bg-purple-600 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Floor Details Section - Show for all residential property types */}
          {sectionVisibility.floorDetails && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Floor Details</h4>
              <p className="text-sm text-slate-600 mb-6">Total no of floors and your floor details</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Total Floors
                  </label>
                  <input
                    type="number"
                    value={floorNumber}
                    onChange={(e) => setFloorNumber(e.target.value)}
                    placeholder="1"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Property on Floor
                  </label>
                  <select
                    value={propertyFloor}
                    onChange={(e) => setPropertyFloor(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white"
                  >
                    <option value="" disabled>Select floor</option>
                    <option value="ground">Ground Floor</option>
                    <option value="1">1st Floor</option>
                    <option value="2">2nd Floor</option>
                    <option value="3">3rd Floor</option>
                    <option value="4">4th Floor</option>
                    <option value="5+">5+ Floor</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Availability Status Section - Show for all residential property types */}
          {sectionVisibility.availabilityStatus && (
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-6">Availability Status</h4>
              
              <div className="flex gap-4 mb-6">
                {['Ready to move', 'Under construction'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setAvailabilityStatus(status)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                      availabilityStatus === status
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Plot sections remain the same for Plot property type */}
          {sectionVisibility.plotAreaDetails && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h4 className="text-lg font-semibold text-slate-800">Add Area Details</h4>
                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
                  <span className="text-xs text-slate-500">?</span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-6">At least one area type is mandatory</p>

              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Plot Area
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={plotArea}
                    onChange={(e) => setPlotArea(e.target.value)}
                    placeholder="Enter area"
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  />
                  <select
                    value={plotAreaUnit}
                    onChange={(e) => setPlotAreaUnit(e.target.value)}
                    className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white min-w-[100px]"
                  >
                    <option value="sq.ft.">sq.ft.</option>
                    <option value="sq.m.">sq.m.</option>
                    <option value="sq.yard">sq.yard</option>
                    <option value="acre">acre</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* All other plot sections... */}
          
        </div>

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
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              "Save & Continue"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResidentialPropertyDetails;
