const ElectionArea = require("../../db/models").ElectionArea;
const Voter = require("../../db/models").Voter;
const fs = require("await-fs");
const path = require("path");

module.exports = {
    addArea,
    addVoter
}

async function addArea(request, response, next) {

    const area = await ElectionArea.create(request.body.area);
    response.json({
        id: area.id
    });

}

async function addVoter(request, response, next) {

    const areaId = request.params.areaId;
    const area = await ElectionArea.findOne({
        where: {
            id: areaId
        },
        include: [{
            model: Voter,
            as: 'voters'
        }]
    });

    if (!area) {
        response.status(404).json({
            "error": "Area not found"
        })
    }

    const voter = request.body.voter;
    const serialNumber = voter.serialNumber;
    const familyNumber = voter.familyNumber;
    const name = voter.name;
    const fatherName = voter.fatherName;
    const idCardNumber = voter.idCardNumber;
    const age = voter.age;
    const address = voter.address;

    try {
        fs.mkdir('./public/voters/' + idCardNumber).then(respone => {   
        });
    } catch (e) {
    }

    const idCardPath = './public/voters/' + idCardNumber;
    const relativeIdCardPath = "voters/" + idCardNumber;

    fs.writeFile(
        idCardPath + "/serialNumber.png",
        serialNumber,
        { encoding: 'base64'}
    );
    fs.writeFile(
        idCardPath + "/familyNumber.png",
        familyNumber,
        { encoding: 'base64'}
    );
    fs.writeFile(
        idCardPath + "/name.png",
        name,
        { encoding: 'base64'}
    );
    fs.writeFile(
        idCardPath + "/fatherName.png",
        fatherName,
        { encoding: 'base64'}
    );
    fs.writeFile(
        idCardPath + "/age.png",
        age,
        { encoding: 'base64'}
    );
    fs.writeFile(
        idCardPath + "/address.png",
        address,
        { encoding: 'base64'}
    );

    const newVoter = await Voter.create({
        serialNumber: relativeIdCardPath + "/serialNumber.png",
        familyNumber: relativeIdCardPath + "/familyNumber.png",
        name: relativeIdCardPath + "/name.png",
        fatherName: relativeIdCardPath + "/fatherName.png",
        age: relativeIdCardPath + "/age.png",
        address: relativeIdCardPath + "/address.png",
        idCardNumber: idCardNumber,
        electionAreaId: area.id
    });
    
    response.json(newVoter);
}