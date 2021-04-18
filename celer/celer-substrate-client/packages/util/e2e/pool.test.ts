import { connect } from "../src/connect";
import { 
    depositPool,
    approve,
    increaseAllowance,
    decreaseAllowance,
    withdrawFromPool,
    transferFrom,
} from "../src/funcs";
import {
    waitBlockNumber
} from "../src/utils";
import { getPoolBalance, getAllowance } from "../src/query";

jest.setTimeout(200000);

describe('pool test', async () => {
    it('deposit pool and approve test', async () => {
        const api = await connect();
        await depositPool(api, 'alice', 'alice', 20000);
        await waitBlockNumber(3);
        expect(await getPoolBalance(api, 'alice')).toBe(20000);
    });
    it('approve test', async () => {
        const api = await connect();
        await approve(api, 'alice', 'celerLedgerId', 2000);
        await waitBlockNumber(3);
        expect(await getAllowance(api, 'alice', 'celerLedgerId')).toBe(2000);
    
        await increaseAllowance(api, 'alice', 'celerLedgerId', 1000);
        await waitBlockNumber(3);
        expect(await getAllowance(api, 'alice', 'celerLedgerId')).toBe(3000);

        await decreaseAllowance(api, 'alice', 'celerLedgerId', 2000);
        await waitBlockNumber(3);
        expect(await getAllowance(api, 'alice', 'celerLedgerId')).toBe(1000);
    });
    it('withdraw from pool test', async () => {
        const api = await connect();
        await withdrawFromPool(api, 'alice', 10000);
        await waitBlockNumber(3);
        expect(await getPoolBalance(api, 'alice')).toBe(10000);
    });
    it('transfer from alice to charlie test', async () => {
        const api = await connect();
        await approve(api, 'alice', 'bob', 1000);
        await waitBlockNumber(1);

        await transferFrom(api, 'bob', 'alice', 'charlie', 1000);
        await waitBlockNumber(3);
        expect(await getPoolBalance(api, 'alice')).toBe(9000);
        expect(await getAllowance(api, 'alice', 'bob')).toBe(0);
    })
});