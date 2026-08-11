const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page Not Found</p>
      <a
        href="/"
        className="px-6 py-3 bg-sky-500 text-slate-950 rounded-lg hover:bg-sky-400 transition"
      >
        Go Back Home
      </a>
    </div>
  );
};
export default NotFound;
