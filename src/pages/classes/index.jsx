import React, { useEffect, useState } from "react"
import axios from "axios"
import Modal from "react-modal"
import { useParams, useSearchParams } from "react-router-dom"
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Button,
  IconButton,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  InputAdornment,
} from "@mui/material"
import { FilterListOutlined, PeopleAlt } from "@mui/icons-material"
import {
  DataGrid,
  GridToolbarFilterButton,
  GridLinkOperator,
} from "@mui/x-data-grid"
import { Search, Add } from "@mui/icons-material"
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"
import { styled } from "@mui/system"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "9999",
    width: "40%",
  },
  overlay: { zIndex: 1000, backgroundColor: "rgb(23,25,35, 0.4)" },
}
const classStyles = {
  content: {
    height: "800px !important",
    width: "1600px !important",
    top: "10%",
    left: "58%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%)",
    zIndex: "9999",
    width: "80%",
    backgroundColor: "#171923",
    maxHeight: "85%",
    maxWidht: "80%",
  },
  overlay: { zIndex: 1000, backgroundColor: "rgb(23,25,35, 0.4)" },
}

const ClassCard = ({ classId, name, status, students, customClickEvent }) => {
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: "#171923",
        borderRadius: "0.55rem",
        borderColor: "#3AAFA9",
        borderWidth: "2px",
        margin: "0rem 5rem 2rem 5rem",
        cursor: "pointer",
        maxHeight: "325px",
      }}
    >
      <CardActionArea
        sx={{ height: "100%" }}
        onClick={() => customClickEvent(classId)}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h2" component="div" sx={{ color: "#f6f6f6" }}>
              {name}
            </Typography>
            <Typography
              sx={{ fontSize: "1.5rem" }}
              color="#F6F6F6"
              gutterBottom
              margin="1.1rem"
            >
              {status}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "#f6f6f6" }}>
              Number of Students:
            </Typography>
            <Typography
              sx={{ fontSize: "1.5rem" }}
              color="#F6F6F6"
              gutterBottom
              margin="1rem 0.4rem 1.3rem 1rem"
            >
              <PeopleAlt />
            </Typography>
            <Typography variant="h5" sx={{ color: "#f6f6f6" }}>
              {students}
            </Typography>
          </Box>
          <Typography></Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

Modal.setAppElement("#root")

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#f6f6f6",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "#f6f6f6",
    borderColor: "#f6f6f6",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#f6f6f6",
    borderColor: "#f6f6f6",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3AAFA9",
    borderColor: "#f6f6f6",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#3AAFA9",
    },
    "&:hover fieldset": {
      borderColor: "#3AAFA9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3AAFA9",
    },
  },
})

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setAllStudents,
  setSearchParams,
  searchParams,
  handleStudentClick,
}) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <Box>
            <GridToolbarFilterButton
              sx={{ color: "#3AAFA9", fontSize: "1.25rem" }}
            />
            <GridToolbarExport
              sx={{ color: "#3AAFA9", fontSize: "1.25rem", marginLeft: "1rem" }}
              printOptions={{ disableToolbarButton: true }}
            />
            <Button
              variant="text"
              sx={{ color: "#3AAFA9", fontSize: "1.25rem", marginLeft: "1rem" }}
              onClick={handleStudentClick}
            >
              + Update
            </Button>
          </Box>
        </FlexBetween>
        <Box>
          <CssTextField
            label="Search..."
            sx={{
              mb: "0.5rem",
              width: "15rem",
              input: { color: "#f6f6f6" },
              label: { color: "#f6f6f6" },
              fontSize: "1.25rem",
            }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={async () => {
                      const id = searchParams.get("id")
                      setSearchParams({ id, searchInput })
                      await axios({
                        method: "get",
                        url: `http://localhost:5000/students/${id}`,
                        params: {
                          id,
                          searchInput,
                        },
                      })
                        .then((res) => {
                          console.log(res)
                          setAllStudents(res.data.students)
                          setSearchInput("")
                        })
                        .catch((err) => console.log(err))
                    }}
                    sx={{ color: "#f6f6f6" }}
                  >
                    <Search sx={{ color: "#f6f6f6" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </FlexBetween>
    </GridToolbarContainer>
  )
}

const Classes = () => {
  const [classData, setClassData] = useState(false)
  const [allClasses, setAllClasses] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/classes/${id}`,
      })
        .then((res) => {
          setClassData(true)
          setAllClasses(res.data.classes)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  const [isOpen, setIsOpen] = useState(false)

  const [className, setClassName] = useState("")
  const [students, setStudents] = useState(false)
  const [studentsStatus, setStudentsStatus] = useState("Active")
  const [studentsArray, setStudentsArray] = useState([])
  const [createClassErrors, setCreateClassErrors] = useState({})
  const [studentsId, setStudentsId] = useState([])

  const handleSubmit = async () => {
    await axios({
      method: "post",
      url: `http://localhost:5000/classes/${id}`,
      data: { className, studentsStatus, studentsId },
    })
      .then((res) => {
        setIsOpen(false)
        setClassName("")
        console.log(res.data.classes)
        console.log(res.data.classes)
        setAllClasses(res.data.classes)
      })
      .catch(async (err) => {
        try {
          if (err.response.data.errors) {
            setCreateClassErrors(err.response.data.errors)
            setTimeout(() => {
              setCreateClassErrors({})
            }, 3000)
          } else {
            console.log(err)
            setIsOpen(false)
          }
        } catch (err) {
          console.log(err)
        }
      })
  }

  const [selectedClassModal, setSelectedClassModal] = useState(false)
  const [buttonsOpen, setButtonsOpen] = useState(true)

  const [searchInput, setSearchInput] = useState("")

  const [selectedClassData, setSelectedClassData] = useState({})
  const [rowCount, setRowCount] = useState(0)

  const [searchParams, setSearchParams] = useSearchParams()

  const [classId, setClassId] = useState("")

  const handleClassClick = async (id) => {
    await axios({
      method: "get",
      url: `http://localhost:5000/class/${id}`,
    })
      .then((res) => {
        setButtonsOpen(false)
        setSelectedClassModal(true)
        setSelectedClassData(res.data.class)
        setAllStudents(res.data.class.students)
        setRowCount(res.data.total)
        setSearchParams({ id })
        setClassId(id)
      })

      .catch((err) => console.log(err))
  }

  const [allStudents, setAllStudents] = useState([])

  const getAllStudents = async () => {
    await axios({
      method: "get",
      url: `http://localhost:5000/students`,
    })
      .then((res) => {
        console.log(res)
        setAllStudents(res.data.students)
      })
      .catch((err) => console.log(err))
  }

  const handleRemoveStudent = async (e, params) => {
    await axios({
      method: "patch",
      url: `http://localhost:5000/students/${classId}`,
      data: {
        studentId: params.row.id,
      },
    })
      .then((res) => {
        console.log(res)
        setAllStudents(res.data.students)
      })
      .catch((err) => console.log(err))
  }

  const handleStudentClick = async () => {
    await axios({
      method: "get",
      url: `http://localhost:5000/class/${classId}`,
    })
      .then((res) => {
        console.log(res.data.class.name)
        setClassName(res.data.class.name)
        setStudentsStatus(res.data.class.status)
        setStudentsArray(
          res.data.class.students.map(
            (student) => ` ${student.firstName} ${student.lastName}`
          )
        )
      })
      .catch((err) => console.log(err))
    setSelectedStudent(true)
  }

  const [selectedStudent, setSelectedStudent] = useState(false)

  switch (classData) {
    case false:
      return <div>Something went wrong please try again later...</div>
    case true:
      return (
        <Box style={{ margin: "1.37rem" }}>
          <Box>
            <Box
              margin="2rem 2rem 2rem 2rem"
              sx={{
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Typography variant="h4" color="#f6f6f6" fontWeight="bold">
                See your list of classes below.
              </Typography>
              <Box
                display="inline-flex"
                style={{
                  margin: 0,
                  padding: 0,
                  boxSizing: "border-box",
                }}
              >
                <IconButton
                  variant="contained"
                  sx={{
                    backgroundColor: "#3AAFA9",
                    color: "#f6f6f6",
                    "&:hover": {
                      backgroundColor: "rgb(58, 175, 169, 0.7)",
                    },
                    height: "3rem",
                    width: "3rem",
                  }}
                  onClick={() => {
                    setIsOpen(true)
                    getAllStudents()
                  }}
                >
                  <Add />
                </IconButton>
                <Button
                  variant="contained"
                  sx={{
                    margin: "0rem 1rem",
                    backgroundColor: "#3AAFA9",
                    color: "#f6f6f6",
                    "&:hover": {
                      backgroundColor: "rgb(58, 175, 169, 0.7)",
                    },
                  }}
                >
                  <FilterListOutlined />
                  Filters
                </Button>
              </Box>
            </Box>
            <Box
              style={{
                marginTop: "20px",
                display: "grid",
                justifyContent: "space-between",
                backgroundColor: "#171923",
                height: "74.9vh",
              }}
              gridTemplateColumns="repeat(3, minmax(0, 1fr))"
              rowGap="10px"
              columnGap="1.33%"
            >
              {allClasses.map(({ key, name, status, students }) => {
                return (
                  <ClassCard
                    key={key}
                    classId={key}
                    name={name}
                    status={status}
                    students={students}
                    customClickEvent={handleClassClick}
                  />
                )
              })}
            </Box>
            <Box
              margin="0rem 2rem 2rem 2rem"
              sx={{
                justifyContent: "space-between",
                display: "flex",
                height: "3.7vh",
              }}
            ></Box>
          </Box>
          <Modal
            isOpen={isOpen}
            onRequestClose={() => {
              setIsOpen(false)
              setClassName("")
              setStudents(false)
              setStudentsArray([])
              setStudentsId([])
            }}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1 style={{ margin: "0px 0px 5px 0px", textAlign: "center" }}>
              Create a new Class
            </h1>
            <form display="flex">
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <TextField
                  variant="outlined"
                  label={
                    createClassErrors["name"]
                      ? createClassErrors["name"]
                      : "Enter class name"
                  }
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value)
                  }}
                  onClick={() => setStudents(false)}
                  style={{ margin: "15px", width: "100%" }}
                />
                <FormControl>
                  <RadioGroup defaultValue="Active" name="radio-buttons-group">
                    <FormControlLabel
                      value="Active"
                      control={<Radio />}
                      label="Active"
                      onClick={() => {
                        setStudentsStatus("Active")
                        console.log("Active status")
                      }}
                    />
                    <FormControlLabel
                      value="Inactive"
                      control={<Radio />}
                      label="Inactive"
                      onClick={() => {
                        setStudentsStatus("Inactive")
                        console.log("Inactive status")
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  variant="outlined"
                  label={
                    createClassErrors["students"]
                      ? createClassErrors["students"]
                      : "Select students for your class."
                  }
                  value={studentsArray}
                  onClick={() => {
                    setStudents(true)
                  }}
                  style={{
                    margin: "15px 15px 0px 15px",
                    width: "96%",
                  }}
                />
                {!students ? (
                  <></>
                ) : (
                  <Box sx={{ width: "96%", margin: "5px 15px 15px 15px" }}>
                    <List
                      sx={{
                        width: "100%",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 245,
                        "& ul": { padding: 0 },
                      }}
                      subheader={<li />}
                    >
                      {allStudents.map(({ id, firstName, lastName }) => {
                        return (
                          <ListItemButton
                            key={id}
                            id={id}
                            onClick={(event) => {
                              setStudentsArray([
                                ...studentsArray,
                                ` ${event.target.innerText}`,
                              ])
                              setStudentsId([
                                ...studentsId,
                                event.currentTarget.id,
                              ])
                            }}
                            divider={true}
                          >
                            <ListItemText
                              primary={`${firstName} ${lastName}`}
                            />
                          </ListItemButton>
                        )
                      })}
                    </List>
                  </Box>
                )}
              </div>
            </form>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                style={{ marginTop: "20px", width: "100%" }}
              >
                Create Class
              </Button>
            </div>
          </Modal>
          <Modal
            isOpen={selectedClassModal}
            onRequestClose={() => {
              setButtonsOpen(true)
              setSelectedClassModal(false)
              setSearchParams({})
              setClassId("")
            }}
            style={classStyles}
          >
            <Box m="1.5rem 2.5rem 0rem 2.5rem">
              <Box>
                <Typography
                  variant="h3"
                  // color={theme.palette.secondary[100]}
                  fontWeight="bold"
                  sx={{ mb: "5px", color: "#F6F6F6" }}
                >
                  {selectedClassData.name}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#F6F6F6" }}
                  // color={theme.palette.secondary[300]}
                >
                  Students
                </Typography>
              </Box>
              <Box
                height="67vh"
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
                  rows={allStudents || []}
                  columns={[
                    {
                      field: "firstName",
                      headerName: "First Name",
                      flex: 1,
                    },
                    {
                      field: "lastName",
                      headerName: "Last Name",
                      flex: 1,
                    },
                    {
                      field: "email",
                      headerName: "Email",
                      flex: 1,
                    },
                    {
                      field: "remove",
                      headerName: "Remove",
                      flex: 0.5,
                      renderCell: (params) => {
                        return (
                          <Button
                            onClick={(e) => handleRemoveStudent(e, params)}
                            variant="contained"
                            sx={{
                              margin: "0rem 1rem",
                              backgroundColor: "#3AAFA9",
                              color: "#f6f6f6",
                              "&:hover": {
                                backgroundColor: "rgb(58, 175, 169, 0.7)",
                              },
                            }}
                          >
                            Remove
                          </Button>
                        )
                      },
                      sortable: false,
                    },
                  ]}
                  rowCount={rowCount || 0}
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
                    toolbar: {
                      searchInput,
                      setSearchInput,
                      setAllStudents,
                      setSearchParams,
                      searchParams,
                      handleStudentClick,
                    },
                    filterPanel: {
                      // Force usage of "And" operator
                      linkOperators: [GridLinkOperator.And],
                      // Display columns by ascending alphabetical order
                      columnsSort: "asc",
                      filterFormProps: {
                        // Customize inputs by passing props
                        linkOperatorInputProps: {
                          variant: "outlined",
                          size: "small",
                        },
                        columnInputProps: {
                          variant: "outlined",
                          size: "small",
                          sx: { mt: "auto" },
                        },
                        operatorInputProps: {
                          variant: "outlined",
                          size: "small",
                          sx: { mt: "auto" },
                        },
                        valueInputProps: {
                          InputComponentProps: {
                            variant: "outlined",
                            size: "small",
                          },
                        },
                        deleteIconProps: {
                          sx: {
                            "& .MuiSvgIcon-root": { color: "#d32f2f" },
                          },
                        },
                      },
                      sx: {
                        // Customize inputs using css selectors
                        "& .MuiDataGrid-filterForm": { p: 2 },
                        "& .MuiDataGrid-filterForm:nth-child(even)": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark" ? "#444" : "#f5f5f5",
                        },
                        "& .MuiDataGrid-filterFormLinkOperatorInput": { mr: 2 },
                        "& .MuiDataGrid-filterFormColumnInput": {
                          mr: 2,
                          width: 150,
                        },
                        "& .MuiDataGrid-filterFormOperatorInput": { mr: 2 },
                        "& .MuiDataGrid-filterFormValueInput": { width: 200 },
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Modal>
          <Modal
            isOpen={selectedStudent}
            onRequestClose={() => {
              setSelectedStudent(false)
            }}
            style={customStyles}
          >
            <h1 style={{ margin: "0px 0px 5px 0px", textAlign: "center" }}>
              {className}
            </h1>
            <form display="flex">
              <div
                style={{ display: "flex", flexDirection: "row", width: "100%" }}
              >
                <TextField
                  variant="outlined"
                  label={
                    createClassErrors["name"]
                      ? createClassErrors["name"]
                      : "Enter class name"
                  }
                  value={className}
                  onChange={(e) => {
                    setClassName(e.target.value)
                  }}
                  onClick={() => setStudents(false)}
                  style={{ margin: "15px", width: "100%" }}
                />
                <FormControl>
                  <RadioGroup defaultValue="Active" name="radio-buttons-group">
                    <FormControlLabel
                      value="Active"
                      control={<Radio />}
                      label="Active"
                      onClick={() => {
                        setStudentsStatus("Active")
                        console.log("Active status")
                      }}
                    />
                    <FormControlLabel
                      value="Inactive"
                      control={<Radio />}
                      label="Inactive"
                      onClick={() => {
                        setStudentsStatus("Inactive")
                        console.log("Inactive status")
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  variant="outlined"
                  label={
                    createClassErrors["students"]
                      ? createClassErrors["students"]
                      : "Select students for your class."
                  }
                  value={studentsArray}
                  onClick={() => {
                    setStudents(true)
                  }}
                  style={{
                    margin: "15px 15px 0px 15px",
                    width: "96%",
                  }}
                />
                {!students ? (
                  <></>
                ) : (
                  <Box sx={{ width: "96%", margin: "5px 15px 15px 15px" }}>
                    <List
                      sx={{
                        width: "100%",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 245,
                        "& ul": { padding: 0 },
                      }}
                      subheader={<li />}
                    >
                      {allStudents.map(({ id, firstName, lastName }) => {
                        return (
                          <ListItemButton
                            key={id}
                            id={id}
                            onClick={(event) => {
                              setStudentsArray([
                                ...studentsArray,
                                ` ${event.target.innerText}`,
                              ])
                              setStudentsId([
                                ...studentsId,
                                event.currentTarget.id,
                              ])
                            }}
                            divider={true}
                          >
                            <ListItemText
                              primary={`${firstName} ${lastName}`}
                            />
                          </ListItemButton>
                        )
                      })}
                    </List>
                  </Box>
                )}
              </div>
            </form>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant="outlined"
                onClick={handleSubmit}
                style={{ marginTop: "20px", width: "100%" }}
              >
                Update Class
              </Button>
            </div>
          </Modal>
        </Box>
      )
  }
}

export default Classes
