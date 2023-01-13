import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActionArea,
  Button,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material"
import { useParams, useSearchParams } from "react-router-dom"
import { KeyboardArrowLeft } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import axios from "axios"
import Modal from "react-modal"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"

Modal.setAppElement("#root")

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

const CssTextField = styled(TextField)({
  width: "100%",
  "& .MuiInputBase-input": {
    color: "#f6f6f6",
  },
  "& label.Mui-focused": {
    color: "#3AAFA9",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#f6f6f6",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3AAFA9",
  },
})

const CustomCard = ({ text, id, customClickEvent }) => {
  return (
    <Card
      onClick={() => customClickEvent(id)}
      key={id}
      sx={{
        m: "1rem",
        backgroundColor: "#171923",
        boxShadow: "0 1px 2px rgba(58, 175, 169, 0.7)",
        transition: "* 0.3s ease-in-out",

        "&:hover": {
          boxShadow: "0 5px 15px rgba(58, 175, 169, 0.7)",
        },
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{
              color: "#f6f6f6",
              padding: "0.3rem",
              fontFamily: "Poppins",
              fontSize: "1.5rem",
            }}
          >
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const Assignments = () => {
  const [value, setValue] = useState("Assigned")
  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const { id: userId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [assignmentsData, setAssignmentsData] = useState(false)
  const [classes, setClasses] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/assignments/${userId}`,
      })
        .then((res) => {
          console.log(res)
          setAssignmentsData(true)
          setClasses(res.data.classes)
          setAssignments(res.data.assignments)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  const handleCardClick = async (id) => {
    setSearchParams({
      id,
    })
    await axios({
      method: "get",
      url: `http://localhost:5000/assignments/${userId}`,
      params: {
        cardId: id,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const [className, setClassName] = useState([])

  const handleSelectChange = (event) => {
    console.log(event)
    const {
      target: { value },
    } = event
    setClassName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const [assignmentName, setAssignmentName] = useState("")
  const [assignmentInstructions, setAssignmentInstructions] = useState("")
  const [assignmentStatus, setAssignmentStatus] = useState("Pending")

  const [startDate, setStartDate] = useState({})
  const [endDate, setEndDate] = useState({})

  const [startValue, setStartValue] = useState(dayjs(new Date().toISOString()))
  const [endValue, setEndValue] = useState(
    dayjs(new Date(new Date().setHours(new Date().getDate() + 1)).toISOString())
  )

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = async () => {
    setModalIsOpen(true)
    setStartValue(new Date().toISOString())
    console.log(startValue)
    setEndValue(
      new Date(new Date().setHours(new Date().getHours() + 1)).toISOString()
    )
  }
  const closeModal = async () => {
    setModalIsOpen(false)
  }

  const handleCreateAssignmentClick = async () => {
    await axios({
      method: "post",
      url: `http://localhost:5000/assignments/${userId}`,
      data: {
        assignmentName,
        assignmentStartDate: startDate,
        assignmentEndDate: endDate,
        assignmentInstructions,
        assignmentStatus,
        classes: classes.filter((sClass) => {
          for (let SClass of className) {
            return sClass.name === SClass
          }
        }),
      },
    })
  }

  switch (assignmentsData) {
    case false:
      return <div>Something went wrong please try again later...</div>
    case true: {
      return (
        <Box sx={{ m: "1.5rem 2.5rem" }}>
          <Box margin="2rem">
            <Typography variant="h4" color="#f6f6f6">
              Assignments
            </Typography>
            <Box
              sx={{
                "& .MuiButtonBase-root": {
                  color: "#f6f6f6",
                },
                "& .MuiButtonBase-root::selection": {
                  color: "#3AAFA9",
                },
                "& .MuiButtonBase-root:hover": {
                  color: "#3AAFA9",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#3AAFA9",
                },
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ margin: "1rem 0rem 1rem 0rem" }}
              >
                <Tab
                  value="Assigned"
                  label="Assigned"
                  sx={{ m: "0rem 0.5rem" }}
                />
                <Tab
                  value="Pending"
                  label="Pending"
                  sx={{ m: "0rem 0.5rem" }}
                />
                <Tab
                  value="Completed"
                  label="Completed"
                  sx={{ m: "0rem 0.5rem" }}
                />
                <Tab
                  value="Create"
                  label="Create"
                  sx={{ m: "0rem 0.5rem" }}
                  onClick={() => {
                    setStartValue(new Date().toISOString())
                    setEndValue(
                      new Date(
                        new Date().setHours(new Date().getHours() + 1)
                      ).toISOString()
                    )
                  }}
                />
              </Tabs>
            </Box>
          </Box>
          {value !== "Create" ? (
            <Box>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((card) => {
                return (
                  <CustomCard
                    text={`Hello ${card}.`}
                    key={`${card}`}
                    id={`${card}`}
                    customClickEvent={handleCardClick}
                  />
                )
              })}
            </Box>
          ) : (
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  sx={{
                    color: "#f6f6f6",
                    "&:hover": {
                      backgroundColor: "transparent",
                      color: "#3AAFA9",
                    },
                  }}
                >
                  <KeyboardArrowLeft />
                  <Typography variant="h6">Back</Typography>
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCreateAssignmentClick}
                  sx={{
                    border: "1px solid #f6f6f6",
                    color: "#f6f6f6",
                    boxShadow: "0 1px 2px rgba(255, 255, 255, 0.7)",
                    "&:hover": {
                      backgroundColor: "transparent",
                      border: "1px solid #3AAFA9",
                      boxShadow: "0 5px 10px rgba(58, 175, 169, 0.7)",
                    },
                  }}
                >
                  <Typography variant="h5">Create</Typography>
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "69.6vh",
                  color: "#f6f6f6",
                }}
              >
                <Box
                  sx={{
                    marginTop: "2rem",
                    marginLeft: "2rem",
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <FormControl>
                    <Typography
                      placeholder="Please type your assignment title..."
                      variant="standard"
                      sx={{
                        marginLeft: "2rem",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Assignment Name
                    </Typography>
                    <CssTextField
                      placeholder="Please type your assignment title..."
                      variant="standard"
                      multiline={true}
                      value={assignmentName}
                      onChange={(e) => setAssignmentName(e.target.value)}
                      sx={{
                        width: "80% !important",
                        marginLeft: "1rem",
                        marginTop: "0.5rem",
                        marginBottom: "2rem",
                        "& .MuiInputBase-input": {
                          fontFamily: "Poppins",
                          fontSize: "32px",
                        },
                      }}
                    />
                    <Typography
                      variant="standard"
                      sx={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Calendar
                    </Typography>
                    <CssTextField
                      placeholder="Please select your assignment start date..."
                      variant="standard"
                      multiline={true}
                      value={`${startValue.split("T")[0]} - ${
                        startValue.split("T")[1].split(".")[0]
                      }`}
                      onClick={openModal}
                      sx={{
                        width: "50% !important",
                        margin: "0.5rem 0rem 0.5rem 1rem",
                        "& .MuiInputBase-input": {
                          fontFamily: "Poppins",
                          fontSize: "16px",
                        },
                      }}
                    />
                    <CssTextField
                      placeholder="Please select your assignment end date..."
                      variant="standard"
                      multiline={true}
                      m="0.5rem"
                      value={`${endValue.split("T")[0]} - ${
                        endValue.split("T")[1].split(".")[0]
                      }`}
                      onClick={openModal}
                      sx={{
                        width: "50% !important",
                        margin: "0.5rem 0rem 2rem 1rem",
                        "& .MuiInputBase-input": {
                          fontFamily: "Poppins",
                          fontSize: "16px",
                        },
                      }}
                    />
                    <Typography
                      variant="standard"
                      sx={{
                        marginTop: "2rem",
                        marginLeft: "2rem",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Assignment Instructions
                    </Typography>
                    <CssTextField
                      placeholder="Please type your assignment instructions..."
                      variant="standard"
                      multiline={true}
                      value={assignmentInstructions}
                      onChange={(e) => {
                        setAssignmentInstructions(e.target.value)
                      }}
                      sx={{
                        width: "90% !important",
                        margin: "0.5rem 0rem 0.5rem 1rem",
                        "& .MuiInputBase-input": {
                          fontFamily: "Poppins",
                          fontSize: "25px",
                        },
                      }}
                    />
                  </FormControl>
                  <Box>
                    <FormControl sx={{ margin: "0.5rem 0rem 2rem 0rem" }}>
                      <Typography
                        variant="standard"
                        sx={{
                          marginTop: "2rem",
                          marginLeft: "2rem",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "550",
                        }}
                      >
                        Assignment Status
                      </Typography>
                      <RadioGroup
                        defaultValue={"Pending"}
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        sx={{ margin: "0.5rem 1rem 0rem 1rem" }}
                      >
                        <FormControlLabel
                          value="Completed"
                          control={
                            <Radio
                              sx={{
                                color: "#f6f6f6",
                                "& .MuiSvgIcon-root": {
                                  fontFamily: "Poppins",
                                  fontSize: "25px",
                                },
                                "&.Mui-checked": {
                                  color: "#3AAFA9",
                                },
                              }}
                            />
                          }
                          label="Completed"
                          onClick={() => setAssignmentStatus("Completed")}
                        />
                        <FormControlLabel
                          value="Pending"
                          control={
                            <Radio
                              sx={{
                                marginLeft: "1rem",
                                color: "#f6f6f6",
                                "& .MuiSvgIcon-root": {
                                  fontSize: 28,
                                },
                                "&.Mui-checked": {
                                  color: "#3AAFA9",
                                },
                              }}
                            />
                          }
                          label="Pending"
                          onClick={() => setAssignmentStatus("Pending")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ marginTop: "2rem", marginLeft: "2rem" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      variant="standard"
                      sx={{
                        marginLeft: "2rem",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: "550",
                      }}
                    >
                      Assignment Classes
                    </Typography>
                    <FormControl sx={{ width: "650px" }}>
                      <Select
                        multiple
                        value={className}
                        onChange={handleSelectChange}
                        variant="standard"
                        placeholder="Please select at least a class for this assignment."
                        sx={{
                          margin: "0.5rem 0rem 2rem 1rem",
                          "& .MuiInputBase-root": {
                            width: "90%",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "#f6f6f6",
                          },
                          "&:before": {
                            borderBottom: "2px solid #f6f6f6",
                          },
                          "&:after": {
                            borderBottom: "2px solid #3AAFA9",
                          },
                          "& .MuiSelect-select": {
                            width: "90%",
                          },
                        }}
                        renderValue={(selected) => {
                          return (
                            <Box
                              sx={{
                                margin: "5px",
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip
                                  sx={{
                                    fontFamily: "Poppins",
                                    fontSize: "25px",
                                    background: "transparent",
                                    color: "#f6f6f6",
                                    boxShadow:
                                      "0 1px 2px rgba(58, 175, 169, 0.7)",
                                    "&:hover": {
                                      cursor: "pointer",
                                      boxShadow:
                                        "0 5px 10px rgba(58, 175, 169, 0.4)",
                                    },
                                  }}
                                  key={value}
                                  label={value}
                                />
                              ))}
                            </Box>
                          )
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 48 * 4.5 + 8,
                              width: 250,
                            },
                          },
                        }}
                      >
                        {classes.map((sClass) => (
                          <MenuItem
                            key={sClass._id}
                            id={sClass._id}
                            value={sClass.name}
                          >
                            <Checkbox
                              checked={className.indexOf(sClass.name) > -1}
                            />
                            <ListItemText primary={sClass.name} />
                          </MenuItem>
                        ))}
                      </Select>
                      <Typography
                        variant="standard"
                        sx={{
                          marginTop: "2rem",
                          marginLeft: "2rem",
                          fontFamily: "Poppins",
                          fontSize: "16px",
                          fontWeight: "550",
                        }}
                      >
                        Reference Work
                      </Typography>
                      <CssTextField
                        placeholder="Please select some reference work..."
                        variant="standard"
                        multiline={true}
                        sx={{
                          width: "634px",
                          margin: "0.5rem 0rem 0.5rem 1rem",
                          "& .MuiInputBase-input": {
                            fontFamily: "Poppins",
                            fontSize: "25px",
                          },
                        }}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <form display="flex">
              <Box sx={{ display: "flex", flexDirection: "row" }}>
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
              </Box>
            </form>
            <Box></Box>
          </Modal>
        </Box>
      )
    }
  }
}

export default Assignments