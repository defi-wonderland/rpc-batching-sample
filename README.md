# RPC BATCHING SAMPLE

We recommend reading the full explanation at [RPC Request Batching Easily 10x your requests performance](https://defi-wonderland.notion.site/RPC-Request-Batching-Easily-10x-your-requests-performance-7ac7704cdd53473fb132f66d36211edd) before using this repository.

---

## Setup

```bash
# Install dependencies
yarn install
```

## Examples

Two simple solidity contracts are created

1. **PoolManager**: This contract simulates a pool manager containing a function capable of querying a single pool at a time.
2. **BatchPoolManagerData**: This contract implements where magic happens. It will perform the necessary calls, store them in an array, and then return all the data. By doing this, RPCs can simulate the deployment of this contract and get the data in a single call instead of having to call `PoolManager`'s querying method multiple times.

## How to try the examples?

Run `yarn test:unit` to try both cases with and without rpc batching.
