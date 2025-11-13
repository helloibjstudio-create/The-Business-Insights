export default function MaintenancePage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black text-white">
      <div className="text-center px-6">
        <h1 className="text-4xl font-bold mb-4">We’ll Be Right Back</h1>
        <p className="text-lg text-gray-300">
          Our site is temporarily down for maintenance.<br />
          Please check back shortly.
        </p>

        <div className="mt-8 animate-spin h-10 w-10 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
