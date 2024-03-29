import Swal from 'sweetalert2';

import { googleAuthProvider, firebase } from '../firebase/firebase-config';
import { types } from "../types/types";
import { notesCleaning } from './notes';
import { finishLoading, startLoading } from './ui';

export const loginstartEmailPassword = (email, password) => {
  return (dispatch) => {

      dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(({user}) => {
            
            dispatch(
              login(user.uid, user.displayName)
            );
  
  
          })
          .catch( ({message}) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: message
            })
            console.log(message);
            dispatch(finishLoading(message));
          })
     
  };
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async({user}) => {

        // Esto se hace para darle valor al displayName ya que aparece como null
        await user.updateProfile({displayName:name})
        dispatch(
          login(user.uid, user.displayName)
        );
      })
      .catch( ({message}) => {
        console.log(message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: message
        })
      })
  }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                  login(user.uid, user.displayName)
                );
            })
    }
}


export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async(dispatch) => {
    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(notesCleaning());
  }
}

export const logout = () => ({
  type: types.logout
})
