import { 
    connect,
    openChannel, 
    approve,
    intendWithdraw, 
    depositPool, 
    vetoWithdraw, 
    setBalanceLimits,
    disableBalanceLimits,
    enableBalanceLimits,
    deposit,
    confirmWithdraw,
    cooperativeWithdraw,
    withdrawFromPool,
    increaseAllowance,
    decreaseAllowance,
    waitBlockNumber,
    getCoSignedIntendSettle,
    intendSettle,
    resolvePaymentByConditions,
    getConditions,
    getConditionalPay,
    getVouchedCondPayResult,
    resolvePaymentByVouchedResult,
    clearPays,
    confirmSettle,
    getCooperativeSettleRequest,
    cooperativeSettle,
    getPayIdListInfo,
    getSignedSimplexStateArray,
    snapshotStates,
    depositInBatch,
    getResolvePayByCondtionsRequest,
    transferFrom,
    getCelerLedgerId,
    getSettleFinalizedTime,
    getChannelStatus,
    getCooperativeWithdrawSeqNum,
    getTotalBalance,
    getBalanceMap,
    getDisputeTimeOut,
    getStateSeqNumMap,
    getTransferOutMap,
    getNextPayIdListHashMap,
    getLastPayResolveDeadlineMap,
    getPendingPayOutMap,
    getWithdrawIntent,
    getChannelStatusNum,
    getBalanceLimits,
    getBalanceLimitsEnabled,
    getPeersMigrationInfo,
    getCelerWalletId,
    getWalletOwners,
    getWalletBalance,
    getPoolId,
    getAllowance,
    getPoolBalance,
    getPayResolverId,
    getPayInfo,
} from "celer-substrate-utils";

import program from 'commander';

program.version('1.0.4', '-v, --version');

program
    .command('setBalanceLimits')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-l, --limits <limits>', 'Limits amount of channel')
    .action(async options => {
        const api = await connect();
        await setBalanceLimits(api, options.caller, options.channelId, options.limits);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('enableBalanceLimits')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        await enableBalanceLimits(api, options.caller, options.channelId);
        await waitBlockNumber(3);
        process.exit(0);
    })

program
    .command('disableBalanceLimits')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        await disableBalanceLimits(api, options.caller, options.channelId);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('openChannel')
    .option('-c, --caller <caller>', 'caller')
    .option('-z, --zeroTotalDeposit', 'amount of funds to deposit is zero')
    .option('-v, --msgValue <msgValue>', 'amount of funds to deposit from caller')
    .option('-d, --peersDeposit <peersDeposit>', '[bob deposit amount, alice deposit amount]', (value) => { return (value).split(","); }, [])
    .action(async options => {
        const api = await connect();
        if (options.zeroTotalDeposit === undefined) {
            await openChannel(api, options.caller, false, options.msgValue, true, 1000000, options.peersDeposit[0], options.peersDeposit[1]);
        } else {
            await openChannel(api, options.caller, true, options.msgValue, true, 1000000, options.peersDeposit[0], options.peersDeposit[1]);
        }
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('deposit')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-r, --receiver <receiver>', 'receiver of funds')
    .option('-v, --msgValue <msgValue>', 'amounts of funds to deposit from caller')
    .option('-a, --transferFromAmount <transferFromAmount>', 'amount of funds to be transfered from Pool')
    .action(async options => {
        const api = await connect();
        await deposit(api, options.caller, options.channelId, options.receiver, options.msgValue, options.transferFromAmount);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('depositInBatch')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelIds <channelIds>', 'Ids list of channel', (value) => { return (value).split(","); }, [])
    .option('-r, --receivers <receivers>', 'addresses list of receiver', (value) => { return (value).split(","); }, [])
    .option('-a, --msgValues <msgValues>', 'msgValues list of funds to deposit from caller', (value) => { return (value).split(","); }, [])
    .option('-f, --transferFromAmounts <transferFromAmounts>', 'amounts list of funds to be transfeed from Pool', (value) => { return (value).split(","); }, [])
    .action(async options => {
        const api = await connect();
        await depositInBatch(
            api,
            options.caller,
            options.channelIds,
            options.receivers,
            options.msgValues,
            options.transferFromAmounts,
        );
        await waitBlockNumber(6);
        process.exit(0);
    })

program
    .command('snapshotStates')
    .option('-c, --caller <caller>', 'caller')
    .option('-a, --payAmounts <payAmounts>', 'pay amounts list of linked pay id list', (value) => { return (value).split(","); }, [])
    .option('-i, --channelId <channelId>', 'Id of channel')
    .option('-n, --seqNum <seqNum>', 'sequence number')
    .option('-f, --transferAmounts <transferAmounts>', 'amount of token already transfered')
    .action(async options => {
        const api = await connect();
        let payIdListInfo = await getPayIdListInfo(
            api,
            [options.payAmounts]
        );
        let signedSimplexStateArray = await getSignedSimplexStateArray(
            api,
            [options.channelId],
            [options.seqNum],
            [options.transferFromAmount],
            [999999],
            [payIdListInfo.payIdLists[0]],
            [payIdListInfo.totalPendingAmount]
        );

        await snapshotStates(api, options.caller, signedSimplexStateArray);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('intendWithdraw')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-a, --amount <amount>', 'amount of funds to withdraw')
    .action(async options => {
        const api = await connect();
        await intendWithdraw(api, options.caller, options.channelId, options.amount);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('confirmWithdraw')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        console.log("waiting for dispute timeout(default 10 block number) to pass");
        await waitBlockNumber(7);
        await confirmWithdraw(api, options.caller, options.channelId);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('vetoWithdraw')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        await vetoWithdraw(api, options.caller, options.channelId);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('cooperativeWithdraw')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-n, --seqNum <seqNum>', 'sequence number')
    .option('-a, --amount <amount>', 'amount of funds to withdraw')
    .option('-r, --receiverAccount <receiverAccount>', 'receiver address of funds')
    .action(async options => {
        const api = await connect();
        await cooperativeWithdraw(api, options.caller, options.channelId, options.seqNum, options.amount, options.receiverAccount);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('intendSettle')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of channel')
    .option('-n, --seqNums <seqNums>', 'sequence number list', (value) => { return (value).split(","); }, [])
    .action(async options => {
        const api = await connect();
        let globalResult = await getCoSignedIntendSettle(
            api,
            [options.channelId, options.channelId],
            [[[10, 20], [30, 40]], [[50, 60], [70, 80]]],
            options.seqNums,
            [999999, 999999],
            [100, 200]
        );
        const signedSimplexStateArray = globalResult.signedSimplexStateArray;

        await intendSettle(api, options.caller, signedSimplexStateArray);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('clearPays')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-n, --seqNums <seqNums>', 'sequence number list', (value) => { return (value).split(","); }, [])
    .action(async options => {
        const api = await connect();
        let globalResult = await getCoSignedIntendSettle(
            api,
            [options.channelId, options.channelId],
            [[[10, 20], [30, 40]], [[50, 60], [70, 80]]],
            options.seqNums,
            [999999, 999999],
            [100, 200]
        );

        await clearPays(
            api,
            options.caller,
            options.channelId,
            'bob',
            globalResult.payIdListArrays[0][1]
        );
        await waitBlockNumber(2);
        await clearPays(
            api,
            options.caller,
            options.channelId,
            'alice',
            globalResult.payIdListArrays[1][1]
        );
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('confirmSettle')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options  => {
        const api = await connect();
        await confirmSettle(api, options.caller, options.channelId);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('cooperativeSettle')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-n, --seqNum <seqNum>', 'sequence number')
    .option('-a, --settleAmounts <settleAmounts>', 'cooperative settle amounts list', (value) => { return (value).split(","); }, [])
    .action(async options => {
        const api = await connect();
        let cooperativeSettleRequest = await getCooperativeSettleRequest(
            api,
            options.channelId,
            options.seqNum,
            options.settleAmounts
        );
        await cooperativeSettle(api, options.caller, cooperativeSettleRequest);
        await  waitBlockNumber(6);
        process.exit(0);
    });

program
    .command('depositPool')
    .option('-c, --caller <caller>', 'caller')
    .option('-r, --receiver <receiver>', 'receiver of token')
    .option('-v, --msgValue <msgValue>', 'amount of funds to deposit from caller')
    .action(async options => {
        const api = await connect();
        await depositPool(api, options.caller, options.receiver, options.msgValue);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('withdrawFromPool')
    .option('-c, --caller <caller>', 'caller')
    .option('-v, --value <value>', 'amount of funds to withdraw from Pool')
    .action(async options => {
        const api = await connect();
        await withdrawFromPool(api, options.caller, options.value);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('transferFrom')
    .option('-c, --caller <caller>', 'caller')
    .option('-f, --from <from>', 'the address which you want to transfer funds from')
    .option('-t, --to <to>', 'the address which you want to transfer to')
    .option('-v, --value <value>', 'amount of funds to be transferred')
    .action(async options => {
        const api = await connect();
        await transferFrom(
            api,
            options.caller,
            options.from,
            options.to,
            options.value
        );
        await waitBlockNumber(3);
        process.exit(0);
    })

program
    .command('approve')
    .option('-c, --caller <caller>', 'caller')
    .option('-s, --spender <spender>', 'the address which will spend the funds')
    .option('-v, --value <value>', 'amount of funds to spend')
    .action(async options => {
        const api = await connect();
        await approve(api, options.caller, options.spender, options.value);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('increaseAllowance')
    .option('-c, --caller <caller>', 'caller')
    .option('-s, --spender <spender>', 'the address which will spend the funds')
    .option('-v, --addedValue <addedValue>', 'amount of funds to increase the allowance by spender')
    .action(async options => {
        const api = await connect();
        await increaseAllowance(api, options.caller, options.spender, options.addedValue);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('decreaseAllowance')
    .option('-c, --caller <caller>', 'caller')
    .option('-s, --spender <spender>', 'the address which will spend the funds')
    .option('-v, --subtractedValue <subtractedValue>', 'amount of funds to decrease the allowance by spender')
    .action(async options => {
        const api = await connect();
        await decreaseAllowance(api, options.caller, options.spender, options.subtractedValue);
        await waitBlockNumber(3);
        process.exit(0);
    });

program
    .command('resolvePaymentByConditions')
    .option('-c, --caller <caller>', 'caller')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .option('-n, --seqNums <seqNums>', 'sequence number list', (value) => { return (value).split(","); }, [])
    .action(async options => {
        const api = await connect();
        let globalResult = await getCoSignedIntendSettle(
            api,
            [options.channelId, options.channelId],
            [[[10, 20], [30, 40]], [[50, 60], [70, 80]]],
            options.seqNums,
            [999999, 999999],
            [100, 200]
        );

        for (let peerIndex = 0; peerIndex < 2; peerIndex++) {
            for (let listIndex = 0; listIndex < globalResult.condPays[peerIndex].length; listIndex++) {
                for (let payIndex = 0; payIndex < globalResult.condPays[peerIndex][listIndex].length; payIndex++) {
                    let payRequest = await getResolvePayByCondtionsRequest(api, globalResult.condPays[peerIndex][listIndex][payIndex]);
                    await resolvePaymentByConditions(api, options.caller, payRequest);
                    await waitBlockNumber(2);
                }
            }
        }
        await waitBlockNumber(2);
        process.exit(0);
    });

program
    .command('resolvePaymentByVouchedResult')
    .option('-c, --caller <caller>', 'caller')
    .option('-s, --conditions <conditions>', 'type of conditions list')
    .option('-m, --maxAmounts <maxAmounts>', 'maximum token transfer amount')
    .option('-t, --logicType <logicType>', 'type of resolving logic based on condition outcome')
    .option('-a, --amount <amount>', 'vouch amount')
    .action(async options => {
        const api = await connect();
        let conditions = await getConditions(api, options.conditions);
        let sharedPay = await getConditionalPay(
            api,
            conditions,
            options.maxAmounts,
            0,
            999999,
            10,
            options.logicType
        );

        let vouchedCondPayResult = await getVouchedCondPayResult(
            api,
            sharedPay,
            options.amount
        );

        await resolvePaymentByVouchedResult(api, options.caller, vouchedCondPayResult);
        await waitBlockNumber(6);
        process.exit(0);
    });


program
    .command('getCelerLedgerId')
    .action(async options => {
        const api = await connect();
        const celerLedgerId = await getCelerLedgerId(api);
        console.log("Celer Ledger Operation Module is ", celerLedgerId);
        process.exit(0);
    });

program
    .command('getSettleFinalizedTime')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let finalizedTime = await getSettleFinalizedTime(api, options.channelId);
        console.log("confirm settle open time is ", finalizedTime);
        process.exit(0);
    });

program
    .command('getCooperativeWithdrawSeqNum')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let seqNum = await getCooperativeWithdrawSeqNum(api, options.channelId);
        console.log("cooperative withdraw seq num is ", seqNum);
        process.exit(0);
    });

program
    .command('getChannelStatus')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let channelStatus = await getChannelStatus(api, options.channelId);
        console.log("channel status is ", channelStatus);
        process.exit(0);
    });

program
    .command('getTotalBalance')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let totalBalance = await getTotalBalance(api, options.channelId);
        console.log("channel's total balance is ", totalBalance);
        process.exit(0);
    });

program
    .command('getBalanceMap')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, deposits, withdrawals] = await getBalanceMap(api, options.channelId);
        console.log("channelPeers is", channelPeers, "channel's deposits is ", deposits, "channel's withdrawals is ", withdrawals);
        process.exit(0);
    });

program
    .command('getDisputeTimeOut')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let disputeTimeout = await getDisputeTimeOut(api, options.channelId);
        console.log("dispute time out is ", disputeTimeout);
        process.exit(0);
    });

program
    .command('getStateSeqNumMap')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, seqNums] = await getStateSeqNumMap(api, options.channelId);
        console.log("channelPeers is ", channelPeers, "seq nums is ", seqNums);
        process.exit(0);
    });

program
    .command('getTransferOutMap')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, transferOuts] = await getTransferOutMap(api, options.channelId);
        console.log("channelPeers is ", channelPeers, "transfer outs is ", transferOuts);
        process.exit(0);
    });

program
    .command('getNextPayIdListHashMap')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, nextPayIdListHashes] = await getNextPayIdListHashMap(api, options.channelId);
        console.log("channelPeers is ", channelPeers, "next pay id list hashes is ", nextPayIdListHashes);
        process.exit(0);
    });

program
    .command('getLastPayResolveDeadlineMap')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, lastPayResolveDeadlines] = await getLastPayResolveDeadlineMap(api, options.channelId);
        console.log("channelPeers is ", channelPeers, "last pay resolve deadlines is ", lastPayResolveDeadlines);
        process.exit(0);
    });

program
    .command('getPendingPayOutMap')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, pendingPayOuts] = await getPendingPayOutMap(api, options.channelId);
        console.log("channelPeers is ", channelPeers, "pending pay outs is ", pendingPayOuts);
        process.exit(0);
    });

program
    .command('getWithdrawIntent')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [receiver, withdrawIntentAmount, withdrawIntentRequestTime, recipientChannelId] 
            = await getWithdrawIntent(api, options.channelId);
        console.log("withdraw intent receiver is ", receiver);
        console.log("withdraw intent amount is ", withdrawIntentAmount);
        console.log("withdraw intent request time is ", withdrawIntentRequestTime);
        console.log("recipient channelId is ", recipientChannelId);
        process.exit(0);
    });

program
    .command('getChannelStatusNum')
    .option('-s, --channelStatus <channelStatus>', 'status of channel')
    .action(async options => {
        const api = await connect();
        let statusnums = await getChannelStatusNum(api, options.channelStatus);
        console.log("number of channel status is ", statusnums);
        process.exit(0);
    });

program
    .command('getBalanceLimits')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let balanceLimits = await getBalanceLimits(api, options.channelId);
        console.log("channel's balance limits is ", balanceLimits);
        process.exit(0);
    });

program
    .command('getBalanceLimitsEnabled')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let balanceLimitsEnabled = await getBalanceLimitsEnabled(api, options.channelId);
        console.log("whether channel has balance limits is ", balanceLimitsEnabled);
        process.exit(0);
    });

program
    .command('getPeersMigrationInfo')
    .option('-i, --channelId <channelId>', 'Id of the channel')
    .action(async options => {
        const api = await connect();
        let [channelPeers, deposits, withdrawals, seqNums, transferOuts, pendingPayOuts]
            = await getPeersMigrationInfo(api, options.channelId);
        console.log("channelPeers is ", channelPeers);
        console.log("channel's deposits is ", deposits);
        console.log("channel's withdrawals is ", withdrawals);
        console.log("channel's seq nums is ", seqNums);
        console.log("transfer outs is ", transferOuts);
        console.log("pending pay outs is ", pendingPayOuts);
        process.exit(0);
    });

program
    .command('getCelerWalletId')
    .action(async options => {
        const api = await connect();
        let celerWalletId = await getCelerWalletId(api);
        console.log("Celer Wallet Module Id is ", celerWalletId);
        process.exit(0);
    });

program
    .command('getWalletOwners')
    .option('-i, --walletId <walletId>', 'Id of the wallet')
    .action(async options => {
        const api = await connect();
        let owners = await getWalletOwners(api, options.walletId)
        console.log("wallet owner's is ", owners);
        process.exit(0);
    });

program
    .command('getWalletOwners')
    .option('-i, --walletId <walletId>', 'Id of the wallet')
    .action(async options => {
        const api = await connect();
        let owners = await getWalletOwners(api, options.walletId)
        console.log("wallet owner's is ", owners);
        process.exit(0);
    });

program
    .command('getWalletBalance')
    .option('-i, --walletId <walletId>', 'Id of the wallet')
    .action(async options => {
        const api = await connect();
        let owners = await getWalletBalance(api, options.walletId)
        console.log("wallet owner's is ", owners);
        process.exit(0);
    });

program
    .command('getPoolId')
    .action(async options => {
        const api = await connect();
        let poolId = await getPoolId(api);
        console.log("Pool Module Id is ", poolId);
        process.exit(0);
    });

program
    .command('getPoolBalance')
    .option('-o, --owner <owner>', 'the address of query balance of')
    .action(async options => {
        const api = await connect();
        let poolBalance = await getPoolBalance(api, options.owner);
        console.log("owners pool balance is ", poolBalance);
        process.exit(0);
    });

program
    .command('getAllowance')
    .option('-o, --owner <owner>', 'the address of query balance of')
    .option('-s, --spender <spender>', 'the address which will spend the funds')
    .action(async options => {
        const api = await connect();
        let allowance = await getAllowance(api, options.owner, options.spender);
        console.log("amount of allowed by owner is ", allowance);
        process.exit(0);
    });

program
    .command('getPayResolverId')
    .action(async options => {
        const api = await connect();
        let payResovlerId = await getPayResolverId(api);
        console.log("Pay Resolver Module is ", payResovlerId);
        process.exit(0);
    });

program
    .command('getPayInfo')
    .option('-i, --payId <payId>', 'Id of pay info')
    .action(async options => {
        const api = await connect();
        let [payAmount, resolveDeadline] = await getPayInfo(api, options.payId);;
        console.log("pay amount is ", payAmount);
        console.log("resolve deadline of pay is ", resolveDeadline);
    })

program.parse();

    