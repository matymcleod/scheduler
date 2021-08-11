import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview && props.interview !== null ? SHOW : EMPTY
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
    .catch(error => transition(ERROR_SAVE, true));
  }

  function remove(event) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(error => {
        transition(ERROR_DELETE, true)
      });
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
      onEdit={() => transition(EDIT)}
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
    
    {mode === DELETING && (
      <Status 
        message={"Deleting"}
      />
    )}

    {mode === CONFIRM && (
      <Confirm
        message={"Confirm..."}
        onCancel={back}
        onConfirm={remove}
      />
    )}

    {mode === EDIT && (
      <Form
      name={props.interview.student}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      onCancel={back}
      onSave={save}
      />
    )}

    {mode === ERROR_SAVE && (
      <Error
        message={"Saving error"}
        onClose={() => {back(); back();}}
        />
    )}

    {mode === ERROR_DELETE && (
      <Error
        message={"Deleting error"}
        onClose={() => {back();}}
        />
    )}


  </article>
  );
};