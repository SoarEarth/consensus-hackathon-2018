const NYGrower = artifacts.require("NYGrower");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('NYGrower', function ([]) {
  
  beforeEach(async function () {
    this.nyGrower = await NYGrower.new();
  });

  it("..deployment successful", async function () {
  });
});