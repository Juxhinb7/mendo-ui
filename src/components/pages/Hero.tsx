import { Link } from "react-router-dom";
import Mockup from "../../assets/AwesomeScreenshot-8_7_2024,12_40_53PM.gif";
import Logo from "../elements/Logo";

const Hero: React.FC = () => {
   return (
      <div className="flex flex-col items-center">
         <header className="bg-white border-b-[1px] border-[#dbdbdb] border-solid lg:static lg:overflow-y-visible w-full">
                  <div className="flex justify-center md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                        <a href="/">
                           <Logo title="Mendo"/>
                        </a>
                  </div>
         </header>
         <section>
            <div className="max-w-screen-xl mx-auto px-4 gap-12 text-gray-600 mx:px-8">
               <div className="space-y-5">
                  <h1 className="text-sm text-cyan-600 font-medium mt-4">
                     Innovate. Implement. Inspire: Elevate your Project Experience.
                  </h1>
                  <h2 className="text-gray-800 font-extrabold mx-auto md:text-5xl">
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ddbdb] to-[#14a2c9]">Project management, turbocharged by AI.</span>
                  </h2>
                  <p className="max-w-2xl mx-auto">
                     Your projects deserve the best - design them faster and smarter with our unparalleled solution.
                  </p>
                  <div className="items-center justify-center sm:flex">
                     <Link to={"/sign-in"} className="block py-2 px-4 text-white font-medium bg-cyan-600 rounded-lg hover:bg-cyan-500 shadow-lg hover:shadow-none cursor-pointer">
                        Get started
                     </Link>
                  </div>
               </div>
               <div className="mt-14">
                  <img src={Mockup} className="w-full" />
               </div>
            </div>
         </section>

      </div>
   )
}

export default Hero;