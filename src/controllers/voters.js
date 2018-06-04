const { Voter, ElectionArea } = require("../../db/models");
module.exports = {
    getVoterDetails
}

async function getVoterDetails(request, response, next) {
    
    const idCardNumber = request.params.idCardNumber;
    const voter = await Voter.findOne({
        where: {
            idCardNumber: idCardNumber
        },
        include: [{
            model: ElectionArea,
            as: 'electionArea'
        }]
    });

    if (!voter) {
        response.status(404).json({
            "error": "Voter not found"
        })
    }
    response.json(voter);
}