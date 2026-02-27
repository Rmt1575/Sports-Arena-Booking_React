import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const GetApiDemo = () => {
  // State to hold the list of users
  const [users, setusers] = useState([]);

  // Function to fetch users from the API
  const getUsers = async () => {
    const res = await axios.get("https://node5.onrender.com/user/user/");
    console.log("response", res);
    setusers(res.data.data);
  };

  // useEffect to call getUsers when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  // delete user function
  const deleteUser = async (id) => {
    const res = await axios.delete(
      `https://node5.onrender.com/user/user/${id}`,
    );
    console.log("delete response", res);
    if (res.status == 204) {
      toast.success("User deleted successfully");
      getUsers();
    }
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1
        className="text-2xl font-bold mb-6 text-slate-800"
        style={{ textAlign: "center" }}
      >
        User Details
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold">Name</th>
              <th className="px-6 py-3 text-sm font-semibold">Email</th>
              <th className="px-6 py-3 text-sm font-semibold">Age</th>
              <th className="px-6 py-3 text-sm font-semibold">ACTION</th>
            </tr>
          </thead>

          <tbody className="text-slate-700">
            {users.map((user, index) => {
              return (
                <tr className="border-b hover:bg-slate-50 transition">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.age}</td>
                  <td className="px-6 py-3">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                      onClick={() => {
                        deleteUser(user._id);
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
