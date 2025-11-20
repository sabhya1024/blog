
const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[500px] text-center p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-georgia mb-4">Check Your Email</h1>
        <p className="text-xl text-gray-700">
          Success! We've sent a verification link to your email address. Please
          click the link to complete your registration.
        </p>
        <form id="otp-form" className="mt-5">
          <div className="flex items-center justify-center gap-3">
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-gray-200 border border-black hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxlength="1"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-gray-200 border border-black hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxlength="1"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-gray-200 border border-black hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxlength="1"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-gray-200 border border-black hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxlength="1"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-gray-200 border border-black hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxlength="1"
            />
            <input
              type="text"
              className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-gray-200 border border-black hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              maxlength="1"
            />
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
              Verify Account
            </button>

            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-black focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150 mt-5">
              Resend OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckEmail;
