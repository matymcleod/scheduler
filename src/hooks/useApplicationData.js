import React, { useState, useEffect } from "react";
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
      setState(prev => ({...prev, days, appointments, interviewers }));
    });
    }, [])

    function bookInterview(id, interview) {
      console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
  
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      return axios
        .put(`http://localhost:8001/api/appointments/${id}`, appointment)
        .then((res) => {
          setState({
            ...state,
            appointments
          });
          // updateSpots(id);
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
          return res;
        })
      }
      
    return { state, setDay, bookInterview, cancelInterview }
}