import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuth from "./pages/userAuth";

// verification pages
import CheckEmail from "./pages/CheckEmail";
import VerifyAccount from "./pages/VerifyAccount";
import EnterOTP from "./pages/EnterOTP";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
