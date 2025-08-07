import React, { useRef, useState } from 'react'
// import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Star, ArrowRight, Sparkles } from 'lucide-react'
import im1 from "@/assets/s1.webp"
import im2 from "@/assets/s2.webp"
import im3 from "@/assets/s3.webp"


const BookService = () => {
  const sliderRef = useRef(null);
  const desktopSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth / 1.5;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };


  const scrollDesktopSlider = (direction) => {
    if (desktopSliderRef.current) {
      const cardWidth = 150;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2; // Scroll 2 cards at a time
      
      desktopSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };


  const services = [
    { id: 1, name: "Carpenter", image: im1 },
    { id: 2, name: "Electrician", image: im2 },
    { id: 3, name: "Plumber", image: im3 },
    { id: 4, name: "Cleaning", image: im1 },
    { id: 5, name: "Painting", image: im2 },
    { id: 6, name: "AC Service", image: im3 },
    { id: 7, name: "Pest Control", image: im1 },
    { id: 8, name: "Gardening", image: im2 }
  ];
    
  return (
    <div className="space-y-6 ">
      {/* Enhanced Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold bg-purple-500 bg-clip-text text-transparent leading-tight">
              Book a Service
            </h2>
          </div>
        </div>
        
        <button 
          variant="link" 
          className="text-purple-500 hover:text-purple-600 p-0 h-auto text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 group"
        >
          View All
          {/* <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 group-hover:translate-x-1 transition-transform" /> */}
        </button>
      </div>


      {/* Mobile Horizontal Slider - Only visible on mobile screens */}
      <div className="block sm:hidden">
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto gap-3 scroll-smooth scrollbar-hide px-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="min-w-[100px] flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
                <Card className="bg-gray-100">
                  <CardContent className="p-0 h-16 flex items-center justify-center">
                    <img
                      src={[im1, im2, im3][i % 3]}
                      alt={`Service ${i + 1}`}
                      className="w-15 object-cover rounded-none"
                      style={{ display: 'block' }}
                    />
                  </CardContent>
                </Card>
                <p className="w-18 break-words text-center text-xs">carpenter/electrician</p>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Tablet Layout: Only Slider - No Video */}
      <div className="hidden sm:block lg:hidden">
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollDesktopSlider('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-violet-50 border-2 border-violet-200 hover:border-violet-300 rounded-sm  shadow-lg p-2 transition-all duration-200"
            aria-label="Scroll left"
            type="button"
          >
            <ChevronLeft className="w-5 h-5 text-violet-600" />
          </button>


          <button
            onClick={() => scrollDesktopSlider('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-violet-50 border-2 border-violet-200 hover:border-violet-300 rounded-full shadow-lg p-2 transition-all duration-200"
            aria-label="Scroll right"
            type="button"
          >
            <ChevronRight className="w-5 h-5 text-violet-600" />
          </button>


          {/* Services Slider for Tablet */}
          <div
            ref={desktopSliderRef}
            className="flex gap-4 scroll-smooth px-8 overflow-x-hidden"
            style={{ 
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="min-w-[160px] flex-shrink-0 group cursor-pointer text-center"
                style={{ scrollSnapAlign: 'start' }}
              >
                <Card className="bg-white hover:bg-violet-50 border border-gray-200 hover:border-violet-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mb-3">
                  <CardContent className="p-4">
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                    {service.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Desktop Layout: Slider Left (70%) + Video Right (30%) - Only visible on lg+ screens */}
      <div className="hidden lg:block">
        <div className="flex gap-6 items-start">
          
          {/* Left Side: Services Slider - 70% width */}
          <div className="w-[70%] relative">
            {/* Navigation Arrows */}
            <button
              onClick={() => scrollDesktopSlider('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-violet-50 border-2 border-violet-200 hover:border-violet-300 rounded-full shadow-lg p-2 transition-all duration-200"
              aria-label="Scroll left"
              type="button"
            >
              <ChevronLeft className="w-5 h-5 text-violet-600" />
            </button>


            <button
              onClick={() => scrollDesktopSlider('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-violet-50 border-2 border-violet-200 hover:border-violet-300 rounded-full shadow-lg p-2 transition-all duration-200"
              aria-label="Scroll right"
              type="button"
            >
              <ChevronRight className="w-5 h-5 text-violet-600" />
            </button>


            {/* Services Slider */}
            <div
              ref={desktopSliderRef}
              className="flex gap-4 scroll-smooth px-8 overflow-x-hidden"
              style={{ 
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="min-w-[160px] flex-shrink-0 group cursor-pointer text-center"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <Card className="bg-white hover:bg-violet-50 border border-gray-200 hover:border-violet-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 mb-3">
                    <CardContent className="p-4">
                      <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-center">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Right Side: Video Section - 30% width */}
          <div className="w-[30%]">
            {/* Video Container */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-violet-100 via-purple-100 to-indigo-100 rounded-2xl overflow-hidden shadow-xl border-2 border-violet-200 relative group cursor-pointer">
                {/* Video placeholder with background image */}
                <div 
                  className="w-full h-full bg-cover bg-center relative"
                  style={{
                    backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.3), rgba(139, 69, 19, 0.3)), url(${im1})`
                  }}
                >
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-violet-500 group-hover:text-white">
                      <Play className="w-6 h-6 text-violet-600 group-hover:text-white fill-current ml-0.5" />
                    </div>
                  </div>


                  {/* Video overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <div className="text-white">
                      <h4 className="text-sm font-bold mb-1">Service Demo</h4>
                      <p className="text-xs opacity-90">Expert quality service</p>
                      
                      {/* Rating badge */}
                      <div className="flex items-center gap-1 mt-2">
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-semibold">4.9</span>
                          <span className="text-xs opacity-80">• 2.1K</span>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-violet-600/0 group-hover:bg-violet-600/10 transition-colors duration-300"></div>
                </div>
              </div>


              {/* Video description */}
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    Featured
                  </span>
                  <span>•</span>
                  <span>3:45</span>
                </div>
                
                <p className="text-gray-600 text-xs leading-relaxed">
                  See how our professional team delivers exceptional service quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default BookService
