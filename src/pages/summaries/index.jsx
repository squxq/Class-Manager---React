import React, { useState, useEffect } from "react"
import { styled } from "@mui/system"
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Menu,
  MenuItem,
  Stack,
  Alert,
} from "@mui/material"
import {
  Search,
  Delete,
  KeyboardArrowDown,
  Groups2Outlined,
} from "@mui/icons-material"
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridLinkOperator,
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
            <GridToolbarFilterButton
              sx={{ color: "#3AAFA9", fontSize: "1.25rem" }}
            />
            <GridToolbarExport
              sx={{
                color: "#3AAFA9",
                fontSize: "1.25rem",
                marginLeft: "1rem",
              }}
              printOptions={{ disableToolbarButton: true }}
            />
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

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: "1rem",
    minWidth: 180,
    // color:
    //   // theme.palette.mode === "light"
    //   //   ? "rgb(55, 65, 81)"
    //   //   : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        // color: theme.palette.text.secondary,
        marginRight: "1.5rem",
      },
      "&:active": {
        // backgroundColor: alpha(
        //   theme.palette.primary.main,
        //   theme.palette.action.selectedOpacity
        // ),
      },
    },
  },
}))

const Summaries = () => {
  const [summariesData, setSummariesData] = useState(false)
  const [summaries, setSummaries] = useState([])

  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { id: userId } = useParams()

  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState({})
  const [classError, setClassError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      console.log(userId)
      await axios({
        method: "get",
        url: `http://localhost:5000/summaries/${userId}`,
      })
        .then((res) => {
          console.log(res)
          setSummariesData(res.data.success)
          setClasses(res.data.classes)
          console.log(res.data.summaries)
          setSummaries(res.data.summaries)
        })
        .catch((err) => console.log(err))
    }

    fetchData()
  }, [])

  const datagridRef = React.createRef()

  const createSummary = async () => {
    if (!selectedClass.name) {
      setClassError(true)
      setTimeout(() => {
        setClassError(false)
      }, 2000)
    } else {
      await axios({
        method: "post",
        url: `http://localhost:5000/summaries/${userId}`,
        data: {
          class: selectedClass.id,
        },
      })
        .then((res) => {
          console.log(res)
          setSummaries([...summaries, res.data.summary])
        })
        .catch((err) => console.log(err))
    }
  }

  const updateSummary = async (e) => {
    console.log(e)
    await axios({
      method: "patch",
      url: `http://localhost:5000/summaries/${userId}`,
      data: {
        id: e.id,
        content: e.value,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteSummary = async (e) => {
    await axios({
      method: "delete",
      url: `http://localhost:5000/summaries/${userId}`,
      params: {
        summaryId:
          e.currentTarget.parentElement.parentElement.parentElement.getAttribute(
            "data-id"
          ),
      },
    })
      .then((res) => {
        console.log(res)
        setSummaries(res.data.summaries)
      })
      .catch((err) => console.log(err))
  }

  const [queryOptions, setQueryOptions] = useState({})

  const onFilterChange = async (filterModel) => {
    console.log(filterModel.items[0])
    setQueryOptions({ filterModel: { ...filterModel.items[0] } })
    await axios({
      method: "get",
      url: `http://localhost:5000/summaries/${userId}`,
    })
  }

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
              See your list of summaries below.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              {classError && (
                <Stack>
                  <Alert
                    variant="outlined"
                    severity="error"
                    sx={{
                      padding: "1px 15px 1px 10px",
                      height: "41px !important",
                      fontSize: "0.85rem",
                      "& .MuiAlert-message": {
                        paddingTop: "9px",
                      },
                    }}
                  >
                    Please select a Class
                  </Alert>
                </Stack>
              )}
              <Button
                variant="contained"
                sx={{
                  margin: "0rem 1rem",
                  backgroundColor: "#3AAFA9",
                  color: "#f6f6f6",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "rgb(58, 175, 169, 0.7)",
                  },
                }}
                onClick={createSummary}
              >
                Create New Summary
              </Button>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  backgroundColor: "#3AAFA9",
                  color: "#f6f6f6",
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "rgb(58, 175, 169, 0.7)",
                  },
                }}
              >
                {selectedClass.name ? selectedClass.name : "Class"}
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {classes.map((singleClass) => {
                  return (
                    <MenuItem
                      key={singleClass.id}
                      onClick={() => {
                        handleClose()
                        setSelectedClass(singleClass)
                      }}
                      disableRipple
                    >
                      <Groups2Outlined />
                      {singleClass.name}
                    </MenuItem>
                  )
                })}
              </StyledMenu>
            </Box>
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
              ref={datagridRef}
              getRowId={(row) => {
                return row.id
              }}
              rows={summaries}
              columns={[
                {
                  field: "created",
                  headerName: "Created",
                  flex: 0.6,
                },
                {
                  field: "state",
                  headerName: "State",
                  flex: 0.4,
                },
                {
                  field: "class",
                  headerName: "Class",
                  flex: 0.4,
                },
                {
                  field: "number",
                  headerName: "Number",
                  flex: 0.4,
                },
                {
                  field: "content",
                  headerName: "Content",
                  flex: 1.2,
                  editable: true,
                  preProcessEditCellProps: (e) => {
                    return { ...e.props, error: e.props.value === "" }
                  },
                },
                {
                  field: "updated",
                  headerName: "Updated",
                  flex: 0.6,
                },
                {
                  field: "delete",
                  headerName: "Delete",
                  flex: 0.2,
                  sortable: false,
                  renderCell: () => {
                    return (
                      <Box>
                        <IconButton onClick={handleDeleteSummary}>
                          <Delete />
                        </IconButton>
                      </Box>
                    )
                  },
                },
              ]}
              pageSize={10}
              rowsPerPageOptions={[]}
              sortingOrder={["desc", "asc"]}
              initialState={{
                sorting: {
                  sortModel: [{ field: "updated", sort: "desc" }],
                },
              }}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                filterPanel: {
                  // Force usage of "And" operator
                  linkOperators: [GridLinkOperator.And],
                  // Display columns by ascending alphabetical order
                  columnsSort: "asc",
                  filterFormProps: {
                    // Customize inputs by passing props
                    linkOperatorInputProps: {
                      variant: "outlined",
                      size: "small",
                    },
                    columnInputProps: {
                      variant: "outlined",
                      size: "small",
                      sx: { mt: "auto" },
                    },
                    operatorInputProps: {
                      variant: "outlined",
                      size: "small",
                      sx: { mt: "auto" },
                    },
                    valueInputProps: {
                      InputComponentProps: {
                        variant: "outlined",
                        size: "small",
                      },
                    },
                    deleteIconProps: {
                      sx: {
                        "& .MuiSvgIcon-root": { color: "#d32f2f" },
                      },
                    },
                  },
                  sx: {
                    // Customize inputs using css selectors
                    "& .MuiDataGrid-filterForm": { p: 2 },
                    "& .MuiDataGrid-filterForm:nth-child(even)": {
                      backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#444" : "#f5f5f5",
                    },
                    "& .MuiDataGrid-filterFormLinkOperatorInput": { mr: 2 },
                    "& .MuiDataGrid-filterFormColumnInput": {
                      mr: 2,
                      width: 150,
                    },
                    "& .MuiDataGrid-filterFormOperatorInput": { mr: 2 },
                    "& .MuiDataGrid-filterFormValueInput": { width: 200 },
                  },
                },
              }}
              onCellEditCommit={updateSummary}
              onFilterModelChange={onFilterChange}
            />
          </Box>
        </Box>
      )
  }
}

export default Summaries
