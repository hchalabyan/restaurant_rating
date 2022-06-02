import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingStars = (props) => {
  return (
    <ReactStars
      count={props.rating ? props.rating : 5}
      size={props.size}
      isHalf={false}
      halfIcon={<i className="fa fa-star-half-alt" />}
      fullIcon={<i className="fa fa-star" />}
      activeColor="#ffd700"
      color={!props.edit && "#ffd700"}
      onChange={props.handleOnchange}
      edit={props.edit}
    />
  );
};
export default RatingStars;
