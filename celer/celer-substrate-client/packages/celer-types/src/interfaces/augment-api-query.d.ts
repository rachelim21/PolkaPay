import type { Bytes, Option, Vec, bool, u128, u32, u64, u8 } from '@polkadot/types';
import type { AnyNumber, ITuple, Observable } from '@polkadot/types/types';
import type { AccountData, BalanceLock } from '@polkadot/types/interfaces/balances';
import type { CodeHash, ContractInfo, PrefabWasmModule, Schedule } from '@polkadot/types/interfaces/contracts';
import type { SetId, StoredPendingChange, StoredState } from '@polkadot/types/interfaces/grandpa';
import type { AccountId, Balance, BalanceOf, BlockNumber, ExtrinsicsWeight, Hash, Moment, Releases } from '@polkadot/types/interfaces/runtime';
import type { SessionIndex } from '@polkadot/types/interfaces/session';
import type { AccountInfo, DigestOf, EventIndex, EventRecord, LastRuntimeUpgradeInfo, Phase } from '@polkadot/types/interfaces/system';
import type { Multiplier } from '@polkadot/types/interfaces/txpayment';
import type { ChannelOf, PayInfoOf, WalletOf } from 'celer-types/interfaces/celerPayModule';
import type { ApiTypes } from '@polkadot/api/types';
declare module '@polkadot/api/types/storage' {
    interface AugmentedQueries<ApiType> {
        balances: {
            /**
             * The balance of an account.
             *
             * NOTE: This is only used in the case that this module is used to store balances.
             **/
            account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountData>>;
            /**
             * Any liquidity locks on some account balances.
             * NOTE: Should only be accessed when setting, changing and freeing a lock.
             **/
            locks: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Vec<BalanceLock>>>;
            /**
             * Storage version of the pallet.
             *
             * This is set to v2.0.0 for new networks.
             **/
            storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>>;
            /**
             * The total units issued in the system.
             **/
            totalIssuance: AugmentedQuery<ApiType, () => Observable<Balance>>;
        };
        celerPayModule: {
            /**
             * Mapping (owner, spender) to amount of funds to be allowed by owner
             **/
            allowed: AugmentedQueryDoubleMap<ApiType, (key1: AccountId | string | Uint8Array, key2: AccountId | string | Uint8Array) => Observable<Option<BalanceOf>>>;
            /**
             * Mapping the channel id to Channel
             **/
            channelMap: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<ChannelOf>>>;
            /**
             * Celer Ledger
             * Mapping channel status to number of channel which is corresponding to status
             **/
            channelStatusNums: AugmentedQuery<ApiType, (arg: u8 | AnyNumber | Uint8Array) => Observable<Option<u8>>>;
            /**
             * Mapping pay id to PayInfo
             **/
            payInfoMap: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<PayInfoOf>>>;
            /**
             * Pool
             * Mapping owner to amount of funds in Pool
             **/
            poolBalances: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<BalanceOf>>>;
            storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>>;
            /**
             * Celer Wallet
             * Number of wallet
             **/
            walletNum: AugmentedQuery<ApiType, () => Observable<u128>>;
            /**
             * Mapping the wallet id(channel id) to Wallet
             **/
            wallets: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<WalletOf>>>;
        };
        contracts: {
            /**
             * The subtrie counter.
             **/
            accountCounter: AugmentedQuery<ApiType, () => Observable<u64>>;
            /**
             * A mapping between an original code hash and instrumented wasm code, ready for execution.
             **/
            codeStorage: AugmentedQuery<ApiType, (arg: CodeHash | string | Uint8Array) => Observable<Option<PrefabWasmModule>>>;
            /**
             * The code associated with a given account.
             *
             * TWOX-NOTE: SAFE since `AccountId` is a secure hash.
             **/
            contractInfoOf: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<Option<ContractInfo>>>;
            /**
             * Current cost schedule for contracts.
             **/
            currentSchedule: AugmentedQuery<ApiType, () => Observable<Schedule>>;
            /**
             * A mapping from an original code hash to the original code, untouched by instrumentation.
             **/
            pristineCode: AugmentedQuery<ApiType, (arg: CodeHash | string | Uint8Array) => Observable<Option<Bytes>>>;
            /**
             * A mapping between virtual address(hash(code_hash, app nonce)) between deployed address
             **/
            virtToRealMap: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Option<AccountId>>>;
        };
        grandpa: {
            /**
             * The number of changes (both in terms of keys and underlying economic responsibilities)
             * in the "set" of Grandpa validators from genesis.
             **/
            currentSetId: AugmentedQuery<ApiType, () => Observable<SetId>>;
            /**
             * next block number where we can force a change.
             **/
            nextForced: AugmentedQuery<ApiType, () => Observable<Option<BlockNumber>>>;
            /**
             * Pending change: (signaled at, scheduled change).
             **/
            pendingChange: AugmentedQuery<ApiType, () => Observable<Option<StoredPendingChange>>>;
            /**
             * A mapping from grandpa set ID to the index of the *most recent* session for which its
             * members were responsible.
             *
             * TWOX-NOTE: `SetId` is not under user control.
             **/
            setIdSession: AugmentedQuery<ApiType, (arg: SetId | AnyNumber | Uint8Array) => Observable<Option<SessionIndex>>>;
            /**
             * `true` if we are currently stalled.
             **/
            stalled: AugmentedQuery<ApiType, () => Observable<Option<ITuple<[BlockNumber, BlockNumber]>>>>;
            /**
             * State of the current authority set.
             **/
            state: AugmentedQuery<ApiType, () => Observable<StoredState>>;
        };
        randomnessCollectiveFlip: {
            /**
             * Series of block headers from the last 81 blocks that acts as random seed material. This
             * is arranged as a ring buffer with `block_number % 81` being the index into the `Vec` of
             * the oldest hash.
             **/
            randomMaterial: AugmentedQuery<ApiType, () => Observable<Vec<Hash>>>;
        };
        sudo: {
            /**
             * The `AccountId` of the sudo key.
             **/
            key: AugmentedQuery<ApiType, () => Observable<AccountId>>;
        };
        system: {
            /**
             * The full account information for a particular account ID.
             **/
            account: AugmentedQuery<ApiType, (arg: AccountId | string | Uint8Array) => Observable<AccountInfo>>;
            /**
             * Total length (in bytes) for all extrinsics put together, for the current block.
             **/
            allExtrinsicsLen: AugmentedQuery<ApiType, () => Observable<Option<u32>>>;
            /**
             * Map of block numbers to block hashes.
             **/
            blockHash: AugmentedQuery<ApiType, (arg: BlockNumber | AnyNumber | Uint8Array) => Observable<Hash>>;
            /**
             * The current weight for the block.
             **/
            blockWeight: AugmentedQuery<ApiType, () => Observable<ExtrinsicsWeight>>;
            /**
             * Digest of the current block, also part of the block header.
             **/
            digest: AugmentedQuery<ApiType, () => Observable<DigestOf>>;
            /**
             * The number of events in the `Events<T>` list.
             **/
            eventCount: AugmentedQuery<ApiType, () => Observable<EventIndex>>;
            /**
             * Events deposited for the current block.
             **/
            events: AugmentedQuery<ApiType, () => Observable<Vec<EventRecord>>>;
            /**
             * Mapping between a topic (represented by T::Hash) and a vector of indexes
             * of events in the `<Events<T>>` list.
             *
             * All topic vectors have deterministic storage locations depending on the topic. This
             * allows light-clients to leverage the changes trie storage tracking mechanism and
             * in case of changes fetch the list of events of interest.
             *
             * The value has the type `(T::BlockNumber, EventIndex)` because if we used only just
             * the `EventIndex` then in case if the topic has the same contents on the next block
             * no notification will be triggered thus the event might be lost.
             **/
            eventTopics: AugmentedQuery<ApiType, (arg: Hash | string | Uint8Array) => Observable<Vec<ITuple<[BlockNumber, EventIndex]>>>>;
            /**
             * The execution phase of the block.
             **/
            executionPhase: AugmentedQuery<ApiType, () => Observable<Option<Phase>>>;
            /**
             * Total extrinsics count for the current block.
             **/
            extrinsicCount: AugmentedQuery<ApiType, () => Observable<Option<u32>>>;
            /**
             * Extrinsics data for the current block (maps an extrinsic's index to its data).
             **/
            extrinsicData: AugmentedQuery<ApiType, (arg: u32 | AnyNumber | Uint8Array) => Observable<Bytes>>;
            /**
             * Extrinsics root of the current block, also part of the block header.
             **/
            extrinsicsRoot: AugmentedQuery<ApiType, () => Observable<Hash>>;
            /**
             * Stores the `spec_version` and `spec_name` of when the last runtime upgrade happened.
             **/
            lastRuntimeUpgrade: AugmentedQuery<ApiType, () => Observable<Option<LastRuntimeUpgradeInfo>>>;
            /**
             * The current block number being processed. Set by `execute_block`.
             **/
            number: AugmentedQuery<ApiType, () => Observable<BlockNumber>>;
            /**
             * Hash of the previous block.
             **/
            parentHash: AugmentedQuery<ApiType, () => Observable<Hash>>;
            /**
             * True if we have upgraded so that `type RefCount` is `u32`. False (default) if not.
             **/
            upgradedToU32RefCount: AugmentedQuery<ApiType, () => Observable<bool>>;
        };
        timestamp: {
            /**
             * Did the timestamp get updated in this block?
             **/
            didUpdate: AugmentedQuery<ApiType, () => Observable<bool>>;
            /**
             * Current time for the current block.
             **/
            now: AugmentedQuery<ApiType, () => Observable<Moment>>;
        };
        transactionPayment: {
            nextFeeMultiplier: AugmentedQuery<ApiType, () => Observable<Multiplier>>;
            storageVersion: AugmentedQuery<ApiType, () => Observable<Releases>>;
        };
    }
    interface QueryableStorage<ApiType extends ApiTypes> extends AugmentedQueries<ApiType> {
    }
}
