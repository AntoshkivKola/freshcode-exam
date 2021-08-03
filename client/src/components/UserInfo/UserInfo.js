import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import UpdateUserInfoForm from '../../components/UpdateUserInfoForm/UpdateUserInfoForm';
import { changeEditModeOnUserProfile} from '../../actions/actionCreator';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';

const UserInfo = (props) => {
    const {isEdit, changeEditMode, user:{avatar, firstName, lastName, displayName, email, role, balance}} = props;
    return (
        <div className={styles.mainContainer}>
            {isEdit ? <UpdateUserInfoForm/>
                :
                <div className={styles.infoContainer}>
                    <img src={avatar ? `${CONSTANTS.publicURL}${avatar}`: CONSTANTS.ANONYM_IMAGE_PATH } className={styles.avatar} alt='user'/>
                    <div className={styles.infoContainer}>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>First Name</span>
                            <span className={styles.info}>{firstName}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Last Name</span>
                            <span className={styles.info}>{lastName}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Display Name</span>
                            <span className={styles.info}>{displayName}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.info}>{email}</span>
                        </div>
                        <div className={styles.infoBlock}>
                            <span className={styles.label}>Role</span>
                            <span className={styles.info}>{role}</span>
                        </div>
                        {role === CONSTANTS.CREATOR && <div className={styles.infoBlock}>
                            <span className={styles.label}>Balance</span>
                            <span className={styles.info}>{`${balance}$`}</span>
                        </div>}
                    </div>
                </div>
            }
            <div onClick={() => changeEditMode(!isEdit)}
                 className={styles.buttonEdit}>{isEdit ? 'Cancel' : 'Edit'}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const {user} = state.auth;
    const {isEdit} = state.userProfile;
    return {user, isEdit};
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeEditMode: (data) => dispatch(changeEditModeOnUserProfile(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
