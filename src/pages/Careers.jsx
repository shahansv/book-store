import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { applyJob, getAllJobs } from "../services/allAPI";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const Careers = () => {
  const [jobs, setJobs] = useState({});
  const [applyData, setApplyData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    jobId: "",
    jobRole: "",
    resume: "",
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAllJobData();
  }, []);

  const getAllJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      if (apiResponse.status == 200) {
        console.log(apiResponse.data);
        setJobs(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while adding job");
    }
  };

  const onApplyClick = async () => {
    try {
      let reqHeader = {
        "Content-Type": "multipart/form-data",
      };

      let reqBody = new FormData();

      for (let key in applyData) {
        reqBody.append(key, applyData[key]);
      }

      let apiResponse = await applyJob(reqBody, reqHeader);
      if (apiResponse.status == 201) {
        toast.success("Applied");
        setApplyData({
          fullName: "",
          phoneNumber: "",
          email: "",
          jobId: "",
          jobRole: "",
          resume: "",
        });

        setOpenModal(false);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something when wrong while applying job");
    }
  };
  return (
    <>
      <div>
        <Header />

        <div className="m-8">
          <h1 className="font-semibold text-3xl text-center ">Carrers</h1>
        </div>

        <div>
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

                  <p className="text-sm text-slate-600">{eachJobs.jobDesc}</p>

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
                        className="bg-blue-100 text-blue-500 border border-blue-500 px-2 py-1 rounded-lg hover:text-blue-50 hover:bg-blue-500 cursor-pointer font-semibold"
                        onClick={() => {
                          setApplyData({
                            ...applyData,
                            jobId: eachJobs.jobId,
                            jobRole: eachJobs.jobRole,
                          });
                          setOpenModal(true);
                        }}
                      >
                        Apply
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

        <Footer />
      </div>
      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="mx-40"
      >
        <ModalHeader className="bg-slate-900">
          <p className="text-white">Apply</p>
        </ModalHeader>
        <ModalBody className="bg-slate-900">
          <div className="space-y-6 flex gap-8">
            <div className="flex gap-3 flex-col">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-slate-100 px-3 py-2 rounded-lg w-75"
                value={applyData.fullName}
                onChange={(e) =>
                  setApplyData({ ...applyData, fullName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="bg-slate-100 px-3 py-2 rounded-lg w-75"
                value={applyData.phoneNumber}
                onChange={(e) =>
                  setApplyData({ ...applyData, phoneNumber: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-slate-100 px-3 py-2 rounded-lg w-75"
                value={applyData.email}
                onChange={(e) =>
                  setApplyData({ ...applyData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="resume" className="text-slate-100">
                Resume:
              </label>
              <input
                type="file"
                id="resume"
                className="text-slate-100 border border-dashed h-40 border-slate-500"
                onChange={(e) =>
                  setApplyData({ ...applyData, resume: e.target.files[0] })
                }
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="bg-slate-900">
          <Button
            onClick={() => setOpenModal(false)}
            className="bg-blue-500 px-2 m-3 text-white cursor-pointer"
          >
            Close
          </Button>
          <Button
            onClick={onApplyClick}
            className="bg-green-500 px-2 m-3 text-white cursor-pointer"
          >
            Apply
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Careers;
