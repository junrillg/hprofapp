import { all } from 'redux-saga/effects'
import generalSagas from './generalSagas'

export default function* rootSagas() {
  yield all([generalSagas()])
}
