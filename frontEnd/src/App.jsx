import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuth from "./pages/userAuth";
import { Toaster, toast } from "react-hot-toast"



// verification pages
import CheckEmail from "./pages/CheckEmail";
import VerifyAccount from "./pages/VerifyAccount";
import EnterOTP from "./pages/EnterOTP";
import { createContext, useContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

export const UserContext = createContext({})



function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession ? setUserAuth(JSON.parse(userInSession)) :
      setUserAuth({access_token: null})
  }, [])

  return (
    <>
      <Toaster />
      <UserContext.Provider value={{userAuth, setUserAuth}}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="signin" element={<UserAuth type="signin" />} />
            <Route path="signup" element={<UserAuth type="signup" />} />

            <Route path="please-verify" element={<CheckEmail />} />
            <Route path="verify-account" element={<VerifyAccount />} />
            <Route path="enter-otp" element={<EnterOTP />} />

            <Route index element={<h1>Home page</h1>} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
