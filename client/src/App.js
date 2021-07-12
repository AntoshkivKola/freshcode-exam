import React, { useLayoutEffect } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import Payment from './pages/Payment/Payment'
import StartContestPage from './pages/StartContestPage/StartContestPage'
import Dashboard from './pages/Dashboard/Dashboard'
import NotFound from './components/NotFound/NotFound'
import Home from './pages/Home/Home'
import ContestPage from './pages/ContestPage/ContestPage'
import UserProfile from './pages/UserProfile/UserProfile'
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage'
import CONSTANTS from './constants'
import browserHistory from './browserHistory'
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer'
import { requestAuthRefresh } from './actions/actionCreator'
import constants from './constants'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import HowItWorks from './pages/HowItWorks'

function App () {
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    const refreshToken = localStorage.getItem(constants.REFRESH_TOKEN)
    if (refreshToken) {
      dispatch(requestAuthRefresh(refreshToken))
    }
  }, [])

  return (
    <Router history={browserHistory}>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/registration' component={RegistrationPage} />
        <Route exact path='/how-it-works' component={HowItWorks} />
        <Route exact path='/howItWorks.html'/>
    
        <PrivateRoute
          roles={['customer']}
          exact
          path='/payment'
          component={Payment}
        />
        <PrivateRoute
          roles={['customer']}
          exact
          path='/startContest'
          component={StartContestPage}
        />

        <PrivateRoute
          exact
          path='/startContest/nameContest'
          roles={['customer']}
        >
          <ContestCreationPage
            contestType={CONSTANTS.NAME_CONTEST}
            title={'Company Name'}
          />
        </PrivateRoute>
        <PrivateRoute
          exact
          path='/startContest/taglineContest'
          roles={['customer']}
        >
          <ContestCreationPage
            contestType={CONSTANTS.TAGLINE_CONTEST}
            title={'TAGLINE'}
          />
        </PrivateRoute>
        <PrivateRoute
          exact
          path='/startContest/logoContest'
          roles={['customer']}
        >
          <ContestCreationPage
            contestType={CONSTANTS.LOGO_CONTEST}
            title={'LOGO'}
          />
        </PrivateRoute>

        <PrivateRoute
          roles={['customer', 'creator']}
          exact
          path='/dashboard'
          component={Dashboard}
        />
        <PrivateRoute
          roles={['customer','creator']}
          exact
          path='/contest/:id'
          component={ContestPage}
        />
        <PrivateRoute
          roles={['customer', 'creator']}
          exact
          path='/account'
          component={UserProfile}
        />
        <PrivateRoute component={NotFound} />
      </Switch>
      <ChatContainer />
    </Router>
  )
}

export default App
