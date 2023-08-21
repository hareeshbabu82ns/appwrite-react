import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  useTheme,
} from '@mui/material';
import PropTypes from 'prop-types';

// components
// import Profile from './Profile.js';
// import { IconBellRinging, IconMenu } from '@tabler/icons';
import {
  DarkModeOutlined,
  RingVolumeOutlined as IconBellRinging,
  Menu as IconMenu,
  LightModeOutlined,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import SettingsDrawerButton from '../../../components/SettingsDrawerButton.jsx';
import { setMode } from '../../../state/themeSlice.js';

export const AppBarStyled = styled( AppBar )( ( { theme } ) => ( {
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [ theme.breakpoints.up( 'lg' ) ]: {
    minHeight: '70px',
  },
} ) );
export const ToolbarStyled = styled( Toolbar )( ( { theme } ) => ( {
  width: '100%',
  color: theme.palette.text.secondary,
} ) );

const Header = ( props ) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  // const navigate = useNavigate();

  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          // eslint-disable-next-line react/prop-types
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton onClick={() => dispatch( setMode() )}>
            {theme.palette.isDark ? (
              <DarkModeOutlined sx={{ fontSize: '25px' }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: '25px' }} />
            )}
          </IconButton>

          <SettingsDrawerButton />
          {/* <Profile /> */}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
