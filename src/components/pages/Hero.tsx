import { Link } from "react-router-dom";
import Mockup from "../../assets/mockup.gif";

const Hero: React.FC = () => {
   return (
      <>
         <section>
            <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 mx:px-8">
               <div className="space-y-5">
                  <h1 className="text-sm text-cyan-600 font-medium mt-4">
                     Innovate. Implement. Inspire: Elevate your Project Experience.
                  </h1>
                  <h2 className="text-gray-800 font-extrabold mx-auto md:text-5xl">
                     Accelerate your project timelines with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ddbdb] to-[#14a2c9]">the cutting-edge and groundbreaking features of our revolutionary tool Mendo.</span>
                  </h2>
                  <p className="max-w-2xl mx-auto">
                     Your projects deserve the best - design them faster and smarter with our unparalleled solution.
                  </p>
                  <div className="items-center justify-center sm:flex">
                     <Link to={"/sign-up"} className="block py-2 px-4 text-white font-medium bg-cyan-600 rounded-lg hover:bg-cyan-500 shadow-lg hover:shadow-none cursor-pointer">
                        Get started
                     </Link>
                  </div>
               </div>
               <div className="mt-14">
                  <img src={Mockup} className="w-full" />
               </div>
            </div>
         </section>
      </>
   )
}

export default Hero;