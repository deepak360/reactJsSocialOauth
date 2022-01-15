/* global FB */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addFacebookScript } from './scripts';

const FACEBOOK_APP_ID = '498261097632649';

class FacebookAuthorize extends PureComponent {
 
 async componentDidMount() {
  try {
   await addFacebookScript();
   const params = {
    appId: FACEBOOK_APP_ID,
    cookie: false,
    xfbml: false,
    version: 'v3.2'
   };
   FB.init(params);
   FB.getLoginStatus(resp => console.log('FB:status:', resp.status));
  } catch (error) {
   console.log(error.name, ':', error.message);
  }
 }
 
 handleClick = () => {
  const { loading, onSuccess } = this.props;
  if (loading) {
   return;
  }
 
  FB.getLoginStatus((resp) => {
   console.log('FB:status:', resp.status);
    const params = {
     provider: 'facebook'
    };
  
   if (resp.status === 'connected') {
    params.fbAccessToken = resp.authResponse.accessToken;
    FB.api('/me', (response) => {
    });
    // Send data to back end
    // onSuccess(params, this.props.currentUser);
    onSuccess(params)
    return;
   }
 
   FB.login((response) => {
    console.log('FB:status:', response.status);
    if (response.authResponse) {
        FB.api('/me', (response) => {
            console.log(response);
            console.log('Good to see you, '+ response.name + '.')
        });
     params.fbAccessToken = resp.authResponse.accessToken;
    //  onSuccess(this.state,this.props.currentUser);
    onSuccess(params)
    }
   }, { scope: 'email' });
  });
 }
 
 render() {
  return (
      <Fragment>
        <button
            type="button"
            className="btn facebook"
            onClick={this.handleClick} >
            <i className="fa fa-facebook icon-facebook">Facebook</i>
        </button>
      </Fragment>
   
  );
 }
}
// FacebookAuthorize.propTypes = {
//     loading: PropTypes.bool.isRequired,
//     onFBSuccess: PropTypes.func.isRequired,
//     onFBFailure: PropTypes.func.isRequired,
//    };
export default FacebookAuthorize;