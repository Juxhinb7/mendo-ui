import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Hero from "./components/pages/Hero.tsx";
import NotFound from './components/pages/NotFound.tsx';
import SignUp from './components/pages/SignUp.tsx';
import Activation from './components/pages/Activation.tsx';
import SignIn from './components/pages/SignIn.tsx';
import MyEnvironment from './components/pages/MyEnvironment.tsx';
import useToken from './hooks/useToken.ts';



function App() {
  const {token} = useToken();
  return (
      <div>
        <Routes>
        {!token && token !== "" && token !== undefined ? (
          <>
            <Route path="/" element={<Hero />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/account-activation" element={<Activation />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
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
