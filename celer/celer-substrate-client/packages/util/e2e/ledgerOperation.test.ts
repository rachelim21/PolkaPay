import { connect } from "../src/connect";
import { 
    openChannel,
    depositPool,
    approve,
    deposit,
    intendWithdraw,
    confirmWithdraw,
    vetoWithdraw,
    cooperativeWithdraw,
    cooperativeSettle,
    resolvePaymentByConditions,
    intendSettle,
    clearPays,
    snapshotStates,
    confirmSettle
} from "../src/funcs";
import {
    waitBlockNumber,
    getCooperativeSettleRequest, 
    getCoSignedIntendSettle,
    getResolvePayByCondtionsRequest,
    getPayIdListInfo,
    getSignedSimplexStateArray,
    getZeroHash,
} from "../src/utils";
import { 
    getWithdrawIntent, 
    getBalanceMap,
    getWalletBalance,
    getChannelStatus,
    getPeersMigrationInfo,
    getSettleFinalizedTime
} from "../src/query";

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const LedgerOperationModule = '5EYCAe5fKZwTqKwvoibLLjYSMCkyGNJzwmxAg6SoeiLqQk1W';

jest.setTimeout(500000);

describe('ledger operation test', async () => {
    it('withdraw and cooperative settle test', async () => {
        const api = await connect();
        await depositPool(api, 'alice', 'alice', 20000);
        await waitBlockNumber(2);
    
        await approve(api, 'alice', 'celerLedgerId', 20000);
        await waitBlockNumber(2);

        const channelId1 = await openChannel(api, 'bob', false, 1000);
        await waitBlockNumber(2);
        await deposit(api, 'alice', channelId1, 'bob', 2000, 0);
        await waitBlockNumber(2);
 
        await intendWithdraw(api, 'bob', channelId1, 1000);
        await waitBlockNumber(3);
        let [receiver, withdrawIntentAmount, _, receipientChannelId] = await getWithdrawIntent(api, channelId1);
        expect([receiver, withdrawIntentAmount, receipientChannelId]).toEqual([BOB, 1000, await getZeroHash(api)]);
        await waitBlockNumber(8);

        await confirmWithdraw(api, 'bob', channelId1);
        await waitBlockNumber(3);
        expect(await getWalletBalance(api, channelId1)).toBe(4000);
        expect(await getBalanceMap(api, channelId1)).toEqual([[BOB, ALICE], [3000, 2000], [1000, 0]]);
    
        await intendWithdraw(api, 'alice', channelId1, 1000);
        await waitBlockNumber(3);
        [receiver, withdrawIntentAmount, _, receipientChannelId] = await getWithdrawIntent(api, channelId1);
        expect([receiver, withdrawIntentAmount, receipientChannelId]).toEqual([ALICE, 1000, await getZeroHash(api)]);
    
        await vetoWithdraw(api, 'bob', channelId1);
        await waitBlockNumber(3);
        expect(await getWithdrawIntent(api, channelId1)).toEqual([LedgerOperationModule, 0, 0, await getZeroHash(api)]);
    
        await cooperativeWithdraw(api, 'alice', channelId1, 1, 1000, 'alice');
        await waitBlockNumber(3);
        expect(await getWalletBalance(api, channelId1)).toBe(3000);
        expect(await getBalanceMap(api, channelId1)).toEqual([[BOB, ALICE], [3000, 2000], [1000, 1000]]);
    
        const cooperativeSettleRequest = await getCooperativeSettleRequest(
            api,
            channelId1,
            1,
            [0, 3000]
        );
        await cooperativeSettle(api, 'alice', cooperativeSettleRequest);
        await waitBlockNumber(3);
        expect(await getWalletBalance(api, channelId1)).toBe(0);
        expect(await getChannelStatus(api, channelId1)).toBe(3);
    });
 
    it('withdraw to another channel test', async () => {
        const api = await connect();
        const channelId2 = await openChannel(api, 'bob', false, 1000, true, 100000);
        await waitBlockNumber(2); 
        const channelId3 = await openChannel(api, 'alice', true, 0, true, 100001);
        await waitBlockNumber(2);

        await intendWithdraw(api, 'bob', channelId2, 1000, false, channelId3);
        await waitBlockNumber(3);
        let [receiver, withdrawIntentAmount, _, receipientChannelId] = await getWithdrawIntent(api, channelId2);
        expect([receiver, withdrawIntentAmount, receipientChannelId]).toEqual([BOB, 1000, channelId3]);
        await waitBlockNumber(8);
        
        await confirmWithdraw(api, 'bob', channelId2);
        await waitBlockNumber(3);
        expect(await getWalletBalance(api, channelId2)).toBe(2000);
        expect(await getBalanceMap(api, channelId2)).toEqual([[BOB, ALICE], [1000, 2000], [1000, 0]]);
        expect(await getWalletBalance(api, channelId3)).toBe(1000);
        expect(await getBalanceMap(api, channelId3)).toEqual([[BOB, ALICE], [1000, 0], [0, 0]]);    
    
        await cooperativeWithdraw(api, 'alice', channelId2, 1, 1000, 'alice', 999999, false, channelId3);
        await waitBlockNumber(3);
        expect(await getWalletBalance(api, channelId2)).toBe(1000);
        expect(await getBalanceMap(api, channelId2)).toEqual([[BOB, ALICE], [1000, 2000], [1000, 1000]]);
        expect(await getWalletBalance(api, channelId3)).toBe(2000);
        expect(await getBalanceMap(api, channelId3)).toEqual([[BOB, ALICE], [1000, 1000], [0, 0]]);    
    });

    it('unilateral settle test', async () => {
        const api = await connect();
        const channelId4 = await openChannel(api, 'alice', true);
        await waitBlockNumber(2);
        await deposit(api, 'alice', channelId4, 'alice', 2000, 0);
        await waitBlockNumber(2);
        await deposit(api, 'bob', channelId4, 'bob', 2000, 0);
        await waitBlockNumber(2);

        const globalResult = await getCoSignedIntendSettle(
            api,
            [channelId4, channelId4],
            [[[10, 20], [30, 40]], [[50, 60], [70, 80]]],
            [1, 1],
            [999999, 999999],
            [100, 200]
        );
        const signedSimplexStateArray1 = globalResult.signedSimplexStateArray;
    
        for (let peerIndex = 0; peerIndex < 2; peerIndex++) {
            for (let listIndex = 0; listIndex < globalResult.condPays[peerIndex].length; listIndex++) {
                for (let payIndex = 0; payIndex < globalResult.condPays[peerIndex][listIndex].length; payIndex++) {
                    let payRequest = await getResolvePayByCondtionsRequest(api, globalResult.condPays[peerIndex][listIndex][payIndex]);
                    await resolvePaymentByConditions(api, 'alice', payRequest);
                    await waitBlockNumber(2);
                }
            }
        }
        await waitBlockNumber(5);

        await intendSettle(api, 'alice', signedSimplexStateArray1);
        await waitBlockNumber(3);
        expect(await getPeersMigrationInfo(api, channelId4)).toEqual([[BOB, ALICE], [2000, 2000], [0, 0], [1, 1], [130, 310], [70, 150]]);
        expect(await getChannelStatus(api, channelId4)).toBe(2);

        await clearPays(
            api,
            'bob',
            channelId4,
            'bob',
            globalResult.payIdListArrays[0][1]
        );
        await waitBlockNumber(2);
        await clearPays(
            api,
            'alice',
            channelId4,
            'alice',
            globalResult.payIdListArrays[1][1]
        );
        await waitBlockNumber(2);
        expect(await getPeersMigrationInfo(api, channelId4)).toEqual([[BOB, ALICE], [2000, 2000], [0, 0], [1, 1], [200, 460], [0, 0]]);
        await waitBlockNumber(5);

        let settleFinalizedTime = await getSettleFinalizedTime(api, channelId4);
        let currentBlokNumber = await api.derive.chain.bestNumber();
        expect(settleFinalizedTime).toBeLessThan(currentBlokNumber.toNumber());
        await confirmSettle(api, 'alice', channelId4);
        await waitBlockNumber(4);
        expect(await getChannelStatus(api, channelId4)).toBe(3);
    });

    it('intend settle with 0 payments (null state', async () => {
        const api = await connect();
        const channelId5 = await openChannel(api, 'bob', false, 1000, true, 100004);
        await waitBlockNumber(2);
        let singleSignedNullState = await getSignedSimplexStateArray(
            api,
            [channelId5],
            [0],
            undefined,
            undefined,
            undefined,
            [0],
            'bob'
        );
        await intendSettle(api, 'bob', singleSignedNullState);
        await waitBlockNumber(3);
        expect(await getPeersMigrationInfo(api, channelId5)).toEqual([[BOB, ALICE], [1000, 2000], [0, 0], [0, 0], [0, 0], [0, 0]]);
    });

    it('withdraw and settlements after snapshots test', async () => {
        const api = await connect();
        const channelId6 = await openChannel(api, 'bob', false, 1000, true, 1000002);
        await waitBlockNumber(2);
        const payIdListInfo = await getPayIdListInfo(
            api,
            [[11, 22]]
        );
        let signedSimplexStateArray = await getSignedSimplexStateArray(
            api,
            [channelId6],
            [5],
            [100],
            [999999],
            [payIdListInfo.payIdLists[0]],
            [payIdListInfo.totalPendingAmount]
        );
        await snapshotStates(api, 'alice', signedSimplexStateArray);
        await waitBlockNumber(3);

        await intendWithdraw(api, 'alice', channelId6, 1000, true);
        await waitBlockNumber(3);
        let [receiver, withdrawIntentAmount, _, receipientChannelId] = await getWithdrawIntent(api, channelId6);
        expect([receiver, withdrawIntentAmount, receipientChannelId]).toEqual([ALICE, 1000, await getZeroHash(api)]);
        await waitBlockNumber(8);

        await confirmWithdraw(api, 'alice', channelId6);
        await waitBlockNumber(3);
        expect(await getPeersMigrationInfo(api, channelId6)).toEqual([[BOB, ALICE], [1000, 2000], [0, 1000], [5, 0], [100, 0], [33, 0]]);
        
        for (let i = 0; i < 2; i++) {
            let payRequest = await getResolvePayByCondtionsRequest(api, payIdListInfo.condPayArray[0][i]);
            await resolvePaymentByConditions(api, 'alice', payRequest);
            await waitBlockNumber(2);
        }
        await waitBlockNumber(6);
    
        await intendSettle(api, 'alice',signedSimplexStateArray);
        await waitBlockNumber(3);
        expect(await getPeersMigrationInfo(api, channelId6)).toEqual([[BOB, ALICE], [1000, 2000], [0, 1000], [5, 0], [133, 0], [0, 0]]);
    })
})