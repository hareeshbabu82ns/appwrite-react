import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup.jsx';
import PropTypes from 'prop-types';

const SidebarItems = ( { onSidebarClose } ) => {
  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems.map( ( item ) => {
          // {/********SubHeader**********/}
          if ( item.subheader ) {
            return <NavGroup item={item} key={item.subheader} />;

            // {/********If Sub Menu**********/}
            /* eslint no-else-return: "off" */
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} onClick={onSidebarClose} />;
          }
        } )}
      </List>
    </Box>
  );
};

SidebarItems.propTypes = {
  onSidebarClose: PropTypes.func,
};
export default SidebarItems;
