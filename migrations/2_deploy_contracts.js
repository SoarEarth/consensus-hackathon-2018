var NYGrower = artifacts.require("./NYGrower.sol");

/*
* This script is only for local development. For other deployments needs to be updated.
*/
module.exports = function (deployer) {
  deployer.deploy(NYGrower);
};