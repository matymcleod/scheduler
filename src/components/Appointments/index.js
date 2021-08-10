import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status"
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";


export default function Appointment(props) {


  console.log('this is index ----------:', props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }

    transition(SAVING);

    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function remove(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(SHOW);
      })
  }


  return (
  <article className="appointment">
  
    <Header 
    time={props.time} 
    />

    {mode === EMPTY && (
    <Empty
      onAdd={() =>
        transition(CREATE)
      }
    />
    )}

    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      />
    )}

    {mode === CREATE && (
    <Form
    interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
    )}

    {mode === SAVING && (
      <Status 
        message={"Saving"}
      />
    )}

    {mode === CONFIRM && (
      <Confirm
        message={"Confirm..."}
        onCancel={back}
        onConfirm={remove}
      />
    )}


  </article>
  );
};