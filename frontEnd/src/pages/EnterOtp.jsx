import { useLocation, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox"; 

const EnterOTP = () => {
  const navigate = useNavigate();

  // sigin page will send the email to this page using useLocation hook
  const location = useLocation();
  const email = location.state?.email;

  // If someone lands here by typing the URL, they won't have an email.
  if (!email) {
    navigate("/signin");
    return null; 
  }

  const handleOTPSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const otp = formData.get("otp");

    // TODO: This is where you'll send { email, otp } to your backend API.

    
    console.log("Verifying OTP:", otp, "for email:", email);
    alert("Simulating successful OTP check... logging you in.");
    navigate("/"); 
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <form className="w-[80%] max-w-[400px]" onSubmit={handleOTPSubmit}>
        <h1 className="text-3xl font-georgia mb-4 text-center">
          Enter Your One-Time Password
        </h1>
        <p className="text-xl text-gray-700 text-center mb-8">
          For security, we sent an OTP to <strong>{email}</strong>.
        </p>

        <InputBox name="otp" type="text" placeholder="Enter OTP" />

        <button className="btn-dark mt-4" type="submit">
          Verify
        </button>
      </form>
    </section>
  );
};

export default EnterOTP;
