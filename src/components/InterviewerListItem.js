import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";
import { timeout } from "q";


export default function InterviewerListItem(props) {

  const interviewerClass = classNames ("interviewers__item", {

   "interviewers__item--selected": props.selected
  });
  
  const imageClassName = classNames ("interviewers__item-image", {

   "interviewers__item--selected-image": props.selected
  });



console.log('interviewerClass:',interviewerClass);
  return (
  <li className={interviewerClass}>
    <img
      className="interviewers__item-image"
      src="https://i.imgur.com/LpaY82x.png"
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  );
};