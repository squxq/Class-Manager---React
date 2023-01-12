import React, { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material"
import { useParams } from "react-router-dom"
import axios from "axios"

const customCard = (text, key) => {
  return (
    <Card
      key={key}
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

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/assignments/${userId}`,
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  })

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
            <Tab value="Assigned" label="Assigned" sx={{ m: "0rem 0.5rem" }} />
            <Tab value="Pending" label="Pending" sx={{ m: "0rem 0.5rem" }} />
            <Tab
              value="Completed"
              label="Completed"
              sx={{ m: "0rem 0.5rem" }}
            />
          </Tabs>
        </Box>
      </Box>
      <Box sx={{ marginTop: "0.5rem", marginRight: "1rem" }}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((card) => {
          return customCard(`Hello ${card}.`, card)
        })}
      </Box>
    </Box>
  )
}

export default Assignments
