import React, { useState, useEffect } from "react"
import axios from "axios"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import InteractionPlugin from "@fullcalendar/interaction"
import StyledWrapper from "./elements"
import Modal from "react-modal"
import dayjs from "dayjs"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import ModalDiv from "./EventModal"
import { Button } from "@mui/material"
import { useOutletContext, useParams } from "react-router-dom"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
  },
  overlay: { zIndex: 1000, backgroundColor: "rgb(23,25,35, 0.4)" },
}

Modal.setAppElement("#root")

const Calendar = () => {
  const { userRole } = useOutletContext()

  const [calendarData, setCalendarData] = useState(false)
  const [events, setEvents] = useState([]) // Important for the backend

  const calendarRef = React.createRef()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/calendar/${id}`,
      })
        .then((res) => {
          // get all events from database
          setEvents(res.data.events)
          setCalendarData(res.data.success)
        })
        .catch((err) => console.error(err))
    }

    fetchData()
  }, [])

  const [eventTitle, setEventTitle] = useState("")
  const [startDate, setStartDate] = useState({})
  const [endDate, setEndDate] = useState({})

  const [startValue, setStartValue] = useState(dayjs(new Date().toISOString()))
  const [endValue, setEndValue] = useState(
    dayjs(new Date(new Date().setHours(new Date().getDate() + 1)).toISOString())
  )

  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
    setStartValue(new Date().toISOString())
    setEndValue(
      new Date(new Date().setHours(new Date().getHours() + 1)).toISOString()
    )
  }
  const closeModal = async () => {
    setIsOpen(false)
  }

  const [postEventErrors, setPostEventErrors] = useState({})

  const handleSubmit = async () => {
    await axios({
      method: "post",
      url: `http://localhost:5000/calendar/${id}`,
      data: { eventTitle, startDate, endDate },
    })
      .then((res) => {
        closeModal()
        const event = res.data.event
        setEvents([...events, event])
      })
      .catch(async (err) => {
        try {
          if (err.response.data.errors) {
            setPostEventErrors(err.response.data.errors)
            setTimeout(() => {
              setPostEventErrors({})
            }, 3000)
          } else {
            console.log(err)
            closeModal()
          }
        } catch (err) {
          console.log(err)
        }
      })
  }

  const [eventOpen, setEventOpen] = useState(false)
  const closeEvent = async () => {
    setEventOpen(false)
    setEventTitle("")
  }

  const [eventSelected, setEventSelected] = useState("")

  const handleEvent = async (info) => {
    const eventId = info.event._def.extendedProps._id
    await axios({
      method: "get",
      url: `http://localhost:5000/event/${eventId}`,
    })
      .then(async (res) => {
        const { _id, title, start, end } = res.data.event
        setEventTitle(title)
        setStartValue(start)
        setEndValue(end)
        setEventOpen(true)
        setEventSelected(_id)
      })
      .catch((err) => console.log(err))
  }

  const updateEvent = async () => {
    await axios({
      method: "patch",
      url: `http://localhost:5000/event/${eventSelected}`,
      data: { eventTitle, startDate, endDate },
    })
      .then((res) => {
        closeEvent()
        setEventSelected("")
        const { events } = res.data
        setEvents(events)
      })
      .catch((err) => console.log(err))
  }

  const deleteEvent = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:5000/event/${eventSelected}`,
    })
      .then((res) => {
        closeEvent()
        setEventSelected("")
        const { events } = res.data
        setEvents(events)
      })
      .catch((err) => console.log(err))
  }

  switch (calendarData) {
    case false:
      return <div>Something went wrong please try again later...</div>
    case true:
      return (
        <StyledWrapper>
          <FullCalendar
            ref={calendarRef}
            events={events}
            dateClick={openModal}
            eventClick={(info) => handleEvent(info)}
            plugins={[dayGridPlugin, timeGridPlugin, InteractionPlugin]}
            initialView="timeGridWeek"
            height={userRole === "Teacher" ? "84.6vh" : "82.4vh"}
            headerToolbar={{
              left: "prev next",
              center: "title",
              right: "timeGridWeek dayGridMonth",
            }}
            editable
            selectable
            dayMaxEvents={true}
            allDaySlot={false}
            views={{
              dayGridMonth: {
                titleFormat: { year: "numeric", month: "long" },
              },
              timeGridWeek: {
                titleFormat: {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
                dayHeaderFormat: { weekday: "short", day: "2-digit" },
                slotLabelFormat: { hour: "numeric" },
              },
            }}
            displayEventTime={true}
            eventDisplay="block"
            eventColor="#3AAFA9"
            nowIndicator={true}
            scrollTime={new Date().toISOString().split("T")[1].split(".")[0]}
          />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1 style={{ margin: "0px 0px 5px 0px", textAlign: "center" }}>
              Create a new Event
            </h1>
            <form display="flex">
              <ModalDiv>
                <TextField
                  variant="outlined"
                  label={
                    postEventErrors["title"]
                      ? postEventErrors["title"]
                      : "Enter title"
                  }
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  style={{ margin: "15px" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} style={{ margin: "15px" }} />
                    )}
                    label="Start Date"
                    value={startValue}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(newValue) => {
                      setStartValue(newValue)
                      setStartDate(newValue)
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} style={{ margin: "15px" }} />
                    )}
                    label="End Date"
                    value={endValue}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(newValue) => {
                      setEndValue(newValue)
                      setEndDate(newValue)
                    }}
                  />
                </LocalizationProvider>
              </ModalDiv>
            </form>
            <ModalDiv>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                style={{ marginTop: "5px" }}
              >
                Create Event
              </Button>
            </ModalDiv>
          </Modal>
          <Modal
            isOpen={eventOpen}
            onRequestClose={closeEvent}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1 style={{ margin: "0px 0px 5px 0px", textAlign: "center" }}>
              Edit {eventTitle}
            </h1>
            <form display="flex">
              <ModalDiv>
                <TextField
                  variant="outlined"
                  label={
                    postEventErrors["title"]
                      ? postEventErrors["title"]
                      : "Enter title"
                  }
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  style={{ margin: "15px" }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} style={{ margin: "15px" }} />
                    )}
                    label="Start Date"
                    value={startValue}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(newValue) => {
                      setStartValue(newValue)
                      setStartDate(newValue)
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField {...props} style={{ margin: "15px" }} />
                    )}
                    label="End Date"
                    value={endValue}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(newValue) => {
                      setEndValue(newValue)
                      setEndDate(newValue)
                    }}
                  />
                </LocalizationProvider>
              </ModalDiv>
            </form>
            <ModalDiv>
              <Button
                variant="outlined"
                onClick={updateEvent}
                style={{ marginTop: "5px" }}
              >
                Update Event
              </Button>
              <Button
                variant="outlined"
                onClick={deleteEvent}
                style={{ marginTop: "5px" }}
              >
                Delete Event
              </Button>
            </ModalDiv>
          </Modal>
        </StyledWrapper>
      )
  }
}

export default Calendar
