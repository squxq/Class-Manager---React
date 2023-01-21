import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(false)
  const [dashboardError, setDashboardError] = useState("")

  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://localhost:5000/dashboard/${id}`)
        .then((res) => {
          setDashboardData(res.data.success)
        })
        .catch((err) => {
          setDashboardError(err.response.data.err)
        })
    }

    fetchData()
  }, [])

  switch (dashboardData) {
    case false:
      return <h1>{dashboardError}</h1>
    case true:
      return <h1 sx={{ color: "#f6f6f6" }}>Dashboard</h1>
  }
}

export default Dashboard
