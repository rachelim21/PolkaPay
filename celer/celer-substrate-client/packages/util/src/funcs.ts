import { Keyring } from '@polkadot/keyring';
import { ApiPromise } from '@polkadot/api';
import { 
    getCooperativeWithdrawRequest, 
    getOpenChannelRequest, 
    waitBlockNumber,
    caluculateChannelId,
    selectChannelPeerKeyring,
    selectChannelPeer,
    getZeroHash
} from './utils';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { 
    SignedSimplexStateArray, 
    PayIdList, 
    VouchedCondPayResultOf,
    ResolvePaymentConditionsRequestOf,
    CooperativeSettleRequestOf 
} from 'celer-substrate-types';

const BOB = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
const celerLedgerId = '5EYCAe5fKZwTqKwvoibLLjYSMCkyGNJzwmxAg6SoeiLqQk1W';

export async function setBalanceLimits(
    api: ApiPromise,
    _caller: string,
    channelId: string,
    limits: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);
    
    api.tx.celerPayModule
        .setBalanceLimits(channelId, api.registry.createType("Balance", limits))
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Set Balance Limits:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.SetBalanceLimits [channelId(Hash), limits(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function disableBalanceLimits(
    api: ApiPromise,
    _caller: string,
    channelId: string,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .disableBalanceLimits(channelId)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Disable Balance Limits:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.DisableBalanceLimits [channelId(Hash)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function enableBalanceLimits(
    api: ApiPromise,
    _caller: string,
    channelId: string,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .enableBalanceLimits(channelId)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Enable Balance Limits:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.EnableBalanceLimits [channelId(Hash)]\n')

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            }
        });
}

export async function openChannel(
    api: ApiPromise,
    _caller: string,
    zeroTotalDeposit = true,
    msgValue = 0,
    balanceLimitsEnabled = true,
    balanceLimits = 1000000,
    channelPeerBalance0 = 1000,
    channelPeerBalance1 = 2000,
    openDeadline = 999999, 
    disputeTimeout = 10,
    msgValueReceiver = 0,
): Promise<string> {
    let caller = await selectChannelPeerKeyring(_caller);
  
    let openChannelRequestOf = await getOpenChannelRequest(
        api,
        balanceLimitsEnabled,
        balanceLimits,
        channelPeerBalance0,
        channelPeerBalance1,
        openDeadline,
        disputeTimeout,
        zeroTotalDeposit,
        msgValueReceiver
    );

    let channelId = await caluculateChannelId(api, openChannelRequestOf);
    console.log(`channel id is ${channelId}`);
    console.log(`channelPeers[0] is bob, channelPeers[1] is alice \n`);
    await waitBlockNumber(2);

    api.tx.celerPayModule
        .openChannel(openChannelRequestOf, api.registry.createType("Balance", msgValue))
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Open channel:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', `celerPayModule.EnableBalanceLimits [channelId(Hash)]`);
                console.log('\t', `celerPayModule.SetBalanceLimits [channelId(Hash), balanceLimits(Balance)]`);
                console.log('\t', `system.NewAccount [newAccount(AccountId)]`);
                console.log('\t', `balances.Endowed [createdAccount(AccountId), freeBalance(Balance)]`)
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`)
                console.log('\t', `celerPayModule.OpenChannel [channelId(Hash), channelPeers(Vec<AccountId>), deposits(Vec<Balance>)]`)
                console.log('\t', 'celerPayModule.CreateWallet [walletId(Hash), channelPeers(Vec<AccountId>)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            }
        });
    
    return channelId;
}

export async function deposit(
    api: ApiPromise,
    _caller: string,
    channelId: string,
    _receiver: string,
    msgValue: number,
    transferFromAmount: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);
    let receiver = await selectChannelPeer(api, _receiver);

    api.tx.celerPayModule
        .deposit(channelId, receiver, api.registry.createType("Balance", msgValue), api.registry.createType("Balance", transferFromAmount))
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Deposit:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`)
                console.log('\t', 'celerPaymodule.DepositToChannel [channelId(Hash), channelPeers(Vec<AccountId>), deposits(Vec<Balance>), withdrawals(Vec<Balance>)\n')

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function depositInBatch(
    api: ApiPromise,
    _caller: string,
    _channelIds: string[],
    _receivers: string[],
    _msgValues: number[],
    _transferFromAmounts: number[],
) {
    let caller = await selectChannelPeerKeyring(_caller);

    let receivers = [];
    for (let i = 0; i < _receivers.length; i++) {
        receivers[i] = await selectChannelPeer(api, _receivers[i]);
    }

    let msgValues = [];
    let transferFromAmounts = [];
    for (let i = 0; i < _msgValues.length; i++) {
        msgValues[i] = api.registry.createType("BalanceOf", _msgValues[i]);
        transferFromAmounts[i] = api.registry.createType("BalanceOf", _transferFromAmounts[i]);
    }
    
    let channelIds = [];
    for (let i = 0; i < _channelIds.length; i++) {
        channelIds[i] = api.registry.createType("Hash", _channelIds[i]);
    }
    
    api.tx.celerPayModule
        .depositInBatch(channelIds, receivers, msgValues, transferFromAmounts)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Deposit In Batch:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`);
                console.log('\t', 'celerPaymodule.DepositToChannel [channelId(Hash), channelPeers(Vec<AccountId>), deposits(Vec<Balance>), withdrawals(Vec<Balance>)]\n')

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function snapshotStates(
   api: ApiPromise,
   _caller: string,
   signedSimplexStateArray: SignedSimplexStateArray
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .snapshotStates(signedSimplexStateArray)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Snapshot states:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.SnapshotStates [channelId(Hash), seqNums(Vec<u128>)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function intendWithdraw(
    api: ApiPromise,
    _caller: string,
    channelId: string,
    amount: number,
    isZeroHash = true,
    _recipientChannelId?: string,
) { 
    let caller = await selectChannelPeerKeyring(_caller);
    
    let recipientChannelId: any;
    if (isZeroHash === true) { 
        recipientChannelId = await getZeroHash(api);
    } else {
        recipientChannelId = _recipientChannelId;
    }

    api.tx.celerPayModule
        .intendWithdraw(channelId, amount, recipientChannelId)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Intend Withdraw:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.IntendWithdraw [channelId(Hash), receiver(AccountId), amount(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
                } 
        });
}

export async function confirmWithdraw(
    api: ApiPromise,
    _caller: string,
    channelId: string
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .confirmWithdraw(channelId)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Confirm Withdraw:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.confirmWithdraw [channelId(Hash), withdrawnAmount(Balance), receiver(AccountId), receipientChannelId(Hash), deposits(Vec<Balance>), withdrawals(Vec<Balance>)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function vetoWithdraw(
    api: ApiPromise,
    _caller: string,
    channelId: string
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .vetoWithdraw(channelId)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Veto Withdraw:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.VetoWithdraw [channelId(Hash)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function cooperativeWithdraw(
    api: ApiPromise,
    _caller: string,
    channelId: string,
    seqNum: number,
    amount: number,
    _receiverAccount: string,
    withdrawDeadline = 9999999,
    isZeroHash = true,
    recipientChannelId?: string,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    let cooperativeWithdrawRequest = await getCooperativeWithdrawRequest(
        api,
        channelId,
        seqNum,
        amount,
        _receiverAccount,
        withdrawDeadline,
        isZeroHash,
        recipientChannelId
    );

    api.tx.celerPayModule
        .cooperativeWithdraw(cooperativeWithdrawRequest)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Cooperative Withdraw:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.CooperativeWithdraw [channelId(Hash), withdrawnAmount(Balance), receiver(AccountId), recipientChannelId(Hash), deposits(Vec<Balnace>), withdrawals(Vec<Balance>), seqNum(u128)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function intendSettle(
    api: ApiPromise,
    _caller: string,
    signedSimplexStateArray: SignedSimplexStateArray,
) {
    let caller = await selectChannelPeerKeyring(_caller);
    
    api.tx.celerPayModule
        .intendSettle(signedSimplexStateArray)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Intend Settle:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.ClearOnePay [channelId(Hash), payId(Hash), peerFrom(AccountId), amount(Balance)]');
                console.log('\t', 'celerPayModule.IntendSettle [channelId(Hash), seqNums(Vec<Hash>)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function clearPays(
    api: ApiPromise,
    _caller: string,
    channelId: string,
    _peerFrom: string,
    payIdList: PayIdList
) {
    let caller = await selectChannelPeerKeyring(_caller);    
    let peerFrom = await selectChannelPeer(api, _peerFrom);

    api.tx.celerPayModule
        .clearPays(channelId, peerFrom, payIdList)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Clear Pays:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.ClearOnePay [channelId(Hash), payId(Hash), peerFrom(AccountId), amount(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}


export async function confirmSettle(
    api: ApiPromise,
    _caller: string,
    channelId: string
) {
    let caller = await selectChannelPeerKeyring(_caller);
    
    api.tx.celerPayModule
        .confirmSettle(channelId)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Confirm Settle:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`);
                console.log('\t', 'celerPayModule.WithdrawFromWallet [receiver(AccountId), amount(Balance)]');
                console.log('\t', 'celerPayModule.ConfirmSettle [channelId(Hash), settleBalance(Vec<Balance>)]');
                console.log('\t', 'celerPayModule.ConfirmSettleFail [channelId(Hash)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function cooperativeSettle(
    api: ApiPromise,
    _caller: string,
    settleRequest: CooperativeSettleRequestOf
) {
    let caller = await selectChannelPeerKeyring(_caller);
    
    api.tx.celerPayModule
        .cooperativeSettle(settleRequest)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Cooperative Settle:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`);
                console.log('\t', 'celerPayModule.WithdrawFromWallet [walletId(Hash), receiver(AccountId), amount(Balance)]')
                console.log('\t', 'celerPayModule.CooperativeSettle [channelId(Hash), settleBalances(Vec<Balance>)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function depositPool(
    api: ApiPromise,
    _caller: string,
    _receiver: string,
    amount: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);
    let receiver = await selectChannelPeer(api, _receiver);
    
    api.tx.celerPayModule
        .depositPool(receiver, amount)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Deposit to Pool:', status.type);
            if (status.isInBlock) {
                console.log('Events: ');
                console.log('\t', `system.NewAccount [newAccount(AccountId)]`);
                console.log('\t', `balances.Endowed [createdAccount(AccountId), freeBalance(Balance)]`)
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`)
                console.log('\t', 'celerPayModule.DepositToPool [receiver(AccountId), amount(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function withdrawFromPool(
    api: ApiPromise,
    _caller: string,
    value: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);
    
    api.tx.celerPayModule
        .withdrawFromPool(api.registry.createType("Balance", value))
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Withdraw from Pool:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.WithdrawFromPool [receiver(AccountId), amount(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function approve(
    api: ApiPromise,
    _caller: string,
    _spender: string,
    value: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);
    
    let spender: any;
    if (_spender === 'bob' || _spender === '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty') {
        spender = api.registry.createType("AccountId", BOB);
    } else if (_spender === 'celerLedgerId') {
        spender = api.registry.createType("AccountId", celerLedgerId);
    } else {
        throw new Error('spender is bob or celer ledger operation module');
    }

    api.tx.celerPayModule
        .approve(spender, value)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Approve :', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.Approval [owner(AccountId), spender(AccountId), amount(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function transferFrom(
    api: ApiPromise,
    _caller: string,
    _from: string,
    _to: string,
    value: number,
) {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: 'sr25519'});
    const alice = keyring.addFromUri('//Alice'); 
    const charlie = keyring.addFromUri('//Charlie');

    let caller = await selectChannelPeerKeyring(_caller);
    let from = await selectChannelPeer(api, _from);

    let to;
    if (_to === 'alice' || _to === '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY') {
        to = api.registry.createType("AccountId", alice.address);   
    } else if (_to === 'charlie' || _to === '5EYCAe5fKkaKKxUTp36E2KW1q785EuQDLNuCRm7k7opzCMfq') {
        to = api.registry.createType("AccountId", charlie.address);
    }

    api.tx.celerPayModule
        .transferFrom(from, to, value)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Transfer from :', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.Approval [owner(AccountId), spender(AccountId), amount(Balance)]');
                console.log('\t', `system.NewAccount [newAccount(AccountId)]`);
                console.log('\t', `balances.Endowed [createdAccount(AccountId), freeBalance(Balance)]`)
                console.log('\t', `balances.Transfer [from(AccountId), to(AccountId), value(Balance)]`)
                console.log('\t', 'celerPayModule.Transfer [from(AccountId), receiver(AccountId), amount(Balance)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function increaseAllowance(
    api: ApiPromise,
    _caller: string,
    _spender: string,
    addedValue: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    let spender: any;
    if (_spender === 'bob' || _spender === '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty') {
        spender = api.registry.createType("AccountId", BOB);
    } else if (_spender === 'celerLedgerId') {
        spender = api.registry.createType("AccountId", celerLedgerId);
    } else {
        throw new Error('spender is bob or celer ledger operation module');
    }

    api.tx.celerPayModule
        .increaseAllowance(spender, addedValue)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Increase allowance :', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.Approval [owner(AccountId), spender(AccountId), increasedAmount(Balance)]\n');
                    
                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function decreaseAllowance(
    api: ApiPromise,
    _caller: string,
    _spender: string,
    subtractedValue: number,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    let spender: any;
    if (_spender === 'bob' || _spender === '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty') {
        spender = api.registry.createType("AccountId", BOB);
    } else if (_spender === 'celerLedgerId') {
        spender = api.registry.createType("AccountId", celerLedgerId);
    } else {
        throw new Error('spender is bob or celer ledger operation module');
    }
   
    api.tx.celerPayModule
        .decreaseAllowance(spender, subtractedValue)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Decrease allowance :', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.Approval [owner(AccountId), spender(AccountId), decreasedAmount(Balance)]\n');
                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function resolvePaymentByConditions(
    api: ApiPromise,
    _caller: string,
    resolvePayRequest: ResolvePaymentConditionsRequestOf,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .resolvePaymentByConditions(resolvePayRequest)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Resolve payment by conditions:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.PayInfoUpdate [payId(Hash), amount(Balance), resolveDeadline(BlockNumber)');
                console.log('\t', 'celerPayModule.ResolvePayment [payId(Hash), amount(Balance), resolveDeadline(BlockNumber)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            } 
        });
}

export async function resolvePaymentByVouchedResult(
    api: ApiPromise,
    _caller: string,
    voucehdPayResult: VouchedCondPayResultOf,
) {
    let caller = await selectChannelPeerKeyring(_caller);

    api.tx.celerPayModule
        .resolvePaymentByVouchedResult(voucehdPayResult)
        .signAndSend(caller, ({ events = [], status }) => {
            console.log('Resolve payment by vouched result:', status.type);
            if (status.isInBlock) {
                console.log('Included at block hash', status.asInBlock.toHex());
                console.log('Events: ');
                console.log('\t', 'celerPayModule.ResolvePayment [payId(Hash), amount(Balance), resolveDeadline(BlockNumber)]\n');

                events.forEach(({ event: { data, method, section}}) => {
                    const [error] = data;
                    if (error.isModule) {
                        const { documentation, name, section } = api.registry.findMetaError(error.asModule);
                        console.log(`${section}: error message is ${name}, ${documentation}` );
                    } else {
                        console.log('\t', `${section}.${method}`, data.toString());
                    }
                });
            }
        });
}