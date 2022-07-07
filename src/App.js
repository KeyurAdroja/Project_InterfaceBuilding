import "./App.css";
import { BiCalendar, BiTrash } from "react-icons/bi";
import Search from "./Components/Search";
import "./input.css";
import { useState, useEffect, useCallback } from "react";
import AddAppointment from "./Components/AddAppointment";
import AppointmentInfo from "./Components/AppointmentInfo";

function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderBy, setOrderBy] = useState("asc");

  const filteredAppointmentList = appointmentList
    .filter((item) => {
      return item.petName.toLowerCase().includes(query.toLowerCase()) || item.ownerName.toLowerCase().includes(query.toLowerCase()) || item.aptNotes.toLowerCase().includes(query.toLowerCase());
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase() ? -1 * order : 1 * order;
    });

  const fetchData1 = useCallback(async () => {
    let response = await fetch("./data.json");
    let actualData = await response.json();
    setAppointmentList(actualData);
  }, []);

  useEffect(() => {
    fetchData1();
  }, [fetchData1]);
  return (
    <>
      <div className="container my-0 mx-auto mt-3 font-thin">
        <h1 className="text-xl mb-3">
          <BiCalendar className="inline-block text-red-400 align-top" />
          Your Appointment
          <AddAppointment
            onSendAppointment={(myAppointment) => setAppointmentList([...appointmentList, myAppointment])}
            lastId={appointmentList.reduce((max, item) => (Number(item.id) > max ? Number(item.id) : max), 0)}
          />
          <Search
            query={query}
            onQueryChange={(myQuery) => setQuery(myQuery)}
            orderBy={orderBy}
            onOrderByChange={(mySort) => setOrderBy(mySort)}
            sortBy={sortBy}
            onSortByChange={(mySort) => setSortBy(mySort)}
          />
          <ul className="divide-y divide-gray-200">
            {filteredAppointmentList.map((appointment) => (
              <AppointmentInfo
                key={appointment.id}
                appointment={appointment}
                onDeleteAppointment={(appointmentId) => {
                  setAppointmentList(appointmentList.filter((appointment) => appointment.id !== appointmentId));
                }}
              />
            ))}
          </ul>
        </h1>
      </div>
    </>
  );
}

export default App;
