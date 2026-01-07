export default function Layout({ children }) {
  return (
    <div className="flex bg-[#0d0f1a] text-white min-h-screen">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-gray-700 p-6 space-y-6">
        <h1 className="text-2xl font-bold tracking-wide text-blue-400">
          PRASHIKSHAN
        </h1>
        <nav className="flex flex-col space-y-4 text-lg">
          <a href="/dashboard" className="hover:text-blue-400">Dashboard</a>
          <a href="/student/profile" className="hover:text-blue-400">Edit Profile</a>
          <a href="/student/view" className="hover:text-blue-400">View Profile</a>
          <a href="/student/recommend" className="hover:text-pink-400">Recommendations</a>
        </nav>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="text-left text-red-400 hover:text-red-500"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
