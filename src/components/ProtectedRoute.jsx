import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from "prop-types";
import { fetchUser, userIdSelector } from '../state/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = ( { children } ) => {

  const dispatch = useDispatch()

  const [ isUserFetching, setUserFetching ] = useState( true )
  const [ fetchedUser, setFetchedUser ] = useState( null )
  const isLoggedIn = useSelector( userIdSelector );
  const isLoading = useSelector( ( state ) => state.loading.isLoading );


  useEffect( () => {
    dispatch( fetchUser() )
      .finally( () => {
        // console.log( 'finally' )
        setUserFetching( false )
      } )
      .then( ( { payload } ) => {
        // console.log( 'user fetched', payload )
        if ( payload?.$id )
          setFetchedUser( payload.$id )
      } )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] );

  const location = useLocation();


  if ( isLoading || isUserFetching ) return <p>Loading...</p>

  // console.log( isLoading, isLoggedIn )
  if ( !isLoggedIn && !fetchedUser ) return <Navigate to={`/auth/login?from=${location.pathname}`} />;

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;