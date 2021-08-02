import React from 'react';
import styles from './Header.module.sass';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CONSTANTS from '../../constants';
import {clearUserStore, headerRequest} from '../../actions/actionCreator';


class Header extends React.Component{
    logOut = () => {
        this.props.clearUserStore();
        this.props.history.replace('/login');
    };
    countReminderEvents = () =>{
        return this.props.events.filter(event => event.isReminded).length;
    }
    renderLoginButtons = () => {
        if (this.props.user) {
            return (
                <>
                    <div className={styles.userInfo}>
                        <img
                            src={this.props.user.avatar ? `${CONSTANTS.publicURL}${this.props.user.avatar}` : CONSTANTS.ANONYM_IMAGE_PATH }
                            alt='user'/>
                        <span>{`Hi, ${this.props.user.displayName}`}</span>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt='menu'/>
                        <ul>
                            <li><Link to='/dashboard'
                                      style={{textDecoration: 'none'}}><span>View Dashboard</span></Link></li>
                            <li><Link to='/account' style={{textDecoration: 'none'}}><span>My Account</span></Link></li>
                            <li><Link to='http:/www.google.com'
                                      style={{textDecoration: 'none'}}><span>Messages</span></Link></li>
                            <li className={styles.eventsLink}>
                                {this.countReminderEvents() ? <div className={styles.countEvents}>{this.countReminderEvents()}</div>: null}
                                <Link to='/events'
                                      style={{textDecoration: 'none'}}><span>Events</span></Link></li>
                                      
                            <li><Link to='http:/www.google.com' style={{textDecoration: 'none'}}><span>Affiliate Dashboard</span></Link>
                            </li>
                            <li><span onClick={this.logOut}>Logout</span></li>
                        </ul>
                        {this.countReminderEvents() ? <div className={styles.countEvents}>{this.countReminderEvents()}</div>: null}
                    </div>
                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`} className={styles.emailIcon} alt='email'/>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/login' style={{textDecoration: 'none'}}><span className={styles.btn}>LOGIN</span></Link>
                    <Link to='/registration' style={{textDecoration: 'none'}}><span
                        className={styles.btn}>SIGN UP</span></Link>
                </>
            )
        }
    };

    render() {
        if (this.props.isFetching) {
            return null;
        }
        return (
            <div className={styles.headerContainer}>
                <div className={styles.fixedHeader}>
                    <span className={styles.info}>Squadhelp recognized as one of the Most Innovative Companies by Inc Magazine.</span>
                    <a href="http://www.google.com">Read Announcement</a>
                </div>
                <div className={styles.loginSignnUpHeaders}>
                    <div className={styles.numberContainer}>
                        <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt='phone'/>
                        <span>(877)&nbsp;355-3585</span>
                    </div>
                    <div className={styles.userButtonsContainer}>
                        {this.renderLoginButtons()}
                    </div>
                </div>
                <div className={styles.navContainer}>
                    <Link to="/"><img src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`} className={styles.logo} alt='blue_logo'/></Link>
                    <div className={styles.leftNav}>
                        <div className={styles.nav}>
                            <ul>
                                <li>
                                    <span>NAME IDEAS</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                                alt='menu'/>
                                    <ul>
                                        <li><a href="http://www.google.com">Beauty</a></li>
                                        <li><a href="http://www.google.com">Consulting</a></li>
                                        <li><a href="http://www.google.com">E-Commerce</a></li>
                                        <li><a href="http://www.google.com">Fashion & Clothing</a></li>
                                        <li><a href="http://www.google.com">Finance</a></li>
                                        <li><a href="http://www.google.com">Real Estate</a></li>
                                        <li><a href="http://www.google.com">Tech</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">More Categories</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span>CONTESTS</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                              alt='menu'/>
                                    <ul>
                                        <li><a href="/howItWorks.html">HOW IT WORKS</a></li>
                                        <li><a href="http://www.google.com">PRICING</a></li>
                                        <li><a href="http://www.google.com">AGENCY SERVICE</a></li>
                                        <li><a href="http://www.google.com">ACTIVE CONTESTS</a></li>
                                        <li><a href="http://www.google.com">WINNERS</a></li>
                                        <li><a href="http://www.google.com">LEADERBOARD</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">BECOME A
                                            CREATIVE</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <span>Our Work</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                              alt='menu'/>
                                    <ul>
                                        <li><a href="http://www.google.com">NAMES</a></li>
                                        <li><a href="http://www.google.com">TAGLINES</a></li>
                                        <li><a href="http://www.google.com">LOGOS</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">TESTIMONIALS</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span>Names For Sale</span>
                                    <img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`} alt='menu'/>
                                    <ul>
                                        <li><a href="http://www.google.com">POPULAR NAMES</a></li>
                                        <li><a href="http://www.google.com">SHORT NAMES</a></li>
                                        <li><a href="http://www.google.com">INTRIGUING NAMES</a></li>
                                        <li><a href="http://www.google.com">NAMES BY CATEGORY</a></li>
                                        <li><a href="http://www.google.com">VISUAL NAME SEARCH</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">SELL YOUR
                                            DOMAINS</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <span>Blog</span><img src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                                                          alt='menu'/>
                                    <ul>
                                        <li><a href="http://www.google.com">ULTIMATE NAMING GUIDE</a></li>
                                        <li><a href="http://www.google.com">POETIC DEVICES IN BUSINESS NAMING</a></li>
                                        <li><a href="http://www.google.com">CROWDED BAR THEORY</a></li>
                                        <li className={styles.last}><a href="http://www.google.com">ALL ARTICLES</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {this.props.user && this.props.user.role === CONSTANTS.CUSTOMER &&
                        <div className={styles.startContestBtn}>
                            <Link to='/startContest'>START CONTEST</Link>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {...state.auth, ...state.eventsStore};
};
const mapDispatchToProps = (dispatch) => {
  return {
    clearUserStore: () => dispatch(clearUserStore()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));