import { expect } from 'chai';
import { PoolManager__factory, BatchPoolManagerData__factory, IPoolManager } from '@typechained';
import { ethers } from 'hardhat';

describe('BatchPoolManagerData', () => {
  let poolManagerFactory: PoolManager__factory;
  let poolManager: IPoolManager;
  let batchPoolManagerDataFactory: BatchPoolManagerData__factory;

  before(async () => {
    poolManagerFactory = (await ethers.getContractFactory('PoolManager')) as PoolManager__factory;
    poolManager = await poolManagerFactory.deploy();
    batchPoolManagerDataFactory = (await ethers.getContractFactory('BatchPoolManagerData')) as BatchPoolManagerData__factory;
  });

  it('should be able to query the pool factory pools with the batching method', async () => {
    // encode the input data for the batchPoolManagerDataFactory contract constructor arguments
    const inputData = ethers.utils.defaultAbiCoder.encode(['address'], [poolManager.address]);

    // concatenate the bytecode of the batchPoolManagerDataFactory contract with the constructor arguments slice to remove the 0x prefix
    const contractCreationCode = batchPoolManagerDataFactory.bytecode.concat(inputData.slice(2));

    // call the contractCreationCode with the call method of the provider to call the constructor and get the data
    const returnedData = await ethers.provider.call({ data: contractCreationCode });

    // decode the returned data to get the array of tuples using the same data types as the Data struct in the PoolManager contract
    const [decoded] = ethers.utils.defaultAbiCoder.decode(['tuple(uint256,uint256)[]'], returnedData);

    expect(decoded.length).to.equal(50);
  });
});
