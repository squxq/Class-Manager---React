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
} from "@mui/material"
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import FlexBetween from "./FlexBetween"
import navItems from "./data"

const Sidebar = ({ drawerWidth, userId }) => {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const { pathname } = useLocation()

  useEffect(() => {
    setActive("dashboard")
  }, [pathname])

  return (
    <Box component="nav">
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
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color="#3AAFA9">
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
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

        {/* <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box> */}
      </Drawer>
    </Box>
  )
}

export default Sidebar
