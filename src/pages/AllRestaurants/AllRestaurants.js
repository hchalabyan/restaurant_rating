import React, { useEffect, useState } from "react";
import classes from "./AllRestaurants.module.scss";
import Map from "../../Components/Map/Map";
import { Link } from "react-router-dom";
import { FIREBASE_DOMAIN } from "../../api";
import RatingStars from "../../Components/RatingStars/RatingStars";

const AllRestaurants = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/restaurant.json`);
      const data = await response.json();
      const restaurantArray = [];

      for (const key in data) {
        const restaurantObj = {
          id: key,
          ...data[key],
        };

        restaurantArray.push(restaurantObj);
      }
      setRestaurantList(restaurantArray);
    };
    fetchData().catch();
  }, []);

  const locationData = [];

  for (const key in restaurantList) {
    const locationObj = {
      desc: restaurantList[key].desc,
      ...restaurantList[key].location,
    };

    locationData.push(locationObj);
  }

  return (
    <div className={classes.Container}>
      <div className={classes.RestaurantWrapper}>
        {restaurantList
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
                <RatingStars rating={elem.rating} edit={false} size={24} />
              </div>
            );
          })}
      </div>
      <Map locations={locationData} desc={locationData.desc} />
    </div>
  );
};

export default AllRestaurants;
