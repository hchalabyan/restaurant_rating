import React, { useEffect, useState } from "react";
import classes from "./AllRestaurants.module.scss";
import Map from "../Components/Map/Map";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const AllRestaurants = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        "https://restaurant-c196b-default-rtdb.firebaseio.com/restaurant.json"
      );
      const json = await data.json();
      console.log(json);
      const transformedRestaurantObj = [];

      for (const key in json) {
        const restaurantObjObj = {
          id: key,
          ...json[key],
        };

        transformedRestaurantObj.push(restaurantObjObj);
      }
      console.log(transformedRestaurantObj);
      setList(transformedRestaurantObj);
    };
    fetchData().catch();
  }, []);
  console.log("list =", list);
  const locationData = [];
  for (const key in list) {
    const locationObj = {
      desc: list[key].desc,
      ...list[key].location,
    };

    locationData.push(locationObj);
  }

  console.log("locationData", locationData);
  return (
    <div className={classes.Container}>
      <div className={classes.RestaurantWrapper}>
        {list
          .sort((a, b) => (a.rating > b.rating ? 1 : -1))
          .map((elem) => {
            return (
              <div key={elem.id} className={classes.RestaurantInfoWrapper}>
                <img
                  className={classes.RestaurantImage}
                  src={elem.img}
                  alt="elem.img"
                />
                <Link
                  className={classes.ViewBtn}
                  to={`/restaurant/${elem.id}`}
                  target="_blank"
                >
                  View Restaurant
                </Link>
                <ReactStars
                  count={elem.rating ? elem.rating : 5}
                  onChange={ratingChanged}
                  size={24}
                  isHalf={true}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
              </div>
            );
          })}
      </div>

      <Map locations={locationData} desc={locationData.desc} />
    </div>
  );
};

export default AllRestaurants;
