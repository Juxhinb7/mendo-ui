import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import useToken from './hooks/useToken.ts';
import MyEnvironment from './components/pages/MyEnvironment.tsx';

import { lazy } from "react";
import LazyComponent from './components/lazy/LazyComponent.tsx';
const Hero = lazy(() => import("./components/pages/Hero.tsx"));
const SignUp = lazy(() => import("./components/pages/SignUp.tsx"));
const Activation = lazy(() => import("./components/pages/Activation.tsx"));
const SignIn = lazy(() => import("./components/pages/SignIn.tsx"));
const NotFound = lazy(() => import("./components/pages/NotFound.tsx"));



function App() {
  const {token} = useToken();
  return (
      <div>
        <Routes>
        {!token && token !== "" && token !== undefined ? (
          <>
            <Route path="/" element={<LazyComponent fallback={<h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">
                    Loading...
                </h1>} element={<Hero />} />} />
            <Route path="/sign-up" element={<LazyComponent fallback={<h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">
                    Loading...
                </h1>} element={<SignUp />} />} />
            <Route path="/account-activation" element={<LazyComponent fallback={<h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">
                    Loading...
                </h1>} element={<Activation />} />} />
            <Route path="/sign-in" element={<LazyComponent fallback={<h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">
                    Loading...
                </h1>} element={<SignIn />} />} />
            <Route path="*" element={<LazyComponent fallback={<h1 className="flex justify-center items-center sm:px-6 min-h-[calc(100vh-10rem)]">
                    Loading...
                </h1>} element={<NotFound />} />} />
          </>

          
        ): (
          <>
            <Route path="/my-environment/*" element={<MyEnvironment />}/>
            <Route path="*" element={<Navigate to ="/my-environment/home" replace={true}/>}/>
          </>


        )}
        </Routes>


      </div>

  )
}

export default App;
