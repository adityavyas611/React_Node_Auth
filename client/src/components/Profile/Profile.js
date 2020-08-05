import React, { useEffect } from "react";
import './Profile.css';
import { checkJWT, getUserInfo, userLogout } from '../../AuthService';
import { useHistory } from "react-router-dom";

const Profile = () => {

  let history = useHistory();

  useEffect(() => {
      if (!checkJWT()) {
          history.push('/');
      }
  }, [history]);

  const logOut = () => {
    userLogout();
    history.push('/signin');
  }

  const userName = getUserInfo();
  return (
    <div className="outer-container">
      <div className="logout-container">
        <button onClick={() => logOut()} className="logout-button">Logout</button>
      </div>
      <div className="user-text">
        <h3>Hi {userName} Welcome to Simplilearn Demo!</h3>
        <h5>Please click on logout</h5>
      </div>
    </div>
  )
};

export default Profile;
