import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"
import Navbar from "./navbar"
import axios from "axios"

const Layout = () => {
  const [layoutData, setLayoutData] = useState(false)
  const [userId, setUserId] = useState(0)
  const [data, setData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: `get`,
        url: `http://localhost:5000/layout`,
        withCredentials: true,
      })
        .then((res) => {
          setLayoutData(res.data.success)
          setUserId(res.data.userId)
          setData(res.data.data)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  })

  switch (layoutData) {
    case false:
      return <h1>Something went wrong, please try again later...</h1>
    case true:
      return (
        <Box display="flex" width="100%" height="100%">
          <Sidebar drawerWidth="300px" userId={userId} />
          <Box flexGrow={1} sx={{ backgroundColor: "#171923" }}>
            <Navbar data={data} />
            <Outlet />
          </Box>
        </Box>
      )
  }
}

export default Layout
