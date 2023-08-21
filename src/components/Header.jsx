import { Box, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
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
Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
export default Header;
