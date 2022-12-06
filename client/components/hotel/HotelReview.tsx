import React, { useEffect, useState } from "react";
import { usePostReviewMutation } from "../../services/hotelApi";
import moment from "moment";
import { Button } from "../../components/core";
import Image from "next/image";
import { AiOutlineClose } from "../../utils/icons";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setReviews, addReviews } from "../../features/appSlice";

const HotelReview = ({ id, hotel, setShowModal }: any) => {
  const [postReview] = usePostReviewMutation();
  const [review, setReview] = useState("");
  const [score, setScore] = useState(10);

  const { user } = useAppSelector((state) => state.persistedReducer.auth)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setReviews(hotel.reviews))
  }, [dispatch, hotel.reviews, setShowModal, id])

  const { reviews } = useAppSelector((state) => state.persistedReducer.app)

  const handleChangeReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScore(+e.target.value);
  };

  const handleReview = async () => {
    if (!review || !score) {
      toast.error("Please enter all fields");
    } else if (score < 0 || score > 10) {
      toast.error("Score must be between 0 - 10");
    } else {
      postReview({ id, review, score });
      dispatch(addReviews({ id, review, score, user }));
      setReview("");
      toast.success("Review successfully");
    }
  };
  return (
    <>
      <div className="items-right flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="relative w-auto h-auto max-w-3xl ml-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-0 shadow-lg relative flex flex-col w-full h-auto min-h-full bg-white outline-none focus:outline-none">
            {reviews?.length > 0 ? (
              <div>
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="font-bold text-2xl mb-4 text-black contents">
                    Guest reviews
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <AiOutlineClose />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  {reviews?.map((review: any, index) => (
                    <div key={index}>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <div>
                            <Image
                              className="w-full object-cover"
                              width={32}
                              height={32}
                              src={review?.user?.avatar}
                              alt={review?.user?.avatar}
                            />
                          </div>
                          <p className="ml-2 text-black text-lg leading-relaxed flex-1 w-auto font-semibold capitalize">
                            {review?.user?.name || review?.user?.username}
                          </p>
                        </div>
                        <div className="ml-6">
                          <p className="text-gray-500 text-xs leading-relaxed flex-1 w-64">
                            Reviewed: {moment(review.updatedAt).format("LLL")}
                          </p>
                          <p className="text-black text-xl leading-relaxed flex-1 w-64 mr-2">
                            {review.review}
                          </p>
                        </div>
                        <div>
                          <div className="items-center p-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg float-right lg:mb-4">
                            {review.score.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      <hr className="my-6"></hr>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">No reviews</h3>
              </div>
            )}
            <div className="relative p-6 flex-auto">
              <span className="text-black">Write review</span>
              <input
                value={review}
                className="form-input block rounded my-4 w-full w-96"
                placeholder="Very good hotel"
                onChange={handleChangeReview}
              />
              <span className="text-black">Score</span>
              <input
                value={score}
                type="number"
                className="form-input block rounded my-4"
                placeholder="9.5"
                onChange={handleChangeScore}
              />
              <div onClick={handleReview}>
                <Button
                  text="Review"
                  textColor="text-white"
                  bgColor="bg-primary"
                  fullWidth={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default HotelReview;
