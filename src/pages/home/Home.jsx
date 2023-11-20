import HeroSection from "../../components/HeroSection"
import Filter from "../../components/filter/Filter"
import ProductCard from "../../components/productCard/ProductCard"
import Testimonial from "../../components/testimonial/Testimonial"
import Track from "../../components/track/Track"
//***** for testing resone */
// import { useDispatch, useSelector } from "react-redux"
// import { addToCart, deleteFromCart } from "../../redux/CartSlice"


function Home() {



  return (
    <>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
    </>
  )
}

export default Home