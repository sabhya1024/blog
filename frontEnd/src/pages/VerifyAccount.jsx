import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const VerifyAccount = () => {
  // This hook reads the URL query (e.g., /verify-account?token=123)
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("Verifying your account...");

  useEffect(() => {
    const verifyToken = () => {
      if (!token) {
        setStatus("No verification token provided.");
        return;
      }

      // TODO: This is where i send the 'token' to my backend API.
      

      console.log("Attempting to verify token:", token);
      setTimeout(() => {
        if (token === "good_token") {
          setStatus("Account verified! You can now sign in.");
        } else {
          setStatus("Verification failed. The link may be invalid or expired.");
        }
      }, 1500); 
    };

    verifyToken();
  }, [token]); 

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[500px] text-center p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-georgia mb-4">{status}</h1>
        {status.includes("verified") && (
          <Link to="/signin" className="btn-dark mt-4 w-auto! px-10">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyAccount;
