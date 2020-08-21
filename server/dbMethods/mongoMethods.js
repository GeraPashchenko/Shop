const db = require('../services/mongodb/index');
const ObjectID = require('mongodb').ObjectID;

function SelectAsync(data, tableName) {
    return db.get().collection(tableName)
        .find(data)
        .toArray();
}

function SelectWithPaginationAsync(data, limitAmount, skipAmount, tableName) {
    return db.get().collection(tableName)
        .find(data).limit(limitAmount).skip(skipAmount)
        .toArray();
}


function SelectByIdAsync(condition, requiredFeild, tableName) {
    condition["_id"] = ObjectID(condition._id);
    return db.get().collection(tableName)
        .findOne(condition, requiredFeild);
}

function InsertAsync(data, tableName) {
   return db.get().collection(tableName)
        .insertOne(data);
}

function UpdateAsync(condition, data, tableName) {
    return db.get().collection(tableName)
        .updateOne(condition, {$set: data});
}

function DeleteAsync(condition, tableName) {
   return db.get().collection(tableName)
        .remove(condition);
}

async function findMatch(data, callback) {
    let point1 = new GeoPoint(data.latitude, data.longitude);

    let resultArr = [];
    // console.log({data: data, minAge: data.dobMin, maxAge: data.dobMax});

    let cond = {
        $and: [
            {gender: {$in: data.gender}},
            {IAMAttractedTo: {$in: data.whoAreAttractedTo}},
            {
                $and: [
                    {height: {$gte: data.heightMin}},
                    {height: {$lte: data.heightMax}}
                ]
            },
            {
                $and: [
                    {dob: {$gte: data.dobMax}},
                    {dob: {$lte: data.dobMin}}
                ]
            },
        ]
    }

    const result = await db.get().collection(tablename).find(cond).toArray();

    for (let i = 0; i < result.length; i++) {
        let point2 = new GeoPoint(result[i].location.latitude, result[i].location.longitude);

        let distance = parseFloat(point1.distanceTo(point2, true).toFixed(2))//output in kilometers
        distance = (distance == 0.00) ? 0.01 : distance
        result[i]["distance"] = distance;

        if (distance <= data.distanceMax && distance >= data.distanceMin) {
            resultArr.push(result[i]);
        }
    }
    return result;
}


module.exports = {
    SelectAsync,
    SelectByIdAsync,
    SelectWithPaginationAsync,
    InsertAsync,
    UpdateAsync,
    DeleteAsync,
    findMatch
};
