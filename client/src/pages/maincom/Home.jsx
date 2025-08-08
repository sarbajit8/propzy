import React from 'react' // Remove useRef since it's not being used
import { Search } from "lucide-react" // Only import icons being used
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import TopHighlightedProjects from '../../components/maincom/TopHighlightedProjects'
import HeroSection from '../../components/maincom/HeroSection'
import BookService from '../../components/maincom/BookService'
import FeaturedProperty from '../../components/maincom/FeaturedProperty'
import RecentlyAddedproperty from '../../components/maincom/RecentlyAddedproperty'
import InvestmentProperty from '../../components/maincom/InvestmentProperty'
import MainFooter from '../../components/maincom/MainFooter'
import SearchSection from '../../components/maincom/SearchSection'
import TopPicks from '../../components/maincom/TopPiks'
const Home = () => {
//   const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth / 1.5;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

   const serviceCategories = [
    { name: "Salon for women", icon: "💇‍♀️", color: "bg-pink-100" },
    { name: "Salon for men", icon: "💇‍♂️", color: "bg-blue-100" },
    { name: "Spa for women", icon: "🧖‍♀️", color: "bg-purple-100" },
    { name: "AC & appliance repair", icon: "❄️", color: "bg-cyan-100" },
    { name: "Cleaning & pest control", icon: "🧽", color: "bg-green-100" },
    { name: "Electrician, plumber & carpenter", icon: "🔧", color: "bg-orange-100" },
    { name: "Massage for men", icon: "💆‍♂️", color: "bg-indigo-100" },
    { name: "Massage for women", icon: "💆‍♀️", color: "bg-rose-100" },
  ]

  const featuredServices = [
    {
      title: "Massage and spa at home",
      subtitle: "Relax and rejuvenate",
      img: "/placeholder.svg?height=200&width=300",
      badge: "Popular",
    },
    {
      title: "Beauty services",
      subtitle: "Professional beauty treatments",
      img: "/placeholder.svg?height=200&width=300",
      badge: "Trending",
    },
    {
      title: "Fitness training",
      subtitle: "Personal fitness coaching",
      img: "/placeholder.svg?height=200&width=300",
      badge: "New",
    },
  ]

  const products = [
    { name: "Wall Panels", img: "/placeholder.svg?height=150&width=150", price: "₹2,999" },
    { name: "Smart Locks", img: "/placeholder.svg?height=150&width=150", price: "₹8,999" },
    { name: "Water Purifier", img: "/placeholder.svg?height=150&width=150", price: "₹12,999" },
    { name: "Air Conditioner", img: "/placeholder.svg?height=150&width=150", price: "₹35,999" },
    { name: "Refrigerator", img: "/placeholder.svg?height=150&width=150", price: "₹25,999" },
  ]

  const mostBookedServices = [
    {
      name: "Deep cleaning",
      provider: "Rajesh Kumar",
      rating: 4.8,
      img: "/placeholder.svg?height=100&width=100",
      price: "₹1,299",
    },
    {
      name: "Hair cut & styling",
      provider: "Priya Sharma",
      rating: 4.9,
      img: "/placeholder.svg?height=100&width=100",
      price: "₹599",
    },
    {
      name: "AC repair",
      provider: "Amit Singh",
      rating: 4.7,
      img: "/placeholder.svg?height=100&width=100",
      price: "₹399",
    },
    {
      name: "Plumbing",
      provider: "Suresh Patel",
      rating: 4.6,
      img: "/placeholder.svg?height=100&width=100",
      price: "₹299",
    },
    {
      name: "Massage therapy",
      provider: "Neha Gupta",
      rating: 4.9,
      img: "/placeholder.svg?height=100&width=100",
      price: "₹1,999",
    },
  ]
  return (
    <>
  <div className=" bg-white">
      {/* Header */}
    {/* <div className="sticky top-0 z-50 bg-white">
  <Header />
</div> */}

      {/* Main Content */}
      <div className="px-4 space-y-6">
       <SearchSection/>

          {/* hero slider */}
      <HeroSection/>

      
        {/* Book a Service Section */}
       <BookService/>
        {/* top picks */}
        <TopPicks/>
        {/* Featured Properties */}
        <FeaturedProperty/>
        {/* Trusted Developers */}
        <TopHighlightedProjects />
        
        {/* property for investment */}
         <InvestmentProperty/>
        {/* Recently Added Properties */}
        <RecentlyAddedproperty/>
        {/* footer section */}
        {/* <Footer/> */}
      </div>
              <MainFooter/>

    </div>


</>
  )
}

export default Home