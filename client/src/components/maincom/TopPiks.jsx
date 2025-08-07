import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

// --- MOBILE/TABLET SECTION ---
const MobileTopPicks = ({
  topPicks,
  isPlaying,
  togglePlaying,
  currentSlide,
  setCurrentSlide,
  nextSlide,
  prevSlide,
}) => {
  const currentProject = topPicks[currentSlide];

  return (
    <section className="lg:hidden py-6 sm:py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-violet-500">Propzy's top picks</h2>
        <p className="text-gray-600 text-sm sm:text-base">Explore top living options with us</p>
      </div>

      {/* Mobile/Tablet Slider */}
      <div className="relative">
        {/* Image Container with Overlays */}
        <div className="relative h-80 sm:h-96 md:h-[28rem] rounded-lg overflow-hidden">
          <img
            src={currentProject.image}
            alt={currentProject.project}
            className="w-full h-full object-cover"
          />
          
          {/* Dark Gradient Overlay for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          {/* Developer Info Overlay - Top */}
          <div className="absolute top-4 left-4 right-16 sm:right-20 flex items-center space-x-2 sm:space-x-3">
            <img 
              src={currentProject.logo} 
              alt={currentProject.developer} 
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md object-cover" 
            />
            <div>
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-white">{currentProject.developer}</h3>
              <p className="text-xs sm:text-sm text-blue-300 underline">View Projects</p>
            </div>
          </div>

          {/* Property Details Overlay - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">{currentProject.project}</h4>
            <p className="text-sm sm:text-base text-white/90 mb-2">{currentProject.location}</p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">{currentProject.priceRange}</p>
            <p className="text-sm sm:text-base text-white/90 mb-3 sm:mb-4">{currentProject.configuration}</p>
            
            {/* Contact Button - Responsive */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-md transition-colors text-sm sm:text-base">
              Contact
            </button>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 text-white hover:bg-white/30 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 text-white hover:bg-white/30 transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={16} className="sm:w-5 sm:h-5" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlaying}
            className="absolute top-4 right-4 sm:right-6 bg-white/20 backdrop-blur-sm rounded-full p-1.5 sm:p-2 text-white hover:bg-white/30 transition-colors"
            aria-label="Toggle autoplay"
          >
            {isPlaying ? <Pause size={14} className="sm:w-4 sm:h-4" /> : <Play size={14} className="sm:w-4 sm:h-4" />}
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          {topPicks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- DESKTOP SECTION (Only for large screens) ---
const DesktopTopPicks = ({
  topPicks,
  isPlaying,
  togglePlaying,
  currentSlide,
  setCurrentSlide,
  nextSlide,
  prevSlide,
}) => {
  const currentProject = topPicks[currentSlide];

  return (
    <section className="hidden lg:block py-16 bg-white-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-500">Propzy's top picks</h2>
          <p className="text-lg text-purple-600">Explore top living options with us</p>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-end mb-6 space-x-2">
          {topPicks.map((project, index) => (
            <button
              key={project.id}
              onClick={() => setCurrentSlide(index)}
              className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentSlide ? "border-purple-600 scale-110" : "border-transparent opacity-70"
              }`}
              aria-label={`Select slide ${index + 1}`}
            >
              <img src={project.image} alt={project.project} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center truncate">{project.project}</div>
            </button>
          ))}
        </div>

        {/* Main Slider Content */}
        <div className="relative px-16" >
          <div className="overflow-hidden shadow-2xl bg-gradient-to-br from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[400px]">
              {/* Left Details */}
              <div className="lg:col-span-2 p-8 flex flex-col justify-center animate-fade-in space-y-6">
                <div className="flex items-center space-x-3">
                  <img src={currentProject.logo} alt={currentProject.developer} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-xl text-purple-800">{currentProject.developer}</h3>
                    <button className="text-purple-600 underline text-left">View Projects</button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-extrabold text-purple-900">{currentProject.project}</h4>
                  <p className="text-purple-700">{currentProject.location}</p>
                  <p className="text-3xl font-bold text-purple-700">{currentProject.priceRange}</p>
                  <p className="text-purple-700">{currentProject.configuration}</p>
                  <button className="w-full lg:w-auto py-4 px-6 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                    Contact
                  </button>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-3 relative">
                <img src={currentProject.image} alt={currentProject.project} className="w-full h-full object-cover min-h-[400px]" />

                {/* Controls */}
                <button 
                  onClick={togglePlaying} 
                  aria-label="Toggle autoplay" 
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevSlide} 
                  aria-label="Previous" 
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={nextSlide} 
                  aria-label="Next" 
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {topPicks.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? "bg-purple-600 scale-125" : "bg-purple-200"}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TopPicks = () => {
  const topPicks = [
    {
      id: 1,
      developer: "Sugam Homes",
      project: "Crown",
      location: "Salt Lake City, Kolkata",
      priceRange: "₹1.89 Cr - 2.76 Cr",
      configuration: "3, 4 BHK Apartments",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      logo: "https://images.unsplash.com/photo-1560518883-ce09040d7be7?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      developer: "Morya Constructions",
      project: "Morya Phase II",
      location: "Baner, Pune",
      priceRange: "₹95 Lakh - 1.45 Cr",
      configuration: "2, 3 BHK Apartments",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      developer: "Urban Developers",
      project: "Sugam Urban Lakes",
      location: "Electronic City, Bangalore",
      priceRange: "₹75 Lakh - 1.25 Cr",
      configuration: "1, 2, 3 BHK Apartments",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % topPicks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPlaying, topPicks.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % topPicks.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + topPicks.length) % topPicks.length);

  const togglePlaying = () => setIsPlaying(!isPlaying);

  return (
    <>
      {/* Mobile and Tablet Only */}
      <MobileTopPicks
        topPicks={topPicks}
        isPlaying={isPlaying}
        togglePlaying={togglePlaying}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
      
      {/* Desktop Only (lg screens and up) */}
      <DesktopTopPicks
        topPicks={topPicks}
        isPlaying={isPlaying}
        togglePlaying={togglePlaying}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
      />
    </>
  );
};

export default TopPicks;
