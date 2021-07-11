import React from 'react';
import CONSTANTS from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import ModeratorDashboard from '../../components/ModeratorDashboard';
import Header from '../../components/Header/Header';
import {connect} from 'react-redux';


const Dashboard = (props) => {
    const {role, history} = props;
    const dashboards = {
        [CONSTANTS.CUSTOMER]: <CustomerDashboard history={history} match={props.match}/>,
        [CONSTANTS.CREATOR]:  <CreatorDashboard history={history} match={props.match}/>,
        [CONSTANTS.MODERATOR]: <ModeratorDashboard history={history} match={props.match}/>,
    
    }
    return (
        <div>
            <Header/>
            {dashboards[role]}
        </div>
    );
};

const mapStateToProps = (state) => {
    return state.auth.user
};

export default connect(mapStateToProps)(Dashboard);
