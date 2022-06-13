import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../Spinner/Spinner';
import constants from "../../constants";

const PrivateRoute = ({ roles, ...rest }) => {
  const { user, isFetching } = useSelector(state => state.auth)
  const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN)

  if (isFetching) {
    return <Spinner />
  }

  if (user) {
    if (roles && !roles.includes(user.role)) {
      return <Redirect to='/' />
    }
    return <Route {...rest} />
  }

  if (!refreshToken) {
    return <Redirect to='/login' />
  }

  return null;
}

export default PrivateRoute
