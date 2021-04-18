"use strict";
/* eslint-disable @typescript-eslint/camelcase */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    rpc: {
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
                },
            ],
            type: "(BalanceWapper, BlockNumber)",
        },
    },
    types: {
        BalanceWrapper: {
            amount: "Balance"
        },
        SeqNumWrapper: {
            number: "u128"
        },
        PayInfo: {
            amount: "Option<Balance>",
            resolveDeadline: "Option<BlockNumber>"
        },
        PayInfoOf: {
            amount: "Option<Balance>",
            resolveDeadline: "Option<BlockNumber>",
        },
        Wallet: {
            owners: "Vec<AccountId>",
            balance: "Balance",
        },
        WalletOf: {
            owners: "Vec<AccountId>",
            balance: "Balance",
        },
        ConditionType: {
            _enum: ['HashLock', 'RuntimeModule', 'SmartContract']
        },
        RuntimeModuleCallData: {
            registrationNum: "u32",
            argsQueryFinalization: "Vec<u8>",
            argsQueryOutcome: "Vec<u8>",
        },
        SmartContractCallData: {
            virtAddr: "Hash",
            isFinalizedCallGasLimit: "u64",
            isFinalizedCallInputData: "Vec<u8>",
            getOutcomeCallGasLimit: "u64",
            getOutcomeCallInputData: "Vec<u8>",
        },
        Condition: {
            conditionType: 'ConditionType',
            hashLock: "Option<Hash>",
            runtimeModuleCallData: "Option<RuntimeModuleCallData>",
            smartContractCallData: "Option<SmartContractCallData>",
        },
        TokenType: {
            _enum: ['Invalid', 'Celer']
        },
        TokenInfo: {
            tokenType: 'TokenType',
        },
        AccountAmtPair: {
            account: 'Option<AccountId>',
            amt: 'Balance',
        },
        TokenTransfer: {
            token: 'TokenInfo',
            receiver: 'AccountAmtPair',
        },
        TransferFunctionType: {
            _enum: [
                'BooleanAnd', 'BooleanOr', 'BooleanCircut',
                'NumericAdd', 'NumericMax', 'NumericMin',
            ]
        },
        TransferFunction: {
            logicType: 'TransferFunctionType',
            maxTransfer: 'TokenTransfer',
        },
        ConditionalPay: {
            payTimestamp: 'Moment',
            src: 'AccountId',
            dest: 'AccountId',
            conditions: 'Vec<Condition>',
            transferFunc: 'TransferFunction',
            resolveDeadline: 'BlockNumber',
            resolveTimeout: 'BlockNumber',
        },
        ConditionalPayOf: {
            payTimestamp: 'Moment',
            src: 'AccountId',
            dest: 'AccountId',
            conditions: 'Vec<Condition>',
            transferFunc: 'TransferFunction',
            resolveDeadline: 'BlockNumber',
            resolveTimeout: 'BlockNumber',
        },
        ResolvePaymentConditionsRequest: {
            condPay: 'ConditionalPay',
            hashPreimages: 'Vec<Hash>',
        },
        ResolvePaymentConditionsRequestOf: {
            condPay: 'ConditionalPay',
            hashPreimages: 'Vec<Hash>',
        },
        CondPayResult: {
            condPay: "ConditionalPay",
            amount: "Balance",
        },
        VouchedCondPayResult: {
            condPayResult: 'CondPayResult',
            sigOfSrc: 'Signature',
            sigOfDest: 'Signature',
        },
        VouchedCondPayResultOf: {
            condPayResult: 'CondPayResult',
            sigOfSrc: 'Signature',
            sigOfDest: 'Signature',
        },
        TokenDistribution: {
            token: 'TokenInfo',
            distribution: 'Vec<AccountAmtPair>',
        },
        PaymentChannelInitializer: {
            balanceLimitsEnabled: 'bool',
            balanceLimits: 'Option<Balance>',
            initDistribution: 'TokenDistribution',
            openDeadline: 'BlockNumber',
            disputeTimeout: 'BlockNumber',
            msgValueReceiver: 'u8',
        },
        PaymentChannelInitializerOf: {
            balanceLimitsEnabled: 'bool',
            balanceLimits: 'Option<Balance>',
            initDistribution: 'TokenDistribution',
            openDeadline: 'BlockNumber',
            disputeTimeout: 'BlockNumber',
            msgValueReceiver: 'u8',
        },
        OpenChannelRequest: {
            channelInitializer: 'PaymentChannelInitializer',
            sigs: 'Vec<Signature>',
        },
        OpenChannelRequestOf: {
            channelInitializer: 'PaymentChannelInitializer',
            sigs: 'Vec<Signature>',
        },
        PayIdList: {
            payIds: 'Vec<Hash>',
            nextListHash: 'Option<Hash>',
        },
        SimplexPaymentChannel: {
            channelId: "Hash",
            peerFrom: "Option<AccountId>",
            seqNum: "u128",
            transferToPeer: "Option<TokenTransfer>",
            pendingPayIds: "Option<PayIdList>",
            lastPayResolveDeadline: "Option<BlockNumber>",
            totalPendingAmount: "Option<Balance>",
        },
        SignedSimplexState: {
            simplexState: "SimplexPaymentChannel",
            sigs: "Vec<Signature>",
        },
        SignedSimplexStateArray: {
            signedSimplexStates: "Vec<SignedSimplexState>",
        },
        SignedSimplexStateArrayOf: {
            signedSimplexStates: "Vec<SignedSimplexState>",
        },
        CooperativeWithdrawInfo: {
            channelId: "Hash",
            seqNum: "u128",
            withdraw: "AccountAmtPair",
            withdrawDeadline: "BlockNumber",
            recipientChannelId: "Hash",
        },
        CooperativeWithdrawInfoOf: {
            channelId: "Hash",
            seqNum: "u128",
            withdraw: "AccountAmtPair",
            withdrawDeadline: "BlockNumber",
            recipientChannelId: "Hash",
        },
        CooperativeWithdrawRequest: {
            withdrawInfo: "CooperativeWithdrawInfo",
            sigs: "Vec<Signature>",
        },
        CooperativeWithdrawRequestOf: {
            withdrawInfo: "CooperativeWithdrawInfo",
            sigs: "Vec<Signature>",
        },
        CooperativeSettleInfo: {
            channelId: "Hash",
            seqNum: "u128",
            settleBalance: "Vec<AccountAmtPair>",
            settleDeadline: "BlockNumber",
        },
        CooperativeSettleInfoOf: {
            channelId: "Hash",
            seqNum: "u128",
            settleBalance: "Vec<AccountAmtPair>",
            settleDeadline: "BlockNumber",
        },
        CooperativeSettleRequest: {
            settleInfo: "CooperativeSettleInfo",
            sigs: "Vec<Signature>",
        },
        CooperativeSettleRequestOf: {
            settleInfo: "CooperativeSettleInfo",
            sigs: "Vec<Signature>",
        },
        ChannelStatus: {
            _set: {
                Uninitialized: 0,
                Operable: 1,
                Settling: 2,
                Closed: 3,
            }
        },
        PeerState: {
            seqNum: "u128",
            transferOut: "Balance",
            nextPayIdListHash: "Option<Hash>",
            lastPayResolveDeadline: "BlockNumber",
            pendingPayOut: "Balance",
        },
        PeerStateOf: {
            seqNum: "u128",
            transferOut: "Balance",
            nextPayIdListHash: "Option<Hash>",
            lastPayResolveDeadline: "BlockNumber",
            pendingPayOut: "Balance",
        },
        PeerProfile: {
            peerAddr: "AccountId",
            deposit: "Balance",
            withdrawal: "Option<Balance>",
            state: "PeerState",
        },
        PeerProfileOf: {
            peerAddr: "AccountId",
            deposit: "Balance",
            withdrawal: "Option<Balance>",
            state: "PeerState",
        },
        WithdrawIntent: {
            receiver: "AccountId",
            amount: "Option<Balance>",
            requestTime: "Option<BlockNumber>",
            recipientChannelId: "Option<Hash>",
        },
        WithdrawIntentOf: {
            receiver: "AccountId",
            amount: "Option<Balance>",
            requestTime: "Option<BlockNumber>",
            recipientChannelId: "Option<Hash>",
        },
        ChannelOf: {
            balanceLimitsEnabled: "bool",
            balanceLimits: "Option<Balance>",
            settleFinalizedTime: "Option<BlockNumber>",
            disputeTimeout: "BlockNumber",
            token: "TokenInfo",
            status: "ChannelStatus",
            peerProfiles: "Vec<PeerProfile>",
            cooperativeWithdrawSeqNum: "Option<u128>",
            withdrawIntent: "WithdrawIntent",
        },
    }
};
