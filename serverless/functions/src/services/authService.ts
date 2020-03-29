import * as admin from 'firebase-admin'
import firebase from '../util/firebase'

export const verifyToken = async (token: string) =>
  await admin.auth().verifyIdToken(token)

export const getToken = async (data: object) =>
  await (data as any).user.getIdToken()

export const createAuthUser = async (email: string, password: string) =>
  await firebase.auth().createUserWithEmailAndPassword(email, password)

export const loginAuthUser = async (email: string, password: string) =>
  await firebase.auth().signInWithEmailAndPassword(email, password)

export const logoutAuthUser = async () => await firebase.auth().signOut()
