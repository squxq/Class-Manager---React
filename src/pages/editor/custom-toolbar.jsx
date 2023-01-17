import { Box, TextField, InputAdornment, IconButton } from "@mui/material"
import { Search } from "@mui/icons-material"
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid"
import FlexBetween from "../dashboard/FlexBetween"
import { styled } from "@mui/system"

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

export default DataGridCustomToolbar
