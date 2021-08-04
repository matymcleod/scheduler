import React from "react";

import InterviewerListItem from"./InterviewerListItem";

export default function InterviewerList(props){

  return(

  <ul>

    { props.interviewer.map((name) => <InterviewerListItem id={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={interviewer.name === props.name} setInterviewer={props.setInterviewer}/>) }
  
  </ul>

  )
}