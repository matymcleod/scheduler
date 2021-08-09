import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
  <article className="appointment">
  
    <Header 
    time={props.time} />

    {mode === EMPTY && 
    <Empty
      onAdd={() =>
        transition(CREATE)
      }
    />
    }

    {mode === SHOW && (
      <SHOW
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      />
    )}


  </article>
};