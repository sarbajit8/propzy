import React, { useState, useRef } from "react";
import {
  Upload,
  X,
  Plus,
  Minus,
  AlertCircle,
  Info,
  IndianRupee,
  Calculator,
  MapPin,
  Home,
  Calendar,
  Eye,
  EyeOff,
  HelpCircle,
  CheckCircle,
  FileText,
  Percent
} from "lucide-react";

const ProductPricing = ({ prop, propdtl }) => {
  console.log("PropertyPricingPage prop:", prop, "propdtl:", propdtl);

  // Pricing state
  const [ownership, setOwnership] = useState("");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [pricePerSqft, setPricePerSqft] = useState("");
  const [priceInWords, setPriceInWords] = useState("");
  const [allInclusivePrice, setAllInclusivePrice] = useState(false);
  const [taxAndGovtCharges, setTaxAndGovtCharges] = useState(false);
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [chargeBrokerage, setChargeBrokerage] = useState("");
  
  // Property description
  const [propertyDescription, setPropertyDescription] = useState("");
  
  // Additional pricing details
  const [brokerageAmount, setBrokerageAmount] = useState("");
  const [brokerageType, setBrokerageType] = useState("percentage"); // percentage or fixed
  const [tokenAmount, setTokenAmount] = useState("");
  const [maintenanceCharges, setMaintenanceCharges] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [registrationCharges, setRegistrationCharges] = useState("");
  
  // Form validation and submission
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Constants
  const ownershipTypes = [
    { value: "freehold", label: "Freehold", desc: "Complete ownership rights" },
    { value: "leasehold", label: "Leasehold", desc: "Long-term lease agreement" },
    { value: "cooperative", label: "Co-operative Society", desc: "Cooperative housing society" },
    { value: "power-of-attorney", label: "Power of Attorney", desc: "Property held under power of attorney" }
  ];

  const brokerageOptions = [
    { value: "yes", label: "Yes", desc: "I will charge brokerage" },
    { value: "no", label: "No", desc: "No brokerage charges" }
  ];

  // Helper functions
  const formatCurrency = (amount) => {
    if (!amount) return "";
    const num = parseFloat(amount);
    if (isNaN(num)) return "";
    
    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(2)} K`;
    } else {
      return `₹${num.toLocaleString('en-IN')}`;
    }
  };

  const numberToWords = (num) => {
    if (!num || isNaN(num)) return "";
    
    const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    
    const convertHundreds = (n) => {
      let result = '';
      if (n > 99) {
        result += ones[Math.floor(n / 100)] + ' hundred ';
        n %= 100;
      }
      if (n > 19) {
        result += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      }
      if (n > 0) {
        result += ones[n] + ' ';
      }
      return result;
    };

    const number = parseFloat(num);
    if (number === 0) return 'zero rupees only';
    
    let crores = Math.floor(number / 10000000);
    let lakhs = Math.floor((number % 10000000) / 100000);
    let thousands = Math.floor((number % 100000) / 1000);
    let hundreds = Math.floor(number % 1000);
    
    let result = '';
    if (crores) result += convertHundreds(crores) + 'crore ';
    if (lakhs) result += convertHundreds(lakhs) + 'lakh ';
    if (thousands) result += convertHundreds(thousands) + 'thousand ';
    if (hundreds) result += convertHundreds(hundreds);
    
    return result.trim() + ' rupees only';
  };

  // Calculate price per sqft automatically
  const calculatePricePerSqft = () => {
    if (expectedPrice && prop?.carpetArea) {
      const price = parseFloat(expectedPrice);
      const area = parseFloat(prop.carpetArea);
      if (!isNaN(price) && !isNaN(area) && area > 0) {
        const pricePerSqftValue = (price / area).toFixed(2);
        setPricePerSqft(pricePerSqftValue);
      }
    }
  };

  // Handle price change
  const handlePriceChange = (value) => {
    setExpectedPrice(value);
    setPriceInWords(numberToWords(value));
    if (prop?.carpetArea) {
      const area = parseFloat(prop.carpetArea);
      if (!isNaN(area) && area > 0) {
        const pricePerSqftValue = (parseFloat(value) / area).toFixed(2);
        setPricePerSqft(pricePerSqftValue);
      }
    }
  };

  // Form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const pricingData = {
        ownership,
        expectedPrice,
        pricePerSqft,
        priceInWords,
        allInclusivePrice,
        taxAndGovtCharges,
        priceNegotiable,
        chargeBrokerage,
        brokerageAmount,
        brokerageType,
        tokenAmount,
        maintenanceCharges,
        securityDeposit,
        registrationCharges,
        propertyDescription
      };

      console.log('Pricing data submitted:', pricingData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to next page (you can implement navigation here)
      console.log('Pricing details saved successfully');
      
    } catch (error) {
      console.error('Error submitting pricing details:', error);
      setErrors({ submit: 'Failed to save pricing details. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span>Add pricing and details</span>
          <div className="h-1 w-8 sm:w-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 xs:mt-0 xs:ml-2 sm:ml-4"></div>
        </h3>

        {/* Pricing Guidelines */}
        <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 mb-2">Pricing Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• You might get **Low responses** as your listing has no photos. Rank up your listing by adding pictures <button className="text-yellow-800 font-medium underline">Upload Now</button></li>
                <li>• Set competitive pricing based on market rates in your locality</li>
                <li>• Include all applicable charges for transparency</li>
                <li>• Add detailed property description to attract genuine buyers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Ownership Section */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Ownership
              <HelpCircle className="w-4 h-4 text-slate-400" />
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ownershipTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setOwnership(type.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    ownership === type.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-medium text-slate-800 mb-1">{type.label}</div>
                  <div className="text-xs text-slate-600">{type.desc}</div>
                </button>
              ))}
            </div>
            <ErrorMessage error={errors.ownership} />
          </div>

          {/* Price Details Section */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-6">Price Details</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expected Price */}
              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  ₹ Expected Price
                </label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={expectedPrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    placeholder="Enter expected price"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                  />
                </div>
                {expectedPrice && (
                  <div className="mt-2 text-sm text-slate-600">
                    {formatCurrency(expectedPrice)}
                  </div>
                )}
              </div>

              {/* Price per sqft */}
              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  ₹ Price per sq.ft.
                </label>
                <div className="relative">
                  <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    value={pricePerSqft}
                    onChange={(e) => setPricePerSqft(e.target.value)}
                    placeholder="Auto-calculated"
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-slate-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Price in words */}
            <div className="mt-6">
              <label className="block text-base font-medium text-slate-700 mb-3">
                ₹ Price in words
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea
                  value={priceInWords}
                  onChange={(e) => setPriceInWords(e.target.value)}
                  placeholder="Price will be automatically converted to words"
                  rows={2}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none resize-none bg-slate-50"
                  readOnly
                />
              </div>
            </div>

            {/* Price Options */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allInclusive"
                  checked={allInclusivePrice}
                  onChange={(e) => setAllInclusivePrice(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-2 border-slate-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="allInclusive" className="ml-3 text-slate-700">
                  All inclusive price
                  <HelpCircle className="inline w-4 h-4 ml-1 text-slate-400" />
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="taxCharges"
                  checked={taxAndGovtCharges}
                  onChange={(e) => setTaxAndGovtCharges(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-2 border-slate-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="taxCharges" className="ml-3 text-slate-700">
                  Tax and Govt. charges excluded
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="negotiable"
                  checked={priceNegotiable}
                  onChange={(e) => setPriceNegotiable(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-2 border-slate-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="negotiable" className="ml-3 text-slate-700">
                  Price Negotiable
                </label>
              </div>
            </div>

            {/* Add more pricing details button */}
            <button className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add more pricing details
            </button>
          </div>

          {/* Brokerage Section */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-6">Do you charge brokerage?</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {brokerageOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setChargeBrokerage(option.value)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    chargeBrokerage === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                      chargeBrokerage === option.value
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-slate-300'
                    }`}>
                      {chargeBrokerage === option.value && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-800">{option.label}</div>
                      <div className="text-xs text-slate-600">{option.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Brokerage Amount */}
            {chargeBrokerage === 'yes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    Brokerage Type
                  </label>
                  <select
                    value={brokerageType}
                    onChange={(e) => setBrokerageType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-medium text-slate-700 mb-3">
                    {brokerageType === 'percentage' ? 'Percentage (%)' : 'Amount (₹)'}
                  </label>
                  <div className="relative">
                    {brokerageType === 'percentage' ? (
                      <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    ) : (
                      <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    )}
                    <input
                      type="number"
                      value={brokerageAmount}
                      onChange={(e) => setBrokerageAmount(e.target.value)}
                      placeholder={brokerageType === 'percentage' ? 'e.g. 2' : 'e.g. 50000'}
                      className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Property Description */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-2">What makes your property unique</h4>
            <p className="text-sm text-slate-600 mb-6">Adding description will increase your listing visibility</p>
            
            <div className="relative">
              <textarea
                value={propertyDescription}
                onChange={(e) => setPropertyDescription(e.target.value)}
                placeholder="Share some details about your property like spacious rooms, well maintained facilities..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none resize-none"
                maxLength={5000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                Minimum 30 characters required
              </div>
            </div>
            <div className="text-sm text-slate-500 mt-1">
              {propertyDescription.length}/5000 characters
            </div>
          </div>

          {/* Additional Charges (Expandable) */}
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-6">Additional Charges (Optional)</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Token Amount (₹)
                </label>
                <input
                  type="number"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(e.target.value)}
                  placeholder="Enter token amount"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Monthly Maintenance (₹)
                </label>
                <input
                  type="number"
                  value={maintenanceCharges}
                  onChange={(e) => setMaintenanceCharges(e.target.value)}
                  placeholder="Enter maintenance charges"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Security Deposit (₹)
                </label>
                <input
                  type="number"
                  value={securityDeposit}
                  onChange={(e) => setSecurityDeposit(e.target.value)}
                  placeholder="Enter security deposit"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-base font-medium text-slate-700 mb-3">
                  Registration Charges (₹)
                </label>
                <input
                  type="number"
                  value={registrationCharges}
                  onChange={(e) => setRegistrationCharges(e.target.value)}
                  placeholder="Enter registration charges"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Error Display */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <ErrorMessage error={errors.submit} />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-slate-200 mt-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !expectedPrice || !ownership}
            className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/25 ${
              isSubmitting || !expectedPrice || !ownership
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


export default ProductPricing