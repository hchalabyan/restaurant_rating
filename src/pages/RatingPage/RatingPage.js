import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./RatingPage.module.scss";
import RatingStars from "../../Components/RatingStars/RatingStars";

const RatingPage = () => {
  const [info, setInfo] = useState(null);
  const [name, setName] = useState(null);
  const textInputRef = useRef();
  const params = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      const response = await fetch(
        `https://restaurant-c196b-default-rtdb.firebaseio.com/restaurant/${params.id}.json`
      );
      const data = await response.json();
      const detailsInfo = data.desc;
      const detailsName = data.name;
      setInfo(detailsInfo);
      setName(detailsName);
    };

    fetchData().catch();
  }, []);

  const ratingChanged = (newRating) => {
    const sendRating = async (ratingData) => {
      ratingData = newRating;
      const response = await fetch(
        `https://restaurant-c196b-default-rtdb.firebaseio.com/restaurant/${params.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ rating: ratingData }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create rating.");
      }

      return null;
    };
    sendRating().catch();
    console.log(newRating);
  };

  function submitFormHandler(event) {
    event.preventDefault();

    let enteredText = textInputRef.current.value;

    const sendReview = async (sendReview) => {
      sendReview = enteredText;
      const response = await fetch(
        `https://restaurant-c196b-default-rtdb.firebaseio.com/restaurant/${params.id}.json`,
        {
          method: "POST",
          body: JSON.stringify({ review: sendReview }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create review.");
      }

      return null;
    };
    sendReview().catch();
    textInputRef.current.value = "";
  }

  return (
    <div className={classes.Rating}>
      <p className={classes.Title}>{name}</p>
      <p className={classes.Info}>{info}</p>
      <div className={classes.FormWrapper}>
        <form onSubmit={submitFormHandler}>
          <label htmlFor="text">Leave Review</label>
          <textarea id="text" rows="7" ref={textInputRef} />
          <RatingStars
            handleOnchange={ratingChanged}
            rating={5}
            edit
            size={30}
          />
          <div className={classes.Actions}>
            <button className="btn">Add Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RatingPage;
