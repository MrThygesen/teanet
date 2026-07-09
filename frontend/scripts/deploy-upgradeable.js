require("dotenv").config();

const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("------------------------------------");
  console.log("EDGE Spaces Deployment");
  console.log("------------------------------------");
  console.log("Deploying from:", deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Balance:", ethers.formatEther(balance), "POL");

  const Contract = await ethers.getContractFactory("WebAccessSBTV33");

  console.log("Deploying proxy...");

  const proxy = await upgrades.deployProxy(
    Contract,
    [],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );

  await proxy.waitForDeployment();

  const proxyAddress = await proxy.getAddress();

  console.log("------------------------------------");
  console.log("SUCCESS");
  console.log("------------------------------------");
  console.log("Proxy Address:");
  console.log(proxyAddress);

  const implementation =
    await upgrades.erc1967.getImplementationAddress(proxyAddress);

  console.log("Implementation:");
  console.log(implementation);

  console.log("------------------------------------");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
