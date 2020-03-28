//===========================================================
// NOTE: Make sure that src/firebase.config.ts is present
//===========================================================
import firebaseConfig from '../firebase.config'

import * as firebase from 'firebase'

firebase.initializeApp(firebaseConfig)

export default firebase
