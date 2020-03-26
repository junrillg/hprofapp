import fs from '../util/fs';
import db from "../util/db";
import { Response } from '../util/types'
import {HOUSEHOLD} from "../constants/collection";

export async function createHouseHoldHandler(req: any, res: Response ){
    const newHouseHold = {
        clusterHandle: req.body.clusterId,
        data: req.body.data,
        createdAt: fs.Timestamp.fromDate(new Date())
    };

    try {
        const doc = await db.collection(HOUSEHOLD).add(newHouseHold);
        res.json({message: `Successfully created Household! Ref #${doc.id}`});
    } catch(e) {
        res.status(400).json(`Unable to add household`);
        console.error(e);
    }
}

