import * as functions from 'firebase-functions'

export type Route = (
  req: functions.https.Request,
  resp: functions.Response<any>
) => void

export default (routes: Route) =>
  functions.region('asia-east2').https.onRequest(routes)
