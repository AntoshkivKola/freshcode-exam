import React from 'react';
import {
    getContestById,
    setOfferStatus,
    clearSetOfferStatusError,
    goToExpandedDialog,
    changeEditContest,
    changeContestViewMode,
    changeShowImage,
    changeChatShow  
} from '../../actions/actionCreator';
import {connect} from 'react-redux';
import Header from "../../components/Header/Header";
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import styles from './ContestPage.module.sass';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import CONSTANTS from '../../constants';
import Brief from '../../components/Brief/Brief';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import Error from "../../components/Error/Error";


class ContestPage extends React.Component {

    componentWillUnmount() {
        this.props.changeEditContest(false);
    }

    componentDidMount() {
        this.getData()
    }


    getData = () => {
        const {params} = this.props.match;
        this.props.getData({contestId: params.id});
    };


    setOffersList = () => {
        const array = [];
        for (let i = 0; i < this.props.contestByIdStore.offers.length; i++) {
            array.push(<OfferBox data={this.props.contestByIdStore.offers[i]}
                                 key={this.props.contestByIdStore.offers[i].id} needButtons={this.needButtons}
                                 setOfferStatus={this.setOfferStatus}
                                 contestType={this.props.contestByIdStore.contestData.contestType} date={new Date()}/>)
        }
        return array.length !== 0 ? array : <div className={styles.notFound}>There is no suggestion at this moment</div>
    };


    needButtons = (offerStatus) => {
        const contestCreatorId = this.props.contestByIdStore.contestData.User.id;
        const userId = this.props.auth.user.id;
        const contestStatus = this.props.contestByIdStore.contestData.status;
        return (contestCreatorId === userId && contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE && offerStatus === CONSTANTS.OFFER_STATUS_PENDING);
    };


    setOfferStatus = (creatorId, offerId, command) => {
        this.props.clearSetOfferStatusError();
        const {id, orderId, priority} = this.props.contestByIdStore.contestData;
        const obj = {
            command,
            offerId,
            creatorId,
            orderId,
            priority,
            contestId: id
        };
        this.props.setOfferStatus(obj);
    };


    findConversationInfo = (interlocutorId) => {
        const {messagesPreview} = this.props.chatStore;
        const {id} = this.props.auth.user;
        const participants = [id, interlocutorId];
        participants.sort((participant1, participant2) => participant1 - participant2);
        for (let i = 0; i < messagesPreview.length; i++) {
            if (isEqual(participants, messagesPreview[i].participants)) {
                return {
                    participants: messagesPreview[i].participants,
                    _id: messagesPreview[i]._id,
                    blackList: messagesPreview[i].blackList,
                    favoriteList: messagesPreview[i].favoriteList
                };
            }
        }
        return null;
    };

    goChat = () => {
        const { changeChatShow } = this.props
        const { interlocutor, isExpanded, isShow } = this.props.chatStore
        const { User } = this.props.contestByIdStore.contestData
        if (isExpanded && interlocutor?.id === User.id) {
          if (!isShow) {
            changeChatShow()
          }
          return null
        }
        
        this.props.goToExpandedDialog({
            interlocutor: User,
            conversationData: this.findConversationInfo(User.id)
        });
    };

    render() {
        const {role} = this.props.auth.user;
        const {contestByIdStore, changeShowImage, changeContestViewMode, getData, clearSetOfferStatusError} = this.props;
        const {isShowOnFull, imagePath, error, isFetching, isBrief, contestData, offers, setOfferStatusError} = contestByIdStore;
        return (
            <div>
                {/*<Chat/>*/}
                {isShowOnFull && <LightBox
                    mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
                    onCloseRequest={() => changeShowImage({isShowOnFull: false, imagePath: null})}
                />}
                <Header/>
                {error ? <div className={styles.tryContainer}><TryAgain getData={getData}/></div> :
                    (
                        isFetching ?
                            <div className={styles.containerSpinner}>
                                <Spinner/>
                            </div>
                            :
                            (<div className={styles.mainInfoContainer}>
                                <div className={styles.infoContainer}>
                                    <div className={styles.buttonsContainer}>
                        <span onClick={() => changeContestViewMode(true)}
                              className={classNames(styles.btn, {[styles.activeBtn]: isBrief})}>Brief</span>
                                        <span onClick={() => changeContestViewMode(false)}
                                              className={classNames(styles.btn, {[styles.activeBtn]: !isBrief})}>Offer</span>
                                    </div>
                                    {
                                        isBrief ?
                                            <Brief contestData={contestData} role={role} goChat={this.goChat}/>
                                            :
                                            <div className={styles.offersContainer}>
                                                {(role === CONSTANTS.CREATOR && contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE) &&
                                                <OfferForm contestType={contestData.contestType}
                                                           contestId={contestData.id}
                                                           customerId={contestData.User.id}/>}
                                                {setOfferStatusError && <Error data={setOfferStatusError.data}
                                                                               status={setOfferStatusError.status}
                                                                               clearError={clearSetOfferStatusError}/>}
                                                <div className={styles.offers}>
                                                    {this.setOffersList()}
                                                </div>
                                            </div>}
                                </div>
                                <ContestSideBar contestData={contestData}
                                                totalEntries={offers.length}/>
                            </div>)
                    )
                }
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {contestByIdStore, auth, chatStore} = state;
    return {contestByIdStore, auth, chatStore};
};

const mapDispatchToProps = (dispatch) => {
    return {
        getData: (data) => dispatch(getContestById(data)),
        setOfferStatus: (data) => dispatch(setOfferStatus(data)),
        clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
        goToExpandedDialog: (data) => dispatch(goToExpandedDialog(data)),
        changeEditContest: (data) => dispatch(changeEditContest(data)),
        changeContestViewMode: (data) => dispatch(changeContestViewMode(data)),
        changeShowImage: data => dispatch(changeShowImage(data)),
        changeChatShow: () => dispatch(changeChatShow()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);