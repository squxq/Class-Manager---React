import React, { useState, useEffect } from "react"
import { styled } from "@mui/system"
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Collapse,
} from "@mui/material"
import { KeyboardArrowUp, KeyboardArrowDown, Search } from "@mui/icons-material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid"
import axios from "axios"
import { useParams } from "react-router-dom"

const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#f6f6f6",
  },
  "& .MuiInput-underline:hover": {
    borderBottomColor: "#f6f6f6",
    borderColor: "#f6f6f6",
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "#f6f6f6",
    borderColor: "#f6f6f6",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#3AAFA9",
    borderColor: "#f6f6f6",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#3AAFA9",
    },
    "&:hover fieldset": {
      borderColor: "#3AAFA9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3AAFA9",
    },
  },
})

const DataGridCustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <Box>
            <GridToolbarExport sx={{ color: "#3AAFA9", fontSize: "1.25rem" }} />
          </Box>
        </FlexBetween>
        <Box>
          <CssTextField
            label="Search..."
            sx={{
              mb: "0.5rem",
              width: "15rem",
              input: { color: "#f6f6f6" },
              label: { color: "#f6f6f6" },
              fontSize: "1.25rem",
            }}
            // onChange={(e) => setSearchInput(e.target.value)}
            // value={searchInput}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // onClick={async () => {
                    //   const id = searchParams.get("id")
                    //   setSearchParams({ id, searchInput })
                    //   await axios({
                    //     method: "get",
                    //     url: `http://localhost:5000/students/${id}`,
                    //     params: {
                    //       id,
                    //       searchInput,
                    //     },
                    //   })
                    //     .then((res) => {
                    //       console.log(res)
                    //       setAllStudents(res.data.students)
                    //       setSearchInput("")
                    //     })
                    //     .catch((err) => console.log(err))
                    // }}
                    sx={{ color: "#f6f6f6" }}
                  >
                    <Search sx={{ color: "#f6f6f6" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </FlexBetween>
    </GridToolbarContainer>
  )
}

const Summaries = () => {
  const [summariesData, setSummariesData] = useState(false)
  const [summaries, setSummaries] = useState([])

  const { id: userId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/summaries/${userId}`,
      })
        .then((res) => {
          console.log(res)
          setSummariesData(res.data.success)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  switch (summariesData) {
    case false:
      return <div>Something went wrong, please try again later.</div>
    case true:
      return (
        <Box sx={{ m: "1.5rem 2.5rem" }}>
          <Box
            margin="2rem 2rem 2rem 2rem"
            sx={{
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Typography variant="h4" color="#f6f6f6">
              Summaries
            </Typography>
            <Button
              variant="contained"
              sx={{
                margin: "0rem 1rem",
                backgroundColor: "#3AAFA9",
                color: "#f6f6f6",
                "&:hover": {
                  backgroundColor: "rgb(58, 175, 169, 0.7)",
                },
              }}
              onClick={() => {
                console.log("clicked")
              }}
            >
              Create
            </Button>
          </Box>
          <Box
            margin="2rem 2rem 2rem 4.5rem"
            height="78.6vh"
            sx={{
              width: "90%",
              display: "flex",
              justifyContent: "center",
              "& .MuiDataGrid-root": {
                border: "none",
                fontFamily: "Poppins",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#171923",
                color: "#f6f6f6",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#171923",
              },
              "& .MuiDataGrid-Containeer": {
                backgroundColor: "#f6f6f6",
                color: "#f6f6f6",
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#f6f6f6`,
              },
              ".MuiButtonBase-root": {
                color: "#f6f6f6",
              },
              ".MuiToolbar-root": {
                color: "#f6f6f6",
              },
              ".MuiSvgIcon-root": {
                color: "#f6f6f6",
              },
              ".MuiDataGrid-columnHeaderTitleContainer": {
                borderColor: "#f6f6f6 !important",
              },
              ".MuiDataGrid-row": {
                color: "#f6f6f6 !important",
                fontSize: "0.9rem",
              },
              ".MuiDataGrid-selectedRowCount": {
                color: "#171923 !important",
                cursor: "default",
              },
            }}
          >
            <DataGrid
              getRowId={(row) => row.id}
              rows={[
                {
                  id: "jklashdfaskj",
                  display: "",
                  created: "yesterday",
                  state: "done",
                  number: "34",
                  content: "correcao do tpc etc",
                  updated: "today",
                },
                {
                  id: "sdfjkhgskdjfg",
                  display: "",
                  created: "today",
                  state: "done",
                  number: "38",
                  content: "correcao do tpc etc",
                  updated: "today",
                },
              ]}
              columns={[
                {
                  field: "created",
                  headerName: "Created",
                  flex: 0.5,
                },
                {
                  field: "state",
                  headerName: "State",
                  flex: 0.5,
                },
                {
                  field: "number",
                  headerName: "Number",
                  flex: 0.5,
                },
                {
                  field: "content",
                  headerName: "Content",
                  flex: 1,
                },
                {
                  field: "updated",
                  headerName: "Updated",
                  flex: 0.5,
                },
              ]}
              pageSize={10}
              rowsPerPageOptions={[]}
              sortingOrder={["desc", "asc"]}
              initialState={{
                sorting: {
                  sortModel: [{ field: "updated", sort: "asc" }],
                },
              }}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: {
                  // searchInput,
                  // setSearchInput,
                  // setAllStudents,
                  // setSearchParams,
                  // searchParams,
                  // handleStudentClick,
                },
              }}
            />
          </Box>
        </Box>
      )
  }
}

export default Summaries
