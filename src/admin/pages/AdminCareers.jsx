import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { toast } from "react-toastify";
import {
  addJob,
  deleteJob,
  getAllApplications,
  getAllJobs,
} from "../../services/allAPI";
import { authContext } from "../../context/authCotext";
import { baseURL } from "../../services/baseURL";

const AdminCareers = () => {
  const { token } = useContext(authContext);

  const [showJobs, setShowJobs] = useState(true);
  const [showApplications, setShowApplications] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [jobInputData, setJobInputData] = useState({
    jobId: "",
    jobRole: "",
    jobDesc: "",
    publishedDate: "",
    lastDate: "",
    salary: "",
    experiance: "",
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAllJobData();
    getApplications();
  }, []);

  const addNewJob = async () => {
    try {
      // let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await addJob(jobInputData, reqHeader);
      if (apiResponse.status == 201) {
        toast.success("sucessfully added");
        getAllJobData();
        setOpenModal(false);
      } else {
        toast.success(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while adding job");
    }
  };

  const getAllJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      if (apiResponse.status == 200) {
        console.log(apiResponse.data);
        setJobs(apiResponse.data);
      } else {
        toast.success(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while adding job");
    }
  };

  const getApplications = async () => {
    try {
      // let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllApplications(reqHeader);
      if (apiResponse.status == 200) {
        console.log(apiResponse.data);
        setApplications(apiResponse.data);
      } else {
        toast.success(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while adding job");
    }
  };

  const onClickDeleteJob = async (id) => {
    try {
      let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await deleteJob(id, reqHeader);
      if (apiResponse.status == 200) {
        toast.success("Job Deleted");
        getAllJobData();
      } else {
        toast.success(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while deleting job");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSidebar />
        <div className="text-center mt-10">
          <button
            className="border  p-2 bg-blue-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-blue-700 active:scale-95"
            onClick={() => {
              setShowJobs(true);
              setShowApplications(false);
            }}
          >
            Jobs
          </button>
          <button
            className="border  p-2 bg-blue-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-blue-700 active:scale-95"
            onClick={() => {
              setShowJobs(false);
              setShowApplications(true);
            }}
          >
            Applications
          </button>

          {showJobs && (
            <div>
              <div>
                <h1 className="text-center font-semibold text-2xl">All Jobs</h1>
                <div className="text-end m-4">
                  <button
                    className="border  p-2 bg-green-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-green-700 active:scale-95"
                    onClick={() => setOpenModal(true)}
                  >
                    Add Job
                  </button>
                </div>
              </div>
              {jobs?.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-3 p-8">
                  {jobs?.map((eachJobs, index) => (
                    <div
                      key={index}
                      className="border border-slate-400 rounded-lg p-4 shadow-sm text-start"
                    >
                      <p>
                        <span className="font-medium">Job Id: </span>
                        {eachJobs.jobId}
                      </p>

                      <p>
                        <span className="font-medium">{eachJobs.jobRole}</span>
                      </p>

                      <p className="text-sm text-slate-600">
                        {eachJobs.jobDesc}
                      </p>

                      <div className="mt-2 text-sm">
                        <p>
                          <span className="font-medium">Published: </span>
                          {eachJobs.publishedDate}
                        </p>
                        <p>
                          <span className="font-medium">Last Date: </span>
                          {eachJobs.lastDate}
                        </p>
                        <p>
                          <span className="font-medium">Salary: </span>
                          {eachJobs.salary}
                        </p>
                        <p>
                          <span className="font-medium">Experience: </span>
                          {eachJobs.experiance}
                        </p>
                        <div className="mt-4 text-end">
                          <button
                            className="bg-red-100 text-red-500 border border-red-500 px-2 py-1 rounded-lg hover:text-red-100 hover:bg-red-500 cursor-pointer font-semibold"
                            onClick={() => onClickDeleteJob(eachJobs._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center min-h-[200px]">
                    <h1 className="text-xl text-red-500">No Jobs added</h1>
                  </div>
                </div>
              )}
            </div>
          )}
          {showApplications && (
            <div>
              {applications?.length > 0 ? (
                <div>
                  {applications?.map((eachApplications, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 border border-slate-200 rounded-lg m-2   bg-white"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium text-gray-900">
                          {eachApplications.fullName}
                        </p>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Job ID</p>
                        <p className="text-gray-800">
                          {eachApplications.jobId}
                        </p>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="text-gray-800">
                          {eachApplications.jobRole}
                        </p>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-800 truncate">
                          {eachApplications.email}
                        </p>
                      </div>

                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-800">
                          {eachApplications.phoneNumber}
                        </p>
                      </div>

                      <a
                        target="_blank"
                        href={`${baseURL}/uploads/${eachApplications.resume}`}
                      >
                        <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-500 rounded-md hover:bg-blue-700 hover:text-white cursor-pointer">
                          View Resume
                        </button>
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="flex justify-center items-center min-h-[200px]">
                    <h1 className="text-xl text-red-500">
                      No Applications found
                    </h1>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className="bg-zinc-800">
          <h1 className="text-white">Add new Job</h1>
        </ModalHeader>
        <ModalBody className="bg-zinc-800 ">
          <div className="space-y-6 flex justify-between">
            <div>
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Job ID"
                value={jobInputData.jobId}
                onChange={(e) =>
                  setJobInputData({ ...jobInputData, jobId: e.target.value })
                }
              />
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Job Role"
                value={jobInputData.jobRole}
                onChange={(e) =>
                  setJobInputData({ ...jobInputData, jobRole: e.target.value })
                }
              />
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Job Discription"
                value={jobInputData.jobDesc}
                onChange={(e) =>
                  setJobInputData({ ...jobInputData, jobDesc: e.target.value })
                }
              />
            </div>
            <div>
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Published Date"
                value={jobInputData.publishedDate}
                onChange={(e) =>
                  setJobInputData({
                    ...jobInputData,
                    publishedDate: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Last Date"
                value={jobInputData.lastDate}
                onChange={(e) =>
                  setJobInputData({ ...jobInputData, lastDate: e.target.value })
                }
              />
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Salary"
                value={jobInputData.salary}
                onChange={(e) =>
                  setJobInputData({ ...jobInputData, salary: e.target.value })
                }
              />
              <input
                type="text"
                className="bg-zinc-100 px-3 py-2 rounded-lg w-100 m-1"
                placeholder="Experiance required"
                value={jobInputData.experiance}
                onChange={(e) =>
                  setJobInputData({
                    ...jobInputData,
                    experiance: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="bg-zinc-800">
          <Button
            onClick={() => setOpenModal(false)}
            className="border  p-2 bg-blue-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-blue-700 active:scale-95"
          >
            close
          </Button>
          <Button
            onClick={addNewJob}
            className="border  p-2 bg-green-500 text-white font-semibold rounded-xl m-2 cursor-pointer hover:bg-green-700 active:scale-95"
          >
            Add job
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AdminCareers;
