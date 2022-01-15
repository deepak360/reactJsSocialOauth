/* global gapi */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { addGoogleScript } from './scripts';

const GOOGLE_CLIENT_ID = '219724630519-cn29b2j7emfgaoffcqvd3ijg2gktdkau.apps.googleusercontent.com';

export default class Google extends PureComponent {
 async componentDidMount() {
  try {
   await addGoogleScript();
   const params = {
    client_id: GOOGLE_CLIENT_ID,
    scope: 'profile email',
   };
   gapi.load('auth2', () => {
    if (!gapi.auth2.getAuthInstance()) {
     gapi.auth2.init(params);
    }
   });
  } catch (error) {
   console.log(error.name, ':', error.message);
  }
 }
/**
 * Handle click button
 */
 handleClick = () => {
  const { loading, onSuccess, onFailure } = this.props;
  const auth2 = gapi.auth2.getAuthInstance();
  
  if (loading) {
   return;
  }
auth2.signIn()
   .then((res) => {
     // If authorization pass well, we take profile info
     const basicProfile = res.getBasicProfile();
     const data = {};
     data.identity = {
      uid: basicProfile.getId(),
      provider: 'google'
     };
     data.user = {
      email: basicProfile.getEmail(),
      firstName: basicProfile.getGivenName(),
      lastName: basicProfile.getFamilyName(),
     };
     data.auth = res.getAuthResponse();
     
     // Send data to back end
     onSuccess(data);
    },
    err => onFailure(err));
 }
render() {
  return (
   <button
    type="button"
    className="btn google"
    onClick={this.handleClick}
   >
    <i className="fa fa-google icon-google">Google</i>
   </button>
  );
 }
}
Google.propTypes = {
 loading: PropTypes.bool.isRequired,
 onSuccess: PropTypes.func.isRequired,
 onFailure: PropTypes.func.isRequired,
};