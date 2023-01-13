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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
]

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

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/assignments/${userId}`,
      })
        .then((res) => {
          console.log(res)
          setAssignmentsData(true)
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

  const [personName, setPersonName] = useState([])

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
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
                <Tab value="Create" label="Create" sx={{ m: "0rem 0.5rem" }} />
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
              <Box>
                <Button
                  sx={{
                    padding: "0px",
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
                        value={personName}
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
                                    "&:hover": {
                                      color: "#3AAFA9",
                                      cursor: "pointer",
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
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
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
        </Box>
      )
    }
  }
}

export default Assignments
