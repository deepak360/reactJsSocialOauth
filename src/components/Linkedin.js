/* global IN */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { addLinkedInScript } from './scripts';

const LINKEDIN_API_KEY = '78mqf0ayckqsra';

export default class LinkedIn extends PureComponent {
 async componentDidMount() {
  try {
   await addLinkedInScript();
   // Initializtoin with you API_KEY
   IN.init({ api_key: LINKEDIN_API_KEY });
  } catch (error) {
    console.log(error.name, ':', error.message);
  }
 }
/**
 * Handle click button
 */
 handleClick = () => {
  const {
   loading,
   onSuccess,
   onFailure,
  } = this.props;
 
 if (loading || !IN.User) {
  return;
 }
IN.User.authorize(() => {
 // If authorization pass well, we take profile info
 IN.API.Profile('me')
  .fields(['id', 'firstName', 'lastName', 'emailAddress'])
  .result((res) => {
    const data = {};
    data.identity = {
      uid: IN.User.getMemberId(),
      provider: 'linkedin'
    };
    data.user = {
     email: res.values[0].emailAddress,
     firstName: res.values[0].firstName,
     lastName: res.values[0].lastName,
    };
    data.auth = IN.ENV.auth;
// Send data to back end
    onSuccess(data);
   });
  },
  err => onFailure(err));
 }
render() {
  return (
    <Fragment>
    <button
        type="button"
        className="btn linkedin"
        onClick={this.handleClick}>
        <i className="icon-in">Linkedin</i>
    </button>
   </Fragment>
   );
  }
 }
LinkedIn.propTypes = {
 loading: PropTypes.bool.isRequired,
 onSuccess: PropTypes.func.isRequired,
 onFailure: PropTypes.func.isRequired,
};