const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("IdentityContract", function () {
  let IdentityContract;
  let identity;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    IdentityContract = await ethers.getContractFactory("IdentityContract");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    identity = await IdentityContract.deploy();
    await identity.deployed();
  });

  it("Should register a new user and emit the UserRegistered event", async function () {
    const nric = "S1234567A";
    const fullName = "John Doe";
    const phone = "91234567";
    const department = "Hospital";

    // Register user using addr1
    await expect(identity.connect(addr1).registerUser(nric, fullName, phone, department))
      .to.emit(identity, "UserRegistered")
      .withArgs(addr1.address, nric);

    // Retrieve the user details and verify
    const user = await identity.getUser(addr1.address);
    expect(user.nric).to.equal(nric);
    expect(user.fullName).to.equal(fullName);
    expect(user.phone).to.equal(phone);
    expect(user.department).to.equal(department);
    expect(user.wallet).to.equal(addr1.address);
  });

  it("Should not allow the same user to register twice", async function () {
    const nric = "S1234567A";
    const fullName = "John Doe";
    const phone = "91234567";
    const department = "Hospital";

    // First registration succeeds
    await identity.connect(addr1).registerUser(nric, fullName, phone, department);

    // Attempting to register again should revert
    await expect(identity.connect(addr1).registerUser(nric, fullName, phone, department))
      .to.be.revertedWith("User already registered");
  });
});
