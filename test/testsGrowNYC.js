const GrowNYC = artifacts.require("GrowNYC");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

contract('GrowNYC', function ([]) {
  
  beforeEach(async function () {
    this.growNYC = await GrowNYC.new();
  });

  it("..deployment successful", async function () {
  });
});