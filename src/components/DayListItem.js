import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {
  
  const dayClass = classNames ("day-list__item", {
    
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  
  const formatSpots = numberOfSpots => {

    if (numberOfSpots === 0) {
      return 'no spots remaining';
    }

    if (numberOfSpots === 1) {
      return '1 spot remaining';
    }

    if (numberOfSpots > 1) {
      return `${numberOfSpots} spots remaining`;
    }

  };
  
  return (
    <li className = { dayClass } onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

