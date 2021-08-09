
export function getAppointmentsForDay(state, givenDay) {
  const selectedDay = state.days.find(day => day.name === givenDay);
  if (!state.days.length || !selectedDay) {
    return [];
  }
  
  const bookedAppointments = selectedDay.appointments.map((id) => {
    return state.appointments[id];
  });
  return bookedAppointments;
};