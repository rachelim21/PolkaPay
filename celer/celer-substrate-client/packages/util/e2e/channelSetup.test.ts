import { connect } from "../src/connect";
import { 
    setBalanceLimits,
    disableBalanceLimits,
    enableBalanceLimits,
    openChannel,
    depositPool,
    approve,
    depositInBatch,
    deposit,
} from "../src/funcs";
import {
    waitBlockNumber
} from "../src/utils";
import { getChannelStatus, getBalanceMap, getBalanceLimitsEnabled, getBalanceLimits, getWalletBalance } from "../src/query";

jest.setTimeout(200000);

const alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';

const channelId1 = "0xc5c0757acf7c29f3a43b9ec7178a6491ed65b73989c75870138e5b8e3abdaaad";
const channelId2 = "0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30"

describe('channel setup test', () => {
    it('open channel with total balance is zero', async () => {
        const api = await connect();
        await openChannel(api, 'alice', true, 0);
        await waitBlockNumber(2);

        expect(await getChannelStatus(api, channelId1)).toBe(1);
        expect(await getBalanceMap(api, channelId1)).toEqual([[bob, alice], [0, 0], [0, 0]]);
    });
    it('disable balance limits test', async () => {
        const api = await connect();
        await disableBalanceLimits(api, 'alice', channelId1);
        await waitBlockNumber(2);
        expect(await getBalanceLimitsEnabled(api, channelId1)).toBe(false);
    });
    it('enable balance limits test', async () => {
        const api = await connect();
        await enableBalanceLimits(api, 'alice', channelId1);
        await waitBlockNumber(2);
        expect(await getBalanceLimitsEnabled(api, channelId1)).toBe(true);
    });
    it('set balance limits test', async () => {
        const api = await connect();
        await setBalanceLimits(api, 'alice', channelId1, 10000),
        await waitBlockNumber(2);
        expect(await getBalanceLimits(api, channelId1)).toEqual(10000);
    });
    it('open channel with deposits [1000, 2000] test', async () => {
        const api = await connect();
        await depositPool(api, 'alice', 'alice', 20000);
        await waitBlockNumber(2);
        
        await approve(api, 'alice', 'celerLedgerId', 20000);
        await waitBlockNumber(2);

        await openChannel(api, 'bob', false, 1000);
        await waitBlockNumber(2);
        expect(await getBalanceMap(api, channelId2)).toEqual([[bob, alice], [1000, 2000], [0, 0]]);
    });
    it('deposit to channel test', async () => {
        const api = await connect();
        await deposit(api, 'alice', channelId1, 'bob', 1000, 100);
        await waitBlockNumber(2);
        expect(await getWalletBalance(api, channelId1)).toBe(1100);
        expect(await getBalanceMap(api, channelId1)).toEqual([[bob, alice], [1100, 0], [0, 0]]);

        await depositInBatch(api, 'alice', [channelId1,channelId2], ['bob','alice'], [1000,1000], [100,100]);
        await waitBlockNumber(2);
        expect(await getWalletBalance(api, channelId1)).toBe(2200);
        expect(await getWalletBalance(api, channelId2)).toBe(4100);
        expect(await getBalanceMap(api, channelId1)).toEqual([[bob, alice], [2200, 0], [0, 0]]);
        expect(await getBalanceMap(api, channelId2)).toEqual([[bob, alice], [1000, 3100], [0, 0]]);
    })
});