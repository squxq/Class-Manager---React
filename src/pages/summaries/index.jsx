import React, { useState } from "react"
import { styled } from "@mui/system"
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { KeyboardArrowUp, KeyboardArrowDown, Search } from "@mui/icons-material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid"

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
            <Button
              variant="text"
              sx={{
                color: "#3AAFA9",
                fontSize: "1.25rem",
                marginLeft: "2rem",
              }}
              //   onClick={handleStudentClick}
            >
              + Update
            </Button>
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
  const [open, setOpen] = useState(false)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

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
            color: "#f6f6f6",
            backgroundColor: "#3AAFA9 !important",
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
              created: "yesterday",
              state: "done",
              number: "34",
              updated: "today",
            },
          ]}
          columns={[
            // {
            //   field: "display",
            //   headerName: "",
            //   flex: 0.5,
            //   renderCell: (params) => {
            //     return (
            //       <Button
            //         //   onClick={(e) => handleRemoveStudent(e, params)}
            //         variant="contained"
            //       >
            //         <KeyboardArrowDown />
            //       </Button>
            //     )
            //   },
            //   sortable: false,
            // },
            {
              field: "created",
              headerName: "Created",
              flex: 1,
            },
            {
              field: "state",
              headerName: "State",
              flex: 1,
            },
            {
              field: "number",
              headerName: "Number",
              flex: 1,
            },
            {
              field: "updated",
              headerName: "Updated",
              flex: 1,
            },
          ]}
          rowCount={8}
          rowsPerPage={8}
          rowsPerPageOptions={[]}
          sortingOrder={["desc", "asc"]}
          //   initialState={{
          //     sorting: {
          //       sortModel: [{ field: "lastName", sort: "asc" }],
          //     },
          //   }}
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

export default Summaries
