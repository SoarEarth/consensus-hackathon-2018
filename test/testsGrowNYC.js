const GrowNYC = artifacts.require("GrowNYC");

const BigNumber = web3.BigNumber;

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const metadata = '{ name: apple, weight: 1000}';
const code = '12234KDS';

contract('GrowNYC', function ([farm, warehouse, retail, customer]) {

  beforeEach(async function () {
    this.growNYC = await GrowNYC.new();
  });

  it("..deployment successful", async function () {
  });

  it("farm: event is fired correctly", async function () {
    let tx = await this.growNYC.farm(code, metadata, { from: farm });
    tx.logs.length.should.be.equal(1);
    let event = tx.logs[0];
    event.event.should.be.equal("GrowNYCEvent");
    web3.toUtf8(event.args.code).should.be.equal(code);
    event.args.order.should.be.bignumber.equal(1);
    event.args.user.should.be.equal(farm);
    event.args.metadata.should.be.equal(metadata);
  });

  it("warhouse: event is fired correctly", async function () {
    let tx = await this.growNYC.warehouse(code, metadata, { from: warehouse });
    tx.logs.length.should.be.equal(1);
    let event = tx.logs[0];
    event.event.should.be.equal("GrowNYCEvent");
    web3.toUtf8(event.args.code).should.be.equal(code);
    event.args.order.should.be.bignumber.equal(2);
    event.args.user.should.be.equal(warehouse);
    event.args.metadata.should.be.equal(metadata);
  });

  it("retail: event is fired correctly", async function () {
    let tx = await this.growNYC.retail(code, metadata, { from: retail });
    tx.logs.length.should.be.equal(1);
    let event = tx.logs[0];
    event.event.should.be.equal("GrowNYCEvent");
    web3.toUtf8(event.args.code).should.be.equal(code);
    event.args.order.should.be.bignumber.equal(3);
    event.args.user.should.be.equal(retail);
    event.args.metadata.should.be.equal(metadata);
  })
});