import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TopHighlightedProjects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data for highlighted projects
  const projects = [
    {
      id: 1,
      name: "Sucasa Imperial",
      developer: "PROPSEEK REALTY",
      type: "2, 3 BHK Apartments",
      location: "Narendrapur, South Kolkata, Kolkata",
      priceRange: "₹33.95 L - 49.24 L",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      category: "Apartments"
    },
    {
      id: 2,
      name: "Natures Paradise",
      developer: "SURYADOY LAND AND BUILDERS",
      type: "Residential Plots",
      location: "Joka, Diamond Harbour Road-Thakurpukur",
      priceRange: "₹2.0 L - 8.0 L",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop",
      category: "Plots"
    },
    {
      id: 3,
      name: "Green Valley Heights",
      developer: "URBAN DEVELOPERS LTD",
      type: "1, 2, 3 BHK Apartments",
      location: "New Town, Kolkata",
      priceRange: "₹25.50 L - 65.75 L",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      category: "Apartments"
    },
    {
      id: 4,
      name: "Sunrise Villas",
      developer: "PREMIUM CONSTRUCTIONS",
      type: "Independent Villas",
      location: "Rajarhat, New Town",
      priceRange: "₹85.0 L - 1.25 Cr",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop",
      category: "Villas"
    },
    {
      id: 5,
      name: "Royal Gardens",
      developer: "ELITE BUILDERS",
      type: "2, 3, 4 BHK Apartments",
      location: "Salt Lake, Kolkata",
      priceRange: "₹45.0 L - 78.5 L",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      category: "Apartments"
    },
    {
      id: 6,
      name: "Metro Heights",
      developer: "METRO DEVELOPERS",
      type: "1, 2 BHK Apartments",
      location: "Howrah, West Bengal",
      priceRange: "₹18.5 L - 35.2 L",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop",
      category: "Apartments"
    }
  ];

  // Responsive cards per slide
  const getCardsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // Desktop: 3 cards
      if (window.innerWidth >= 768) return 2;  // Tablet: 2 cards
      return 1; // Mobile: 1 card
    }
    return 3; // Default for SSR
  };

  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerSlide(getCardsPerSlide());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(projects.length / cardsPerSlide);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h4 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            Top Highlighted Projects
          </h4>
          <p className="mt-2 text-violet-600/80 max-w-2xl mx-auto">
            Discover our premium selection of properties with exceptional value and lifestyle
          </p>
        </div>

        {/* Projects Slider */}
        <div className="relative">
          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden lg:block">
            <button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white hover:bg-violet-50 w-12 h-12"
            >
              <ChevronLeft className="h-5 w-5 text-violet-600" />
            </button>
            
            <button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white hover:bg-violet-50 w-12 h-12"
            >
              <ChevronRight className="h-5 w-5 text-violet-600" />
            </button>
          </div>

          {/* Mobile: Horizontal Scrollable */}
          <div className="lg:hidden">
            <div className="flex overflow-x-auto gap-4 scroll-smooth scrollbar-hide px-2 pb-4"
                 style={{ scrollSnapType: 'x mandatory' }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 min-w-[270px] max-w-[270px] h-64 flex-shrink-0 rounded-lg"
                  style={{ scrollSnapAlign: 'center' }}
                >
                  <div className="relative h-full overflow-hidden rounded-lg">
                    {/* Background Image */}
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-violet-800/20 to-transparent"></div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <p className="text-violet-100 text-xs font-medium">
                          Mktd. by {project.developer}
                        </p>
                        <div className="space-y-0.5 pt-1">
                          <p className="text-violet-100 font-medium text-xs">
                            {project.type}
                          </p>
                          <p className="text-violet-100/80 text-xs">
                            {project.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-2 right-2">
                      <div className="bg-violet-600/95 backdrop-blur-sm rounded-lg px-2 py-1">
                        <p className="text-white font-bold text-xs">
                          {project.priceRange}
                        </p>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <p className="text-violet-600 text-xs font-medium">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop/Tablet: Grid with Slider */}
          <div className="hidden lg:block">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((project) => (
                        <div
                          key={project.id}
                          className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 h-72 rounded-lg"
                        >
                          <div className="relative h-full overflow-hidden rounded-lg">
                            {/* Background Image */}
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-violet-900/80 via-violet-800/20 to-transparent"></div>

                            {/* Content Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                              <div className="space-y-1">
                                <h3 className="text-lg font-bold">{project.name}</h3>
                                <p className="text-violet-100 text-xs font-medium">
                                  Mktd. by {project.developer}
                                </p>
                                <div className="space-y-0.5 pt-1">
                                  <p className="text-violet-100 font-medium text-xs">
                                    {project.type}
                                  </p>
                                  <p className="text-violet-100/80 text-xs">
                                    {project.location}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Price Badge */}
                            <div className="absolute top-2 right-2">
                              <div className="bg-violet-600/95 backdrop-blur-sm rounded-lg px-2 py-1">
                                <p className="text-white font-bold text-xs">
                                  {project.priceRange}
                                </p>
                              </div>
                            </div>

                            {/* Category Badge */}
                            <div className="absolute top-2 left-2">
                              <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                                <p className="text-violet-600 text-xs font-medium">
                                  {project.category}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators - Desktop */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-violet-600 scale-125' 
                      : 'bg-violet-200 hover:bg-violet-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="text-center mt-12">
          <button 
            variant="default" 
            size="lg" 
            className="px-8 bg-violet-600 hover:bg-violet-700 transition-all"
          >
            View All Highlighted Projects
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TopHighlightedProjects;
