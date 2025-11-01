
const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[500px] text-center p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-georgia mb-4">Check Your Email</h1>
        <p className="text-xl text-gray-700">
          Success! We've sent a verification link to your email address. Please
          click the link to complete your registration.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
