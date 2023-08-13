import { Box, Typography, useTheme } from "@mui/material";

function Header( { title, subtitle } ) {
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="h4"
        color={theme.palette.text.onDefaultSecondary}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h6" color={theme.palette.text.onDefaultTertiary}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
