import { Box, Typography, useTheme } from '@mui/material';
import { AppBarStyled, ToolbarStyled } from '../../header/Header';
import logo from "/src/assets/react.svg";

const Logo = () => {
  const theme = useTheme();
  return (
    <AppBarStyled position="sticky" color="default" elevation={0}>
      <ToolbarStyled sx={{ alignItems: "center" }}>
        <img src={logo} alt="MUI Logo" />
        <Box sx={{ width: 16 }} />
        <Typography variant="h4" color={theme.palette.tertiary.main}>
          AppWrite
        </Typography>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Logo;
