import shoppingImg from "../assets/shopping.jpg"
function HeroSection() {
	return (
		<div className="w-full h-80 relative">
			<img className=" w-full absolute h-full"  src={shoppingImg} alt='heroimage' />
		</div>
	)
}

export default HeroSection