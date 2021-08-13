export function getAppointmentsForDay(state, givenDay) {
  
  const selectedDay = state.days.find(day => day.name === givenDay);
  if (!state.days.length || !selectedDay) {
    return [];
  }
  
  const bookedAppointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });
  return bookedAppointments;
}

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewer = state.interviewers[interviewerId];

  return { student: interview.student, interviewer: interviewer};
}

export function getInterviewersForDay(state, givenDay) {
  const found = state.days.find(day => day.name === givenDay);

  if(!state.days.length || !found) {
    return [];
  }
  return found.interviewers.map(id => state.interviewers[id]);
}
