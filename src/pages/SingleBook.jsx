import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getSingleBook, purchaseBook } from "../services/allAPI";
import { ArrowLeft } from "lucide-react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { baseURL } from "../services/baseURL";
import { authContext } from "../context/authCotext";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const SingleBook = () => {
  const { token } = useContext(authContext);

  const [bookData, setBookData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getSingleBookData();
  }, []);

  let { id } = useParams();
  // console.log(id);

  const getSingleBookData = async () => {
    try {
      // let token = localStorage.getItem("token");
      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getSingleBook(id, reqHeader);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.singleBookData);
      } else {
        token.error("Data did not fetched");
      }
      // console.log(apiResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const onBuyClick = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51SochQPiCYe93b1HxkTODsEOZwaZOpJLgAhJjh9GnB0DjbaJ25k7anMZUQ7tzPZ3c3Kd9orK1FoCJPllRoY7FGbP00LEXsESr4"
      );

      let reqBody = {
        bookId: bookData._id,
        bookName: bookData.title,
        bookDesc: bookData.abstract,
        bookImage: bookData.imgURL,
        sellerMail: bookData.userMail,
        price: bookData.price,
        discountPrice: bookData.discountPrice,
      };

      let reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await purchaseBook(reqBody, reqHeader);
      if (apiResponse.status == 200) {
        let session = apiResponse.data.session;
        window.location.href = session.url;
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="mt-3 ml-3">
        <Link
          to={"/books"}
          className="px-3 py-2 bg-blue-500 text-white rounded-2xl flex w-28  hover:bg-blue-600 hover:shadow-2xl items-center"
        >
          <ArrowLeft />
          Go Back
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center p-5 md:p-10">
          <img
            src={bookData?.imgURL}
            alt={bookData?.title}
            className="w-full max-w-xs md:max-w-sm border-4"
          />
        </div>

        <div className="p-5 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold mt-5">
            {bookData?.title}
          </h1>

          <h2 className="text-md md:text-lg font-semibold">
            By: {bookData?.author}
          </h2>

          <h3 className="font-semibold mt-3">{bookData?.abstract}</h3>

          <h4 className="font-bold text-xl md:text-2xl mt-3">
            Rs. {bookData?.price}
          </h4>

          <div className="mt-5 space-y-1">
            <h5>
              <span className="font-semibold mr-1"> Category:</span>
              {bookData?.category}
            </h5>
            <h5>
              <span className="font-semibold mr-1"> Language:</span>
              {bookData?.language}
            </h5>
            <h5>
              <span className="font-semibold mr-1"> Pages:</span>
              {bookData?.noOfPages}
            </h5>
            <h5>
              <span className="font-semibold mr-1"> ISBN:</span>
              {bookData?.ISBN}
            </h5>
            <h5>
              <span className="font-semibold mr-1"> Publisher:</span>
              {bookData?.publisher}
            </h5>
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-blue-500 text-white px-3"
            >
              View more images
            </Button>

            <div>
              <button
                className="px-5 cursor-pointer py-2 bg-green-500 text-white font-bold rounded-lg"
                onClick={onBuyClick}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="text-black bg-black/40 "
      >
        <ModalHeader className="bg-zinc-900 text-white">
          More Images
        </ModalHeader>
        <ModalBody className="bg-zinc-900">
          <div className="space-y-6 flex flex-col mx-5 md:flex-row  gap-5 justify-center">
            {bookData?.uploadedImages?.map((eachImage, index) => (
              <img
                key={index}
                src={`${baseURL}/uploads/${eachImage}`}
                alt=""
                className="h-75"
              />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="bg-zinc-900">
          <Button
            onClick={() => setOpenModal(false)}
            className="bg-blue-500 px-2 m-3 text-white"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SingleBook;
