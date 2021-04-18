import { ApiPromise, WsProvider } from '@polkadot/api';
import * as celerDefinitions from 'celer-substrate-types/src/interfaces/definitions';

export async function connect (): Promise<ApiPromise> {
    // extract all types from definitions - fast and dirty approach, flatted on 'types'
    const types = Object.values(celerDefinitions).reduce((res, { types }): object => ({ ...res, ...types }), {});
    const wsProvider = new WsProvider('ws://localhost:9944');
    const api = await ApiPromise.create({
        provider: wsProvider,
        types: {
            ...types,
            "Address": "AccountId",
            "LookupSource": "AccountId",
            "Signature": "MultiSignature",
            // chain-specific overrides
            Keys: 'SessionKeys4'
        },
        rpc: celerRpc,
    });

    return api;
}

const celerRpc = {
    celerPayModule: {
        getCelerLedgerId: {
            description: "Return Celer Ledger Operation module id",
            params: [],
            type: "AccountId",
        },
        getSettleFinalizedTime: {
            description: "Return channel confirm settle open time",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "BlockNumber",
        },
        getChannelStatus: {
            description: "Return channel status",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "u8",
        },
        getCooperativeWithdrawSeqNum: {
            description: "Return cooperative withdraw seq_num",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "SeqNumWrapper",
        },
        getTotalBalance: {
            description: "Return one channel\'s total balance amount",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "BalanceWrapper",
        },
        getBalanceMap: {
            description: "Return one channel\'s balance map",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<BalanceWrapper>, Vec<BalanceWrapper>)",
        },
        getDisputeTimeOut: {
            description: "Return channel's dispute timeout",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "BlockNumber",
        },
        getStateSeqNumMap: {
            description: "Return state seq_num map of a duplex channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<SeqNumWrapper>)",
        },
        getTransferOutMap: {
            description: "Return transfer_out map of a duplex channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<BalanceWrapper>)",
        },
        getNextPayIdListHashMap: {
            description: "Return next_pay_id_list_hash map of a duplex channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<Hash>)",
        },
        getLastPayResolveDeadlineMap: {
            description: "Return last_pay_resolve_deadline map of a duplex channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<BlockNumber>)",
        },
        getPendingPayOutMap: {
            description: "Return pending_pay_out map of a duplex channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<BalanceWrapper>)",
        },
        getWithdrawIntent: {
            description: "Return the withdraw intent info of the channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(AccountId, BalanceWrapper, BlockNumber, Hash)",
        },
        getChannelStatusNum: {
            description: "Return the channel number of given status",
            params: [
                {
                    name: "channelStatus",
                    type: "u8",
                }
            ],
            type: "u8",
        },
        getBalanceLimits: {
            description: "Return balance limits",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "BalanceWrapper",
        },
        getBalanceLimitsEnabled: {
            description: "Whether balance limits is enable",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "bool",
        },
        getPeersMigrationInfo: {
            description: "Return migration info of the peers in the channel",
            params: [
                {
                    name: "channelId",
                    type: "Hash",
                }
            ],
            type: "(Vec<AccountId>, Vec<BalanceWrapper>, Vec<BalanceWrapper>, Vec<SeqNumWrapper>, Vec<BalanceWrapper>, Vec<BalanceWrapper>)",
        },
        getCelerWalletId: {
            description: "Return AccountId of Celer Wallet module",
            params: [],
            type: "AccountId",
        },
        getWalletOwners: {
            description: "Return wallet owner conrresponding tp wallet_id",
            params: [
                {
                    name: "walletId",
                    type: "Hash",
                }
            ],
            type: "Vec<AccountId>",
        },
        getWalletBalance: {
            description: "Return amount of funds which is deposited into specified wallet",
            params: [
                {
                    name: "walletId",
                    type: "Hash",
                }
            ],
            type: "BalanceWrapper",
        },
        getPoolId: {
            description: "Return AccountId of Pool",
            params: [],
            type: "AccountId",
        },
        getPoolBalance: {
            description: "Return amount of funds which is pooled of specified address",
            params: [
                {
                    name: "owner",
                    type: "AccountId",
                }
            ],
            type: "BalanceWrapper",
        },
        getAllowance: {
            description: "Return amount of funds which owner allowed to a spender",
            params: [
                {
                    name: "owner",
                    type: "AccountId",
                },
                {
                    name: "spender",
                    type: "AccountId",
                }
            ],
            type: "BalanceWrapper",
        },
        getPayResolverId: {
            description: "Return AccountId of PayResolver module",
            params: [],
            type: "AccountId",
        },
        getPayInfo: {
            description: "Return PayInfo corresponding to pay id",
            params: [
                {
                    name: "payId",
                    type: "Hash",
                }
            ],
            type: "(BalanceWrapper, BlockNumber)"
        }
    }
}

