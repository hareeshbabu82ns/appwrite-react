import { styled } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

const StyledDataGrid = styled( DataGrid )( ( { theme } ) => {
  // console.log( theme )
  return {
    "& .MuiDataGrid-root": {
      // border: "none",
    },
    "& .MuiDataGrid-cell": {
      // borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.tones.primary[ theme.palette.isDark ? 95 : 80 ],
      color: theme.palette.secondary[ 500 ],
      borderBottom: "none",
      fontSize: 18,
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: theme.tones.primary[ theme.palette.isDark ? 95 : 80 ],
      borderBottom: "none",
      "& .MuiTablePagination-root": {
        color: theme.palette.secondary[ 300 ],
      },
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme.palette.background.paper,
    },
  }
} )

export default StyledDataGrid