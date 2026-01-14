import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../../admin/components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import { authContext } from "../../context/authCotext";
import { toast } from "react-toastify";
import {
  getAllApplications,
  getAllBooks,
  getAllJobs,
  getAllUsers,
} from "../../services/allAPI";

const AdminHome = () => {
  const { token } = useContext(authContext);

  const [totalBooks, setTotalBooks] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [totalJobs, setTotalJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState([]);

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let totalBookApiResponse = await getAllBooks(reqHeader, "");
      let totalUserApiResponse = await getAllUsers(reqHeader);
      let totalJobOpeningsApiResponse = await getAllJobs();
      let totalAllApplicationsApiResponse = await getAllApplications(reqHeader);
      console.log(totalBookApiResponse);
      console.log(totalUserApiResponse);
      console.log(totalJobOpeningsApiResponse);
      console.log(totalAllApplicationsApiResponse);

      if (totalBookApiResponse.status == 200) {
        setTotalBooks(totalBookApiResponse.data.bookData.length);
      }

      if (totalUserApiResponse.status == 200) {
        setTotalUsers(totalUserApiResponse.data.length);
      }

      if (totalJobOpeningsApiResponse.status == 200) {
        setTotalJobs(totalJobOpeningsApiResponse.data.length);
      }

      if (totalAllApplicationsApiResponse.status == 200) {
        setTotalApplications(totalAllApplicationsApiResponse.data.length);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while fetching data");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div className="flex flex-wrap gap-3 m-2">
          <div className="border flex-4 h-30 flex justify-center flex-col items-center rounded-xl border-slate-400">
            <h2 className="text-3xl font-semibold">{totalBooks}</h2>
            <h1 className="font-semibold">Total Books</h1>
          </div>
          <div className="border flex-4 h-30 flex justify-center flex-col items-center rounded-xl border-slate-400">
            <h2 className="text-3xl font-semibold">{totalUsers}</h2>
            <h1 className="font-semibold">Total Users</h1>
          </div>
          <div className="border flex-4 h-30 flex justify-center flex-col items-center rounded-xl border-slate-400">
            <h2 className="text-3xl font-semibold">{totalJobs}</h2>
            <h1 className="font-semibold">Total Job Openings</h1>
          </div>
          <div className="border flex-4 h-30 flex justify-center flex-col items-center rounded-xl border-slate-400">
            <h2 className="text-3xl font-semibold">{totalApplications}</h2>
            <h1 className="font-semibold">Total Applications</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
