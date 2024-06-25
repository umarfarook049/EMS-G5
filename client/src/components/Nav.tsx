import { userInfo } from "@/store/atom";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function AdminNav() {
  const [user, setUser] = useRecoilState(userInfo);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (sessionUser) {
      setUser(sessionUser);
      setIsAdmin(sessionUser.IsAdmin);
    }
    setLoading(false);
  }, []);

  const handleOnclick = () => {
    sessionStorage.clear();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="navbar text-white bg-amber-600 p-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          {user && (
            <>
              {isAdmin ? <p>Admin Dashboard</p> : <p>Employee Dashboard</p>}
            </>
          )}
        </div>
        <div className="flex space-x-6">
          {user && (
            <>
              {isAdmin ? (
                <>
                  <Link
                    to={"/dashboard/admin"}
                    className="px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"/dashboard/newemployee"}
                    className="px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add Employee
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"/dashboard"}
                    className="px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to={"/payslip"}
                    className="px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Download My Payslip
                  </Link>
                </>
              )}
            </>
          )}
          <Link
            to={"/"}
            onClick={handleOnclick}
            className="px-4 py-2 rounded hover:bg-blue-700"
          >
            Log Out
          </Link>
        </div>
      </div>
      <div className="flex-grow p-5">
        <Outlet />
      </div>
      <div className="text-center text-sm p-2 bg-amber-600 text-white">
        Employee Management System @Group 5
      </div>
    </div>
  );
}
