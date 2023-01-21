import React from "react"
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  Button,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  ArrowDropDown,
  LogoutOutlined,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FlexBetween from "./FlexBetween"
import navItems from "./data"

import profilePicture from "../../assets/pfp.jpg"
import axios from "axios"

const Sidebar = ({ drawerWidth, userId, userRole, userName }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const { pathname } = useLocation()

  useEffect(() => {
    setActive(pathname.split("/")[1])
  }, [pathname])

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async () => {
    setAnchorEl(null)
    await axios({
      method: "get",
      url: `https://admin-backend-i5xx.onrender.com/logout`,
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        navigate(`/`)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Box component="nav" display={userRole === "Teacher" ? "block" : "none"}>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: "#f6f6f6",
            backgroundColor: "#171923",
            boxSizing: "border-box",
            borderWidth: 0,
            width: drawerWidth,
          },
          boxShadow: 3,
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 1rem">
            <FlexBetween color="#3AAFA9">
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold" align="center">
                  CLASS MANAGER
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
          <List>
            {navItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                    {text}
                  </Typography>
                )
              }
              const lcText = text.toLowerCase()

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}/${userId}`)
                      setActive(lcText)
                    }}
                    sx={{
                      backgroundColor:
                        active === lcText ? "#3AAFA9" : "transparent",
                      color: "#f6f6f6",
                      //   active === lcText
                      //     ? theme.palette.primary[600]
                      //     : theme.palette.secondary[100],
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
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}>
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        <Box
          position="absolute"
          bottom="1.5rem"
          style={{
            width: "100%",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{ left: "8px" }}
          >
            <MenuItem onClick={handleClose} style={{ fontSize: "1rem" }}>
              <LogoutOutlined style={{ marginRight: "5px" }} />
              Logout&nbsp;&nbsp;&nbsp;&nbsp;
            </MenuItem>
          </Menu>
          <Divider style={{ backgroundColor: "#f6f6f6" }} variant="middle" />
          <FlexBetween textTransform="none" gap="3rem" m="1.5rem 2rem 0 3.5rem">
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
                borderRadius: "1rem",
              }}
            >
              <Box
                component="img"
                alt="pfp"
                src={profilePicture}
                height="42px"
                width="42px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: "#f6f6f6", fontSize: "1rem" }}
                >
                  {userName.split(" ")[0]}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: "#f6f6f6", fontSize: "0.85rem" }}
                >
                  {userRole}
                </Typography>
              </Box>
              <ArrowDropDown
                sx={{
                  color: "#f6f6f6",
                  fontSize: "25px",
                }}
              />
            </Button>
          </FlexBetween>
        </Box>
      </Drawer>
    </Box>
  )
}

export default Sidebar
