import React, { useState, useRef, useEffect } from "react"
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  Pagination,
  PaginationItem,
  IconButton,
  TextField,
} from "@mui/material"
import FlexBetween from "../dashboard/FlexBetween"
import { FileCopy, ChevronLeftOutlined, Add } from "@mui/icons-material"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { read } from "xlsx"
import axios from "axios"
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid"
import DataGridCustomToolbar from "./custom-toolbar"
import { styled } from "@mui/system"

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: "rgba(255,255,255,0.85)",
  fontFamily: "Poppins",
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    borderRight: `1px solid #303030`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderTop: `1px solid #303030`,
    borderBottom: 0,
    borderRight: `1px solid #303030`,
  },
  "& .MuiDataGrid-cell": {
    color: "rgba(255, 255, 255, 0.65)",
  },
  "& .MuiPaginationItem-root": {
    borderRadius: 0,
  },
  "& .MuiDataGrid-columnHeaderTitle:hover": {
    color: "#3AAFA9",
  },
  "& .MuiDataGrid-cellContent:hover": {
    color: "#3AAFA9",
  },
  "& .MuiDataGrid-cell:hover": {
    cursor: "pointer",
  },
  "& .MuiDataGrid-columnHeader:hover": {
    cursor: "pointer",
  },
  "&.Mui-selected": {
    backgroundColor: "rebeccapurple !important",
    color: "yellow",
    "&:hover": {
      color: "#3AAFA9",
      backgroundColor: "purple",
    },
  },
}))

const CustomPagination = ({ pageNames, pageCount, switchPage }) => {
  const apiRef = useGridApiContext()

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      size="large"
      count={pageCount}
      onChange={switchPage}
      renderItem={(item) => {
        if (item.type === "page") {
          item.page = pageNames[item.page - 1]
          return <PaginationItem {...item} />
        }
      }}
    />
  )
}

const Editor = () => {
  const navigate = useNavigate()
  const [active, setActive] = useState("")
  const { id: userId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const [dragActive, setDragActive] = useState(false)

  const [editorData, setEditorData] = useState(false)
  const [editorFileNames, setEditorFileNames] = useState([])
  const [editorErrors, setEditorErrors] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/editor/${userId}`,
      })
        .then((res) => {
          console.log(res)
          setEditorData(true)
          setEditorFileNames(res.data.filenames)
        })
        .catch((err) => {
          if (
            err.response.data.err &&
            err.response.data.err === "No files found..."
          ) {
            setEditorErrors(err.response.data.err)
          } else {
            console.log(err)
          }
        })
    }

    fetchData()
  }, [])

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleAddFile = (e) => {
    e.preventDefault()
  }

  const handleFile = async (file) => {
    const data = await file.arrayBuffer()
    const workbook = read(data)

    await axios({
      method: "post",
      url: `http://localhost:5000/editor/${userId}`,
      data: {
        file: workbook,
        filename: file.name,
      },
    })
      .then((res) => {
        console.log(res)

        setEditorFileNames([...editorFileNames, res.data.file])
      })
      .catch((err) => console.log(err))
  }

  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files)
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleSystemFileClick = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files)
      handleFile(e.target.files[0])
    }
  }

  const inputRef = useRef(null)

  const onButtonClick = (e) => {
    inputRef.current.click()
  }

  const [pageNames, setPageNames] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [sheet, setSheet] = useState([])
  const [columns, setColumns] = useState([])

  const getSingleSheet = async (id, sheet) => {
    await axios({
      method: "get",
      url: `http://localhost:5000/file/${userId}`,
      params: {
        id: id,
        sheet: sheet,
      },
    })
      .then((res) => {
        console.log(res)
        setPageNames(res.data.pages.pagesnames)
        setPageCount(res.data.pages.pagescount)
        setColumns(res.data.columns)
        setSheet(res.data.sheet)

        setSearchParams({ id, sheet, sheetname: res.data.sheetname })
      })
      .catch((err) => console.log(err))
  }

  const handleFileClick = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    await getSingleSheet(e.currentTarget.id, 1)
  }

  const [currentPage, setCurrentPage] = useState()

  const switchPage = async (event, value) => {
    const sheetName = event.currentTarget.textContent
    await getSingleSheet(searchParams.get("id"), value)
  }

  const [addRowData, setAddRowData] = useState({})
  const [addColumnData, setAddColumnData] = useState({})
  const [columnName, setColumnName] = useState("")
  const [patchCell, setPatchCell] = useState([])

  const handleCellEditCommit = (event, details) => {
    if (event.id === "insertId" && !isNaN(Number(event.value))) {
      setAddRowData({
        ...addRowData,
        [event.field]: Number(event.value),
      })
    } else if (event.field === "placeholder" && !isNaN(Number(event.value))) {
      setAddColumnData({
        ...addColumnData,
        [event.id]: Number(event.value),
      })
    } else {
      setPatchCell((oldArray) => [
        ...oldArray,
        {
          rowId: event.id,
          columnName: event.field,
          value: event.value,
        },
      ])
      handlePatchCell()
    }
  }

  const handlePatchCell = async () => {
    const fileId = searchParams.get("id")
    await axios({
      method: "patch",
      url: `http://localhost:5000/file/${fileId}`,
      data: {
        type: "cell",
        data: patchCell,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  const handleAddRow = async (event) => {
    const fileId = searchParams.get("id")
    const sheetname = searchParams.get("sheetname")
    await axios({
      method: "patch",
      url: `http://localhost:5000/file/${fileId}`,
      data: {
        type: "row",
        data: addRowData,
      },
      params: {
        sheetname,
      },
    })
      .then((res) => {
        console.log(res)
        setPageNames(res.data.pages.pagesnames)
        setPageCount(res.data.pages.pagescount)
        setColumns(res.data.columns)
        setSheet(res.data.sheet)
        setAddRowData({})
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateColumn = async (dataColumns) => {
    const fileId = searchParams.get("id")
    const sheetname = searchParams.get("sheetname")
    console.log(dataColumns, addColumnData)
    await axios({
      method: "patch",
      url: `http://localhost:5000/file/${fileId}`,
      data: {
        type: "column",
        data: addColumnData,
        columnName,
      },
      params: {
        sheetname,
        columns: dataColumns,
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.columns, res.data.sheet)
        setColumns(res.data.columns)
        setSheet(res.data.sheet)
        console.log(sheet)
        setAddColumnData({})
        setColumnName("")
      })
      .catch((err) => console.log(err))
  }

  switch (editorData) {
    case false:
      return <div>Something went wrong please try again later...</div>
    case true:
      return (
        <Box component="nav">
          <Drawer
            variant="permanent"
            anchor="right"
            sx={{
              width: "250px",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                color: "#f6f6f6",
                backgroundColor: "#171923",
                boxSizing: "border-box",
                borderWidth: 0,
                width: "250px",
              },
            }}
          >
            <form
              style={{
                height: "100vh",
                width: "250px",
                maxWidth: "100%",
                textAlign: "center",
                position: "relative",
              }}
              onDragEnter={handleDrag}
              onSubmit={handleAddFile}
            >
              <input
                ref={inputRef}
                type="file"
                multiple={true}
                style={{ display: "none" }}
                onChange={handleSystemFileClick}
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              />
              <label
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                }}
                className={dragActive ? "drag-active" : ""}
              >
                <Box sx={{ height: "4.5rem" }}></Box>
                <Box width="100%">
                  <Box m="5rem 2rem 1.5rem 2rem">
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="0.5rem"
                    >
                      <Button
                        variant="outlined"
                        onClick={onButtonClick}
                        sx={{
                          border: "1px solid #f6f6f6",
                          color: "#f6f6f6",
                          boxShadow: "0 1px 2px rgba(255, 255, 255, 0.7)",
                          "&:hover": {
                            backgroundColor: "transparent",
                            border: "1px solid #3AAFA9",
                            boxShadow: "0 5px 10px rgba(58, 175, 169, 0.7)",
                          },
                        }}
                      >
                        <Typography variant="h5">Select files</Typography>
                      </Button>
                    </Box>
                  </Box>
                  <List>
                    {editorFileNames.map(({ id, name }) => {
                      return (
                        <ListItem
                          key={id}
                          id={id}
                          disablePadding
                          sx={{
                            fontFamily: "Poppins",
                            fontSize: "3rem",
                            height: "3.5rem",
                          }}
                        >
                          <ListItemButton
                            onClick={handleFileClick}
                            id={id}
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
                            <ListItemText primary={name}>
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
              </label>
              {dragActive && (
                <div
                  id="drag-file-element"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "0px",
                    right: "0px",
                    bottom: "0px",
                    left: "0px",
                  }}
                ></div>
              )}
            </form>
          </Drawer>
          <Box
            margin="2rem 0rem 2rem 2rem"
            height="86.3vh"
            maxWidth="calc(100% - 250px - 4rem)"
            minWidth="calc(100% - 250px - 4rem)"
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
            <StyledDataGrid
              rowHeight={30}
              getRowId={(row) => {
                return row.id
              }}
              disableColumnMenu={true}
              rows={sheet || []}
              columns={[
                {
                  field: "rows",
                  headerName: "",
                  sortable: false,
                  width: 50,
                  align: "center",
                  renderCell: (index) => {
                    if (index.value === "insert") {
                      return (
                        <Box className="MuiDataGrid-cellContent">
                          <IconButton
                            sx={{ padding: 0, marginLeft: "1px" }}
                            onClick={handleAddRow}
                          >
                            <Add sx={{ "&:hover": { color: "#3AAFA9" } }} />
                          </IconButton>
                        </Box>
                      )
                    }
                    return (
                      <Box className="MuiDataGrid-cellContent">
                        <Typography align="center">
                          {index.api.getRowIndex(index.row.id) + 1}
                        </Typography>
                      </Box>
                    )
                  },
                  preProcessEditCellProps: (params) => {
                    return {
                      ...params.props,
                      error: Number(params.props.value) === NaN,
                    }
                  },
                },
                ...columns,
                {
                  field: "placeholder",
                  headerName: "",
                  sortable: false,
                  align: "center",
                  editable: true,
                  width: 150,
                  renderHeader: () => (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        sx={{
                          width: "100%",
                          "& .MuiInputBase-input": {
                            color: "#f6f6f6",
                          },
                          "& label.Mui-focused": {
                            color: "#3AAFA9",
                          },
                          "& .MuiInput-underline:before": {
                            borderBottomColor: "#f6f6f6",
                          },
                          "& .MuiInput-underline:after": {
                            borderBottomColor: "#3AAFA9",
                          },
                        }}
                        placeholder="Col's name..."
                        variant="standard"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                      />
                      <IconButton
                        sx={{ padding: 0, marginLeft: "8px" }}
                        onClick={() => {
                          handleUpdateColumn(columns)
                        }}
                      >
                        <Add sx={{ "&:hover": { color: "#3AAFA9" } }} />
                      </IconButton>
                    </Box>
                  ),
                  preProcessEditCellProps: (params) => {
                    return {
                      ...params.props,
                      error: isNaN(Number(params.props.value)),
                    }
                  },
                },
              ]}
              rowsPerPageOptions={[]}
              sortingOrder={["desc", "asc"]}
              initialState={{
                sorting: {
                  sortModel: [{ field: "updated", sort: "desc" }],
                },
              }}
              components={{
                Toolbar: DataGridCustomToolbar,
                Pagination: CustomPagination,
              }}
              componentsProps={{
                pagination: {
                  pageNames,
                  pageCount,
                  switchPage,
                },
              }}
              pagination={true}
              onCellEditCommit={handleCellEditCommit}
            />
          </Box>
        </Box>
      )
  }
}

export default Editor
