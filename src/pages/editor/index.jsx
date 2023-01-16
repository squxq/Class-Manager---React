import React, { useState, useRef, useEffect } from "react"
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
} from "@mui/material"
import FlexBetween from "../dashboard/FlexBetween"
import { FileCopy, ChevronLeftOutlined } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"
import { read } from "xlsx"
import axios from "axios"

const Editor = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const { id: userId } = useParams()

  const [dragActive, setDragActive] = useState(false)

  const [editorData, setEditorData] = useState(false)
  const [editorFileNames, setEditorFileNames] = useState([])
  const [editorErrors, setEditorErrors] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/editor/${userId}`,
      })
        .then((res) => {
          console.log(res)
          setEditorData(true)
          setEditorFileNames(res.data.filenames)
        })
        .catch((err) => {
          if (
            err.response.data.err &&
            err.response.data.err === "No files found..."
          ) {
            setEditorErrors(err.response.data.err)
          } else {
            console.log(err)
          }
        })
    }

    fetchData()
  }, [])

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleAddFile = (e) => {
    e.preventDefault()
  }

  const handleFile = async (file) => {
    const data = await file.arrayBuffer()
    const workbook = read(data)

    await axios({
      method: "post",
      url: `http://localhost:5000/editor/${userId}`,
      data: {
        file: workbook,
        filename: file.name,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files)
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleSystemFileClick = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files)
      handleFile(e.target.files[0])
    }
  }

  const inputRef = useRef(null)

  const onButtonClick = (e) => {
    inputRef.current.click()
  }

  switch (editorData) {
    case false:
      return <div>Something went wrong please try again later...</div>
    case true:
      return (
        <Box component="nav">
          <Drawer
            variant="permanent"
            anchor="right"
            sx={{
              width: "200px",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                color: "#f6f6f6",
                backgroundColor: "#171923",
                boxSizing: "border-box",
                borderWidth: 0,
                width: "200px",
              },
            }}
          >
            <form
              style={{
                height: "100vh",
                width: "200px",
                maxWidth: "100%",
                textAlign: "center",
                position: "relative",
              }}
              onDragEnter={handleDrag}
              onSubmit={handleAddFile}
            >
              <input
                ref={inputRef}
                type="file"
                multiple={true}
                style={{ display: "none" }}
                onChange={handleSystemFileClick}
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <label
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                className={dragActive ? "drag-active" : ""}
              >
                <Box sx={{ height: "4.5rem" }}></Box>
                <Box width="100%">
                  <Box m="5rem 2rem 1.5rem 2rem">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      <Button
                        variant="outlined"
                        onClick={onButtonClick}
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
                        <Typography variant="h5">Select files</Typography>
                      </Button>
                    </Box>
                  </Box>
                  <List>
                    {editorFileNames.map(({ id, name }) => {
                      return (
                        <ListItem
                          key={id}
                          id={id}
                          disablePadding
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "3rem",
                            height: "3.5rem",
                          }}
                        >
                          <ListItemButton
                            // onClick={() => {
                            //   navigate(`/${lcText}/${userId}`)
                            //   setActive(lcText)
                            // }}
                            sx={{
                              backgroundColor: "transparent",
                              // active === lcText ? "#3AAFA9" : "transparent",
                              color: "#f6f6f6",
                              //   active === lcText
                              //     ? theme.palette.primary[600]
                              //     : theme.palette.secondary[100],
                              height: "100%",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                ml: "2rem",
                                color: "#f6f6f6",
                                // active === lcText
                                // //   ? theme.palette.primary[600]
                                // //   : theme.palette.secondary[200],
                              }}
                            >
                              <FileCopy />
                            </ListItemIcon>
                            <ListItemText primary={name}>
                              {/* {active === lcText && (
                            <ChevronLeftOutlinedIcon sx={{ ml: "auto" }} />
                          )} */}
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      )
                    })}
                  </List>
                </Box>
              </label>
              {dragActive && (
                <div
                  id="drag-file-element"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                  }}
                ></div>
              )}
            </form>
          </Drawer>
        </Box>
      )
  }
}

export default Editor
