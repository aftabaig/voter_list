const User = require("../src/managers/user");
const Device = require("../src/managers/device");

const admin = require("firebase-admin");
const serviceAccount = require("../tabdeeli-firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tabdeeli-6f9d0.firebaseio.com"
});

const kue = require("kue");
const queue = kue.createQueue();

function getPublicUsers(creator) {
    return User.getMembersPromise(creator, true)
}

function getUsersByIds(ids) {
    return User.findAll({
        where: {
            id: {
                in: ids
            },
            toggleNotification: true
        },
        include: [{
            model: Device,
            as: 'devices'
        }]
    });
}

queue.process('notification', function(job, done) {
    var receipientIds = job.data.receipientIds || [];
    var promise;
    if (receipientIds.length == 0) {
        promise = getPublicUsers(job.data.creator);
    }
    else {
        promise = getUsersByIds(receipientIds);
    }
    promise
    .then(function(users) {
        users.forEach((receipient) => {
            //if (receipient.toggleNotification) {
                var devices = receipient.devices;
                console.log(devices);
                devices.forEach((device) => {
                    console.log("########")
                    console.log(job.data.data)
                    console.log("########")
                    admin.messaging().send({
                        data: job.data.data,
                        notification: {
                            title: job.data.title,
                            body: job.data.body
                        },
                        token: device.pushToken
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                });
            //}
        });
    });
    done();
});