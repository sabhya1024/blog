import InputBox from "../components/InputBox";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useContext, useRef, useState } from "react";
import PageAnimation from "../common/PageAnimation";
import { Toaster, toast } from "react-hot-toast";
import { storeInSession } from "../common/session";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserContext } from "../App";


const domain = import.meta.env.VITE_SERVER_DOMAIN;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

const UserAuth = ({ type }) => {
  let { userAuth: { access_token },
  setUserAuth} = useContext(UserContext)


  const [loading, setLoading] = useState(false);

  const recaptcha = useRef(null);
  const authForm = useRef();
  const navigate = useNavigate();

  // handling server authentication ---> send the post request to the server using axios
  // axios return a JSON object named response...
  const userAuthThroughServer = async (serverRoute, formData) => {
    try {
      const response = await axios.post(domain + serverRoute, formData);
      toast.success(`${type === "signin" ? "Login" : "Signup"} sucessful!`);

      // storing sessions
      storeInSession("user", response.data.token);
      setUserAuth(response.data);
      return response.data;

    } catch (error) {
      if (error.response) {
        toast.error("Authentication failed.");
      } else {
        toast.error("Server unreachable.");
      }
    }
    //Return null if request fails or server is unreachable
    return null;
  };

  // when user submits
  const handleSubmit = async (e) => {
    e.preventDefault();

    // dont let the user to click on submit multiple times
    if (loading) return;
    setLoading(true);
    try {
      // type prop is passed by app.jsx on basis of that route is decided
      let serverRoute = type === "signin" ? "/signin" : "/signup";

      //Retrieve reCAPTCHA token to verify human user on backen
      const token = recaptcha.current.getValue();
      if (!token) {
        toast.error("Please complete the reCAPTCHA");
        setLoading(false);
        return;
      }

      // Getting form data
      const form = new FormData(authForm.current);
      const formData = {};

      for (let [key, value] of form.entries()) {
        formData[key] = value?.trim(); //Trim all inputs to remove extra spaces
      }

      // reCAPTCHA for backend verification
      formData.token = token;

      //Frontend validation
      let { fullname, email, password } = formData;

      if (fullname) {
        if (fullname.length < 3) {
          setLoading(false);
          return toast.error("Full Name must be atleast 3 letters long");
        }
      }

      if (!email.length) {
        return toast.error("Email can't be empty.");
      }

      if (!emailRegex.test(email)) {
        return toast.error("Enter a valid email.");
      }

      if (!passwordRegex.test(password)) {
        return toast.error(
          "Password must contain: uppercase, lowercase, number, special character (8-20 chars)"
        );
      }

      // validation done?? ... now send post request to server
      // Server returns some data , accesstoken and other things ..,
      const responseData = await userAuthThroughServer(serverRoute, formData);
      // if not returned then return
      if (!responseData) return;

      recaptcha.current.reset();

      if (type === "signup") {
        navigate("/please-verify");
      } else {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    access_token ? navigate('/') :
    <PageAnimation keyValue={type}>
      <section className="min-h-screen flex items-center justify-center py-10 md:py-20">
        <form className="w-[80%] max-w-[400px]" ref={authForm}>
          <h1 className="text-4xl font-georgia text-center capitalize mb-10 text-black">
            {type === "signin" ? "Login to your account" : "Create new account"}
          </h1>

          {type !== "signin" && (
            <>
              <InputBox name="fullname" type="text" placeholder="Full Name" />
            </>
          )}

          <InputBox
            name="email"
            type="email"
            placeholder="Enter your email address"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Enter your password"
          />

          <div className="my-6 flex justify-center">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_SITE_KEY}
              ref={recaptcha}
            />
          </div>

          <button
            className="btn-dark
            flex items-center justify-center gap-3 min-w-[150px]
            "
            type="submit"
            onClick={handleSubmit}
            disabled={loading}>
            {loading ? (
              <>
                <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin text-white" />
                <span className="text-white">Processing...</span>
              </>
            ) : (
              type.replace("-", " ")
            )}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-20 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            type="button"
            className="flex w-full gap-4 items-center justify-center text-white bg-neutral-100 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            disabled={loading}>
            <FaGoogle className="w-5 h-5" />
            Continue with Google
          </button>

          {type === "signin" ? (
            <p className="mt-6 text-gray-500 text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Sign Up
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-gray-500 text-xl text-center">
              Already have an account?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </PageAnimation>
  );
};

export default UserAuth;
