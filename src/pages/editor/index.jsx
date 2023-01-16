import React, { useState } from "react"
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import FlexBetween from "../dashboard/FlexBetween"
import { FileCopy, ChevronLeftOutlined } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"
import { DndProvider } from "react-dnd"

const Editor = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const { id: userId } = useParams()
  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: "300px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            color: "#f6f6f6",
            backgroundColor: "#171923",
            boxSizing: "border-box",
            borderWidth: 0,
            width: "300px",
          },
        }}
      >
        <Box sx={{ height: "4.5rem" }}></Box>
        <Box width="100%">
          {/* <Divider color="#f6f6f6" variant="middle" /> */}
          <Box m="1rem 2rem 1.5rem 2rem">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="0.5rem"
            >
              <Typography variant="h5" fontWeight="bold" align="center">
                FILES
              </Typography>
            </Box>
          </Box>
          <List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((elem) => {
              return (
                <ListItem
                  key={elem}
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
                    <ListItemText primary={`File ${elem}`}>
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
      </Drawer>
    </Box>
  )
}

export default Editor
