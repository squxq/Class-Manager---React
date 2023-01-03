import { Box, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Classes = () => {
  const [allClasses, setAllClasses] = useState([])

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get({
          method: "get",
          url: `http://localhost:5000/classes/${id}`,
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    }

    fetchData()
  }, [])

  return (
    <Box style={{ margin: "2.5rem" }}>
      <Box>
        <Typography variant="h4" color="#f6f6f6" fontWeight="bold">
          See your list of classes below.
        </Typography>
        <Box
          style={{
            marginTop: "20px",
            display: "grid",
            justifyContent: "space-between",
            backgroundColor: "#171923",
            height: "78.2vh",
          }}
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          rowGap="20px"
          columnGap="1.33%"
        ></Box>
      </Box>
    </Box>
  )
}

export default Classes
