import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // the ...state replaces day in state
  const setDay = function(day) {
    setState({...state, day})
  };

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({...prev, days, appointments, interviewers}));
    });
  }, []);

  function bookInterview(id, interview) {
  const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        const days = updateSpots(state.day, state.days, appointments);
        setState({
          ...state,
          appointments,
          days
        });
        return true;
      });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then((res) => {
        const days = updateSpots(state.day, state.days, appointments);
        setState({
          ...state,
          appointments,
          days
        });
        return res;
      });
  }
  
  const updateSpots = function (dayName, days, appointments) {
    const dayObj = days.find(day => day.name === dayName);
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = {...dayObj, spots};
    const newDays = days.map(day => day.name === dayName ? newDay : day);
    return newDays;
  };
  return { state, setDay, bookInterview, cancelInterview };
}