import { db } from '../util/admin'
import WhereFilterOp = firebase.firestore.WhereFilterOp

const createDataHandler = async (collection: string, data: object) =>
  await db.collection(collection).add(data)

const getDataByIdHandler = async (collection: string, id: string) => {
  const data = await db.doc(`${collection}/${id}`)
  if ((data as any).exists) return data
  else return null
}

const updateDataHandler = async (
  collection: string,
  id: string,
  data: object
) => await db.doc(`${collection}/${id}`).set(data, { merge: true })

const deleteDataHandler = async (collection: string, id: string) =>
  await db.collection(collection).doc(id).delete()

const getAllDataWithPredicate = async (
  collection: string,
  clause: string[]
) => {
  const REQUIRED_NUMBER_OF_CLAUSE = 3
  const FIELD_PATH_INDEX = 0
  const OP_STR_INDEX = 1
  const VALUE_INDEX = 2

  if (clause.length === REQUIRED_NUMBER_OF_CLAUSE) {
    const data = await db
      .collection(collection)
      .where(
        clause[FIELD_PATH_INDEX],
        clause[OP_STR_INDEX] as WhereFilterOp,
        clause[VALUE_INDEX]
      )
      .get()
    return (data as any).docs.map((doc: any) => doc.data())
  } else {
    return []
  }
}

const getDataWithPredicate = async (collection: string, clause: string[]) => {
  const REQUIRED_NUMBER_OF_CLAUSE = 3
  const FIELD_PATH_INDEX = 0
  const OP_STR_INDEX = 1
  const VALUE_INDEX = 2

  if (clause.length === REQUIRED_NUMBER_OF_CLAUSE) {
    const data = await db
      .collection(collection)
      .where(
        clause[FIELD_PATH_INDEX],
        clause[OP_STR_INDEX] as WhereFilterOp,
        clause[VALUE_INDEX]
      )
      .limit(1)
      .get()
    const validDoc = (data as any).docs && (data as any).docs.length >= 1
    return validDoc ? (data as any).docs[0].data() : null
  } else {
    return null
  }
}

const dataService = (collection: string) => {
  return {
    createData: async (data: any) => await createDataHandler(collection, data),
    getDataById: async (id: string) => await getDataByIdHandler(collection, id),
    updateData: async (id: string, data: object) =>
      await updateDataHandler(collection, id, data),
    deleteData: async (id: string) => await deleteDataHandler(collection, id),
    getAllDataWithPredicate: async (clause: string[]) =>
      await getAllDataWithPredicate(collection, clause),
    getDataWithPredicate: async (clause: string[]) =>
      await getDataWithPredicate(collection, clause),
  }
}

export default dataService
