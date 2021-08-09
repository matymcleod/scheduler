import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointments";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

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

    const appointments = getAppointmentsForDay(state, state.day);
    console.log(state.interviewers);  
      
    const schedule = appointments.map((appointment) => {
      const interview = getInterview(state, appointmet.interview)
      return (
      <Appointment 
      key={appointment.id}
      {...appointment}
      interview={interview}
      />
      )
    })

return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          {appointments.map(appointment => 
            <Appointment key={appointment.id} {...appointment}
            />)}
        
      </section>
    </main>
  );
}
