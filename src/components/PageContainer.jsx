import PropTypes from "prop-types";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { setHeader } from "../state/globalSlice";
import { Box } from "@mui/material";

const PageContainer = ({ title, description, children, sx }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeader({ header: title, subHeader: description }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description]);

  return (
    <Box sx={sx}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </Box>
  );
};

PageContainer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default PageContainer;
