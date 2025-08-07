import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import im1 from "@/assets/bhi1.png"
import im2 from "@/assets/bhi2.png"
import im3 from "@/assets/bhi3.png"

const HeroSection = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      image: im1,
      title: "Luxury Villas",
      subtitle: "Premium Properties in Prime Locations",
      description: "Discover exceptional villas with modern amenities"
    },
    {
      image: im2,
      title: "Modern Apartments",
      subtitle: "Contemporary Living Spaces",
      description: "Find your perfect apartment in the heart of the city"
    },
    {
      image: im3,
      title: "Commercial Properties",
      subtitle: "Business & Investment Opportunities",
      description: "Explore commercial spaces for your business needs"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000); // Resume auto-play after 8 seconds
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900"></h2>
      
      {/* Mobile Hero Slider - Only visible on mobile screens */}
      <div className="block sm:hidden">
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-3 scroll-smooth scrollbar-hide px-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {[im1, im2, im3].map((img, i) => (
              <div key={i} className="min-w-[270px] flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
                <img
                  src={img}
                  alt={`Property ${i + 1}`}
                  className="w-[270px] h-30 object-cover rounded"
                  style={{ display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet & Desktop Banner Slider - Visible on tablet and desktop screens */}
      <div className="hidden sm:block">
        <div className="relative overflow-hidden rounded-xl">
          {/* Main Slider Container */}
          <div className="relative h-48 sm:h-56 lg:h-64 xl:h-80">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 relative">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center">
                    <div className="max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-1 sm:mb-2">
                        {slide.title}
                      </h2>
                      <h3 className="text-sm sm:text-lg lg:text-xl xl:text-2xl text-violet-200 mb-2 sm:mb-4">
                        {slide.subtitle}
                      </h3>
                      <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 mb-4 sm:mb-6">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <button className="bg-violet-500 hover:bg-violet-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-colors duration-200">
                          View Properties
                        </button>
                        <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-200">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1.5 sm:p-2 rounded-full transition-all duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-white' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Indicator */}
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
                  isAutoPlaying 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-red-500/20 text-red-300'
                }`}
                aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
              >
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  isAutoPlaying ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
