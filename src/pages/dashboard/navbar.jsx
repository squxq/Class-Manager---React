import React from "react"
import {
  AppBar,
  InputBase,
  Toolbar,
  useTheme,
  IconButton,
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material"
import FlexBetween from "./FlexBetween"
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDown,
  LogoutOutlined,
} from "@mui/icons-material"
import { MdWavingHand } from "react-icons/md"

import profilePicture from "../../assets/pfp.jpg"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Navbar = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const navigate = useNavigate()

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

  return (
    <AppBar
      sx={{
        position: `static`,
        background: `none`,
        boxShadow: `none`,
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
            <Typography variant="h5" display="flex">
              {data}
            </Typography>
            <MdWavingHand
              position="absolute"
              fontSize="25px"
              sx={{ left: 0 }}
            />
          </FlexBetween>
        </FlexBetween>

        {/* Right Side */}
        <FlexBetween gap="1.5rem">
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
                >
                  {/* {user.name} */} Francisco
                </Typography>
                <Typography fontSize="0.75rem" sx={{ color: "#f6f6f6" }}>
                  {/* {user.occupation} */} Professor
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
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
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
