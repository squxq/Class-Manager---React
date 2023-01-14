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
  IconButton,
} from "@mui/material"
import { useParams, useSearchParams } from "react-router-dom"
import { KeyboardArrowLeft, Edit } from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import axios from "axios"
import Modal from "react-modal"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid"

Modal.setAppElement("#root")

const DataGridCustomToolbar = ({ createLabelValue, handleBackClick }) => {
  return (
    <GridToolbarContainer>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Button
            sx={{
              color: "#f6f6f6",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#3AAFA9",
              },
            }}
            onClick={handleBackClick}
          >
            <KeyboardArrowLeft />
            <Typography variant="h6">Back</Typography>
          </Button>
          <GridToolbarExport
            sx={{
              color: "#3AAFA9",
              fontSize: "1.25rem",
              marginLeft: "1rem",
            }}
            printOptions={{ disableToolbarButton: true }}
          />
        </Box>
      </Box>
    </GridToolbarContainer>
  )
}

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

const CustomCard = ({ text, id, customClickEvent, cardActionEvent }) => {
  return (
    <Card
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
      <CardActionArea
        onClick={() => cardActionEvent(id)}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
        <IconButton
          sx={{
            marginRight: "2rem",
            height: "3rem",
            width: "3rem",
            color: "#f6f6f6",
            "&:hover": {
              backgroundColor: "rgba(58, 175, 169, 0.4)",
            },
          }}
          onClick={(event) => customClickEvent(event, id)}
        >
          <Edit />
        </IconButton>
      </CardActionArea>
    </Card>
  )
}

const Assignments = () => {
  const [value, setValue] = useState("Assigned")
  const handleChange = async (e, newValue) => {
    if (newValue !== "Create") {
      await axios({
        method: "get",
        url: `http://localhost:5000/assignments/${userId}`,
        params: {
          status: newValue,
        },
      })
        .then((res) => {
          console.log(res)
          setAssignments(res.data.assignments)
          setCreateLabelValue("Create")
          setAssignmentName("")
          setAssignmentInstructions("")
          setAssignmentStatus("Pending")
          setClassName([])
          setStartDate({})
          setEndDate({})
          setSearchParams({})
        })
        .catch((err) => console.log(err))
    }
    setValue(newValue)
  }

  const { id: userId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [createLabelValue, setCreateLabelValue] = useState("Create")

  const [assignmentsData, setAssignmentsData] = useState(false)
  const [classes, setClasses] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    setSearchParams({})
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/assignments/${userId}`,
        params: {
          status: value,
        },
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

  const handleCardClick = async (event, id) => {
    event.stopPropagation()
    event.preventDefault()
    setSearchParams({
      id,
    })
    await axios({
      method: "get",
      url: `http://localhost:5000/assignment/${userId}`,
      params: {
        cardId: id,
      },
    })
      .then((res) => {
        console.log(res)
        const { name, start, end, instructions, status } = res.data.assignment
        setAssignmentName(name)
        console.log(start, end)
        setStartValue(
          `${start.split("T")[0]} - ${start.split("T")[1].split(".")[0]}`
        )
        setEndValue(`${end.split("T")[0]} - ${end.split("T")[1].split(".")[0]}`)
        setStartDate(start)
        setEndDate(end)
        setAssignmentInstructions(instructions)
        setAssignmentStatus(status)
        setClassName(res.data.classes)
        setCreateLabelValue("Edit")
        setValue("Create")
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

  const [startValue, setStartValue] = useState("")
  const [endValue, setEndValue] = useState("")

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = async () => {
    setModalIsOpen(true)
    // setStartValue(new Date().toISOString())
    // console.log(startValue)
    // setEndValue(
    //   new Date(new Date().setHours(new Date().getHours() + 1)).toISOString()
    // )
  }
  const closeModal = async () => {
    setModalIsOpen(false)
  }

  const handleCreateAssignmentClick = async (e) => {
    console.log(startDate, endDate, e.currentTarget)
    if (e.currentTarget.id === "Create") {
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
            for (let singleClassName of className) {
              return sClass.name === singleClassName
            }
          }),
        },
      })
        .then((res) => {
          console.log(res)
          setAssignments([...assignments, res.data.newAssignment])
          setValue("Assigned")
        })
        .catch((err) => console.log(err))
    } else if (e.currentTarget.id === "Edit") {
      await axios({
        method: "patch",
        url: `http://localhost:5000/assignments/${userId}`,
        data: {
          assignmentName,
          assignmentStartDate: startDate,
          assignmentEndDate: endDate,
          assignmentInstructions,
          assignmentStatus,
          classes: classes.filter((sClass) => {
            for (let singleClassName of className) {
              return sClass.name === singleClassName
            }
          }),
        },
        params: {
          id: searchParams.get("id"),
        },
      })
        .then((res) => {
          console.log(res)
          setAssignments(res.data.assignments)
          setValue("Assigned")
        })
        .catch((err) => console.log(err))
    }
  }

  const handleBackClick = () => {
    setValue("Assigned")
    setCreateLabelValue("Create")
    setAssignmentName("")
    setAssignmentInstructions("")
    setAssignmentStatus("Pending")
    setClassName([])
    setStartDate({})
    setEndDate({})
    setSearchParams({})
  }

  const handleDeleteAssignment = async () => {
    await axios({
      method: "delete",
      url: `http://localhost:5000/assignments/${userId}`,
      params: {
        id: searchParams.get("id"),
      },
    })
      .then((res) => {
        setAssignments(res.data.assignments)
        setSearchParams({})
        setValue("Assigned")
      })
      .catch((err) => console.log(err))
  }

  const [answersData, setAnswersData] = useState(false)
  const [answers, setAnswers] = useState([])

  const handleCardActionClick = async (id) => {
    setSearchParams({
      id,
    })
    await axios({
      method: "get",
      url: `http://localhost:5000/answers/${userId}`,
      params: {
        id,
      },
    })
      .then((res) => {
        console.log(res)
        setAnswers(res.data.answers)
        setAnswersData(res.data.success)
        setCreateLabelValue("Answers")
        setValue("Create")
      })
      .catch((err) => console.log(err))
  }

  switch (assignmentsData) {
    case false:
      return <div>Something went wrong please try again later...</div>
    case true:
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
                  label={<span style={{ color: "#f6f6f6" }}>Assigned</span>}
                  sx={{ m: "0rem 0.5rem" }}
                />
                <Tab
                  value="Pending"
                  label={<span style={{ color: "#f6f6f6" }}>Pending</span>}
                  sx={{ m: "0rem 0.5rem" }}
                />
                <Tab
                  value="Completed"
                  label={<span style={{ color: "#f6f6f6" }}>Completed</span>}
                  sx={{ m: "0rem 0.5rem" }}
                />
                <Tab
                  value="Create"
                  label={
                    <span style={{ color: "#f6f6f6" }}>{createLabelValue}</span>
                  }
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
            <Box height="72.9vh">
              {assignments.map((assignment) => {
                return (
                  <CustomCard
                    text={`${assignment.name}: ${assignment.instructions}`}
                    key={assignment._id}
                    id={assignment._id}
                    customClickEvent={handleCardClick}
                    cardActionEvent={handleCardActionClick}
                  />
                )
              })}
            </Box>
          ) : (
            <Box height="72.9vh">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {createLabelValue !== "Answers" && (
                  <Button
                    sx={{
                      color: "#f6f6f6",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#3AAFA9",
                      },
                    }}
                    onClick={handleBackClick}
                  >
                    <KeyboardArrowLeft />
                    <Typography variant="h6">Back</Typography>
                  </Button>
                )}
                <Box>
                  {createLabelValue !== "Answers" && (
                    <Button
                      id={createLabelValue}
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
                      <Typography variant="h5">{createLabelValue}</Typography>
                    </Button>
                  )}
                  {createLabelValue === "Edit" ? (
                    <Button
                      variant="outlined"
                      onClick={handleDeleteAssignment}
                      sx={{
                        marginLeft: "2rem",
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
                      <Typography variant="h5">Delete</Typography>
                    </Button>
                  ) : (
                    <></>
                  )}
                </Box>
              </Box>
              {createLabelValue !== "Answers" ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
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
                        value={
                          startValue.indexOf("T") > 1
                            ? `${startValue.split("T")[0]} - ${
                                startValue.split("T")[1].split(".")[0]
                              }`
                            : startValue
                        }
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
                        value={
                          endValue.indexOf("T") > 1
                            ? `${endValue.split("T")[0]} - ${
                                endValue.split("T")[1].split(".")[0]
                              }`
                            : endValue
                        }
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
                        maxRows={5}
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
                          defaultValue={assignmentStatus}
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
              ) : (
                <Box
                  height="74vh"
                  sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                      fontFamily: "Poppins",
                    },
                    "& .MuiDataGrid-cell": {
                      border: "none !important",
                    },
                    "& .Mui-selected": {
                      border: "none !important",
                      backgroundColor: "rgb(58, 175, 169, 0.2) !important",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#171923",
                      color: "#f6f6f6",
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: "#171923",
                    },
                    "& .MuiDataGrid-Containeer": {
                      backgroundColor: "#f6f6f6",
                      color: "#f6f6f6",
                      borderTop: "none",
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                      color: `#f6f6f6`,
                    },
                    ".MuiButtonBase-root": {
                      color: "#f6f6f6",
                    },
                    ".MuiToolbar-root": {
                      color: "#f6f6f6",
                    },
                    ".MuiSvgIcon-root": {
                      color: "#f6f6f6",
                    },
                    ".MuiDataGrid-columnHeaderTitleContainer": {
                      borderColor: "#f6f6f6 !important",
                    },
                    ".MuiDataGrid-row": {
                      color: "#f6f6f6 !important",
                      fontSize: "0.9rem",
                    },
                    ".MuiDataGrid-selectedRowCount": {
                      color: "#171923 !important",
                      cursor: "default",
                    },
                    ".MuiTablePagination-actions": {
                      display: "none",
                    },
                  }}
                >
                  <DataGrid
                    getRowId={(row) => row.id}
                    rows={answers || []}
                    columns={[
                      {
                        field: "name",
                        headerName: "Name",
                        flex: 0.5,
                      },
                      {
                        field: "email",
                        headerName: "Email",
                        flex: 0.6,
                      },
                      {
                        field: "status",
                        headerName: "Status",
                        flex: 0.4,
                      },
                      {
                        field: "grade",
                        headerName: "Grade / 200",
                        flex: 0.5,
                      },
                      {
                        field: "feedback",
                        headerName: "Feedback",
                        flex: 1,
                      },
                      {
                        field: "deliveryDate",
                        headerName: "Delivery Date",
                        flex: 0.5,
                      },
                    ]}
                    // rowCount={rowCount || 0}
                    rowsPerPage={-1}
                    rowsPerPageOptions={[]}
                    sortingOrder={["desc", "asc"]}
                    initialState={{
                      sorting: {
                        sortModel: [{ field: "lastName", sort: "asc" }],
                      },
                    }}
                    components={{ Toolbar: DataGridCustomToolbar }}
                    componentsProps={{
                      Toolbar: {
                        createLabelValue,
                        handleBackClick,
                      },
                    }}
                  />
                </Box>
              )}
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
                      <TextField
                        onKeyDown={(e) => e.preventDefault()}
                        {...props}
                        style={{ margin: "15px" }}
                      />
                    )}
                    label="Start Date"
                    value={
                      startValue.indexOf("T") === -1 ? startDate : startValue
                    }
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(newValue) => {
                      setStartValue(newValue.toISOString())
                      setStartDate(newValue)
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField
                        onKeyDown={(e) => e.preventDefault()}
                        {...props}
                        style={{ margin: "15px" }}
                      />
                    )}
                    label="End Date"
                    value={endValue.indexOf("T") === -1 ? endDate : endValue}
                    inputFormat="DD/MM/YYYY hh:mm A"
                    onChange={(newValue) => {
                      console.log(newValue)
                      if (newValue.toISOString()) {
                        setEndValue(newValue.toISOString())
                      } else {
                        setEndValue(newValue)
                      }
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
export default Assignments
