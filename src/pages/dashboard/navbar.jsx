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
} from "@mui/icons-material"
import { MdWavingHand } from "react-icons/md"

const Navbar = ({ data }) => {
  return (
    <AppBar
      sx={{
        position: `static`,
        background: `none`,
        boxShadow: `none`,
      }}
    >
      <Toolbar sx={{ justifyContent: `space-between` }}>
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
          {/* Light and dark mode button place */}
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px", color: "#f6f6f6" }} />
          </IconButton>
          {/* <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
            <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDown
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween> */}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
