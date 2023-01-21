import React, { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Typography,
  MenuItem,
  Tabs,
  Tab,
  Menu,
} from "@mui/material"
import FlexBetween from "./FlexBetween"
import {
  SettingsOutlined,
  ArrowDropDown,
  LogoutOutlined,
} from "@mui/icons-material"
import { MdWavingHand } from "react-icons/md"

import profilePicture from "../../assets/pfp.jpg"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const Navbar = ({ data, userRole, userName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate()
  const { id: userId } = useParams()

  const handleClose = async () => {
    setAnchorEl(null)
    await axios({
      method: "get",
      url: `http://localhost:5000/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        navigate(`/`)
      })
      .catch((err) => console.log(err))
  }

  const [value, setValue] = useState("Calendar")

  const handleChange = (e, newValue) => {
    switch (newValue) {
      case "Calendar":
        navigate(`/calendar/${userId}`)
        setValue(newValue)
        break
      case "Assignments":
        navigate(`/assignments/${userId}`)
        setValue(newValue)
        break
      case "Grades":
        navigate(`/grades/${userId}`)
        setValue(newValue)
        break
    }
  }

  return (
    <AppBar
      sx={{
        position: `relative`,
        background: `none`,
        boxShadow: `none`,
        zIndex: 1400,
        // boxShadow: "0 4px 2px -2px rgba(0,0,0,.2)",
      }}
    >
      <Toolbar sx={{ justifyContent: `space-between`, marginTop: "5px" }}>
        {/* Left Side */}
        <FlexBetween>
          <FlexBetween
            backgroundColor="#171923"
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
            position="relative"
          >
            <Typography
              variant="h5"
              display="flex"
              sx={{ fontFamily: "Poppins", fontSize: "1.5rem" }}
            >
              {data}
            </Typography>
            <MdWavingHand
              position="absolute"
              fontSize="25px"
              sx={{ left: 0 }}
            />
          </FlexBetween>
        </FlexBetween>

        {/* Middle if userRole === "Student" */}
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
          display={userRole === "Student" ? "block" : "none"}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{ margin: "1rem 0rem 1rem 0rem" }}
          >
            <Tab
              value="Calendar"
              label={
                <span
                  style={{
                    color: "#f6f6f6",
                    fontFamily: "Poppins",
                    fontSize: "1.5rem",
                  }}
                >
                  Calendar
                </span>
              }
              sx={{ m: "0rem 0.5rem" }}
            />
            <Tab
              value="Assignments"
              label={
                <span
                  style={{
                    color: "#f6f6f6",
                    fontFamily: "Poppins",
                    fontSize: "1.5rem",
                  }}
                >
                  Assignments
                </span>
              }
              sx={{ m: "0rem 0.5rem" }}
            />
          </Tabs>
        </Box>

        {/* Right Side */}
        <FlexBetween gap="1.5rem" marginLeft="14rem">
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px", color: "#f6f6f6" }} />
          </IconButton>
          <FlexBetween>
            <Button
              // onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                borderRadius: "1rem",
              }}
              onClick={handleClick}
            >
              <Box
                component="img"
                alt="pfp"
                src={profilePicture}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: "#f6f6f6" }}
                  noWrap={true}
                >
                  {userName}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: "#f6f6f6" }}
                  noWrap={true}
                >
                  {userRole === "Student" ? "Student" : "Teacher"}
                </Typography>
              </Box>
              <ArrowDropDown
                sx={{
                  color: "#f6f6f6",
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setAnchorEl(null)
              }}
              style={{ left: "8px", fontSize: "0.8rem" }}
            >
              <MenuItem onClick={handleClose}>
                <LogoutOutlined style={{ marginRight: "5px" }} />
                Logout
              </MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
