const manageUserModel = require("../models/user.model")
const status = require("../config/status");

//add user
exports.create = async (req, res) => {
    try {
        var obj = {
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
        }
        const newmanageUserModel = new manageUserModel(obj);
        let result = await newmanageUserModel.save();
        res.json({ success: true, status: status.OK, msg: 'Adding Users is successfully.' });

    }
    catch (err) {
        console.log("err", err)
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Users failed.' });

    }
}


//update by id
exports.edit = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.query.id;
    try {
        let result = await manageUserModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    address: req.body.address,
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Users is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Users Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Users failed.' });

    }
}

//get all users 
exports.list = async (req, res) => {
    try {
        const data = await manageUserModel.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Users failed.' });

    }
}

//delete user by id
exports.delete = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await manageUserModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Users is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Users Id not found' });
        }
    }
    catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Users data failed.' });

    }
}