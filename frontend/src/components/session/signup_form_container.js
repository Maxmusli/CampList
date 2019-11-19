import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import SignupForm from './signup_form';
import { openModal, closeModal } from "../../actions/modal";

const mapStateToProps = (state) => {
  return {
    signedIn: state.session.isSignedIn,
    errors: state.errors.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: user => dispatch(signup(user)),
    closeModal: () => dispatch(closeModal()),
    otherForm: (
      <button
        id="entry-form-switch-button"
        onClick={() => dispatch(openModal("login"))}
      >
        Sign Up
      </button>
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);