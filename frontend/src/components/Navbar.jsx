import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-[#242124] border-b border-[#230E34] fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-[#242124]/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-[#fff]" />
              </div>
              <h1 className="text-lg font-bold text-[#fff]">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn   gap-2 rounded-lg shadow-md transition-colors text-white  bg-[#3F2850] hover:bg-[#5a3d6c]"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <div className="relative">
                <button
                  className="flex gap-2 items-center text-white rounded-lg shadow-md transition-colors bg-[#3F2850] hover:bg-[#5a3d6c] p-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{authUser.fullName || "Profile"}</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#242124] rounded-lg shadow-lg border border-[#230E34]">
                    <Link
                      to={"/profile"}
                      className="block px-4 py-2 text-neon hover:bg-[#3F2850] hover:text-white rounded-t-lg transition-colors"
                    >
                      View Profile
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-neon hover:bg-[#3F2850] hover:text-white rounded-b-lg transition-colors"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
