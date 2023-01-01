import React, { useState, useEffect, useRef } from "react"
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
import { useParams } from "react-router-dom"

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
  const [calendarData, setCalendarData] = useState(false)
  const [events, setEvents] = useState([]) // Important for the backend

  const calendarRef = React.createRef()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = () => {
      axios({
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

  const handleSelect = (info) => {
    const { start, end } = info
    openModal()
  }

  const [startValue, setStartValue] = useState(dayjs(new Date().toISOString()))
  const [endValue, setEndValue] = useState(
    dayjs(new Date(new Date().setHours(new Date().getDate() + 1)).toISOString())
  )

  const [modalIsOpen, setIsOpen] = React.useState(false)
  const openModal = () => {
    setIsOpen(true)
    setStartValue(new Date().toISOString())
    setEndValue(
      new Date(new Date().setHours(new Date().getDate() + 1)).toISOString()
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
          } else {
            console.log(err)
          }
          closeModal()
        } catch (err) {
          console.log(err)
        }
      })
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
            select={handleSelect}
            eventClick={(info) => console.log(info)}
            plugins={[dayGridPlugin, timeGridPlugin, InteractionPlugin]}
            initialView="dayGridMonth"
            height="85.2vh"
            headerToolbar={{
              left: "prev next",
              center: "title",
              right: "dayGridMonth timeGridWeek",
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
              },
            }}
            displayEventTime={true}
            eventDisplay="block"
            eventColor="#3AAFA9"
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
                    Object.keys(postEventErrors).length > 0
                      ? postEventErrors["title"]
                      : "Event Title"
                  }
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
        </StyledWrapper>
      )
  }
}

export default Calendar
