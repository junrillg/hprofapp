import * as functions from 'firebase-functions'

export type RequestHandler = (
  req: functions.https.Request,
  resp: functions.Response<any>
) => void

export default function (handler: RequestHandler) {
  return functions.region('asia-east2').https.onRequest(handler)
}
