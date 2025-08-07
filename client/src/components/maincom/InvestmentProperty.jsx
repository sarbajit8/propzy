import { useRef } from 'react';
import { Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import im1 from "@/assets/prop1.png";
import im2 from "@/assets/prop2.png";
import im3 from "@/assets/prop3.png";

export default function InvestmentProperty() {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  const projects = [
    {
      id: 1,
      name: "Prarthana",
      developer: "by Captain Realty",
      type: "3, 4 BHK Apartments",
      location: "Shibpur, Howrah",
      priceRange: "₹11 Cr - 1.41 Cr",
      image: im1
    },
    {
      id: 2,
      name: "Skyline Residency",
      developer: "by Prime Developers",
      type: "2, 3 BHK Apartments",
      location: "Salt Lake, Kolkata",
      priceRange: "₹85 L - 1.2 Cr",
      image: im2
    },
    {
      id: 3,
      name: "Green Valley",
      developer: "by Eco Builders",
      type: "3, 4 BHK Villas",
      location: "New Town, Kolkata",
      priceRange: "₹1.5 Cr - 2.8 Cr",
      image: im3
    }
  ];

  return (
    <div className="bg-white-50 py-3 px-1">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="flex justify-center text-3xl font-bold text-violet-500 mb-2">
            High-demand projects to invest now
          </h2>
          <p className="flex justify-center text-violet-600">Leading projects in high demand</p>
        </div>

        {/* Projects Slider */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 bg-white rounded-lg border border-violet-100 shadow-md hover:shadow-violet-200 transition-shadow duration-300 overflow-hidden min-w-[350px]"
              >
                <div className="flex">
                  {/* Project Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-tl-lg rounded-bl-lg"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-violet-500 mb-1">
                          {project.name}
                        </h3>
                        <p className="text-sm text-violet-500 mb-1">
                          {project.developer}
                        </p>
                      </div>
                      <button className="text-violet-400 hover:text-violet-500 transition-colors p-1">
                        <Share2 size={16} />
                      </button>
                    </div>

                    <div className="space-y-1 mb-3">
                      <p className="text-sm font-medium text-violet-500">
                        {project.type}
                      </p>
                      <p className="text-sm text-gray-500">
                        {project.location}
                      </p>
                    </div>

                    <div className="text-lg font-bold text-violet-500">
                      {project.priceRange}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-sm p-2 shadow-lg hover:shadow-xl transition"
          >
            <ChevronLeft size={20} className="text-violet-600" />
          </button>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-sm  p-2 shadow-lg hover:shadow-xl transition"
          >
            <ChevronRight size={20} className="text-violet-600" />
          </button>
        </div>
      </div>

      {/* Inline scrollbar hide for all browsers */}
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
