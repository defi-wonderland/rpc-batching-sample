import { expect } from 'chai';
import { IPoolManager, PoolManager__factory } from '@typechained';
import { ethers } from 'hardhat';

describe('PoolManagerContract', () => {
  let poolManagerFactory: PoolManager__factory;
  let poolManager: IPoolManager;

  before(async () => {
    poolManagerFactory = (await ethers.getContractFactory('PoolManager')) as PoolManager__factory;
    poolManager = await poolManagerFactory.deploy();
  });

  it('should query all the manager pools without batching', async () => {
    const poolCount = await poolManager.numPools();

    const poolDataArray = [];
    for (let i = 0; i < poolCount; i++) {
      poolDataArray.push(await poolManager.queryPool(i));
    }

    expect(poolDataArray.length).to.equal(50);
  });
});
