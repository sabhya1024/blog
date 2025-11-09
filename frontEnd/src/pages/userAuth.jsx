import InputBox from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import PageAnimation from "../common/PageAnimation";

const fakeApiLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    console.log("Simulating API call for:", email);
    const simulateError429 = true;

    setTimeout(() => {
      if (simulateError429) {
        console.log("Simulating 429 Error Response");
        reject({
          response: {
            status: 429,
            data: { message: "Too many failed attempts" },
          },
        });
      } else {
        console.log("Simulating 200 OK Response");
        resolve({
          status: 200,
          data: { token: "fake-jwt-token" },
        });
      }
    }, 1000); // 1-second delay
  });
};

const UserAuth = ({ type }) => {
  const recaptcha = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = recaptcha.current.getValue();
    if (!token) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.token = token;

    if (type === "signup") {
      console.log("Form data to send to backend (signup):", data);
      // Add API call here later
      recaptcha.current.reset();
      navigate("/please-verify");
    } else {
      try {
        const response = await fakeApiLogin(data.email, data.password);
        console.log("Login success", response.data);
        recaptcha.current.reset();
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
        if (error.response?.status === 429) {
          alert("Too many failed attempts. Please verify identity.");
          navigate("/enter-otp", { state: { email: data.email } });
        } else {
          alert("Invalid email or password");
        }
        recaptcha.current.reset();
      }
    }
  };

  return (
    <PageAnimation keyValue={type}>
      <section className="min-h-screen flex items-center justify-center py-10 md:py-20">
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
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

          <button className="btn-dark" type="submit">
            {type.replace("-", " ")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-20 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            type="button"
            className="flex w-full gap-4 items-center justify-center text-white bg-neutral-100 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
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
