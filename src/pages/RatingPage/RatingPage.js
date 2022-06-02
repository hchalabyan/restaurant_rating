import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./RatingPage.module.scss";
import ReactStars from "react-rating-stars-component";

const RatingPage = () => {
  const [info, setInfo] = useState(null);
  const [name, setName] = useState(null);
  const textInputRef = useRef();

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
      for (const key in data) {
        console.log(data);
      }
      console.log(data);

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
      const ratingArray = [];
      for (const key in data) {
        console.log(data);
        const ratingArrayObj = {
          id: key,
          ...data[key],
        };
        ratingArray.push(ratingArrayObj);
      }
      console.log(ratingArray);
      if (!response.ok) {
        throw new Error(data.message || "Could not create review.");
      }

      return null;
    };
    sendReview().catch();
    textInputRef.current.value = "";
  }
  const clearDataHandler = () => {};
  const params = useParams();
  useEffect(() => {
    const fetchData = async (id) => {
      const data = await fetch(
        `https://restaurant-c196b-default-rtdb.firebaseio.com/restaurant/${params.id}.json`
      );
      const json = await data.json();
      const detailsInfo = json.desc;
      const detailsName = json.name;
      setInfo(detailsInfo);
      setName(detailsName);
    };

    fetchData().catch();
  }, []);
  return (
    <div className={classes.Rating}>
      <p className={classes.Title}>{name}</p>
      <p className={classes.Info}>{info}</p>
      <div className={classes.FormWrapper}>
        <form onSubmit={submitFormHandler}>
          <label htmlFor="text">Leave Review</label>
          <textarea id="text" rows="7" ref={textInputRef} />
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={32}
            isHalf={true}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
          />
          <div className={classes.Actions}>
            <button onClick={clearDataHandler} className="btn">
              Add Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RatingPage;
