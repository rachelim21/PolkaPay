## Requirements
- Install docker
- Install Node 10
- Install Yarn >= 1.10.1

## Install and Build
1. Install celer-substrate-demo repository
```
git clone git@github.com:celer-network/celer-substrate-client.git
```
2. Go to cli file
``` 
cd ./packages/cli
```
3. Install dependency
``` 
npm install
```
4. Build
```
yarn build
```


## Run
1. Run Celer substrate local testnet. Repository is [here](https://github.com/celer-network/cChannel-substrate)
```
docker run -p 9944:9944 -p 9615:9615 thashimoto19980924/celer-network:0.8.8
```

2. Send transaction
### [Open Channel](https://www.celer.network/docs/celercore/channel/pay_contracts.html#open-channel)
Open a state channle through auth withdraw message
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|zeroTotalDeposit|No|amount of funds to deposit is zero|
|msgValue|Yes|amount of funds to deposit from caller|
|peersDeposit|Yes|[bob's deposit amount, alice's deposit amount]|

```
ex1) 
// open channel with total deposit amount is zero
yarn start openChannel --caller 'alice' --zeroTotalDeposit --msgValue 0 --peersDeposit 0,0
```
```
ex2)
// alice deposit token into pool
yarn start depositPool --caller 'alice' --receiver 'alice' --msgValue 20000
// alice approve that celer ledger operation module spend alice's token 
yarn start approve --caller 'alice' --spender 'celerLedgerId' --value 20000
// open channel with [bob's deposit amount, alice's deposit amount] = [1000, 2000]
yarn start openChannel --caller 'bob' --msgValue 1000 --peersDeposit 1000,2000

```

### Set Balance Limits
Set the balance limits of channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of the channel|
|limits|Yes|Limits amount of channel|
```
yarn start setBalanceLimits --caller 'alice' --channelId "0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30" --limits 20000
```

### Enable Balance Limits
Enable balacne limits
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of the channel|
```
yarn start enabelBalanceLimits --caller 'alice' --channelId "0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30"
```

### Disable Balance Limits
Disable balance limits
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of the channel|
```
yarn start disabelBalanceLimits --caller 'bob' --channelId "0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30"
```

### [Deposit](https://www.celer.network/docs/celercore/channel/pay_contracts.html#deposit)
Deposit funds into the channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of the channel|
|receiver|Yes|receiver of funds|
|msgValue|Yes|amounts of funds to deposit from caller|
|transferFromAmount|Yes|amount of funds to be transfered from Pool|
```
yarn start deposit --caller 'alice' --channelId "0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30" --receiver 'alice' --msgValue 1000 --transferFromAmount 1000
```

### Deposit In Batch
Deposit funds into the channel in batch
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelIds|Yes|Ids list of channels|
|receivers|Yes|addresses list of receiver|
|msgValues|Yes|msgValues list of funds to deposit from caller|
|transferFromAmounts|Yes|amounts list of funds to be transfeed from Pool|

```
yarn start depositInBatch --caller 'alice' --channelIds '0x811d25466cf620a5fb3d551b6d3603e7f78cb11e7034955d552eba733da3dc2b','0x0b2a00bb808e7deb38ceccf7493fd34708c4fd5d2ae8d6396e657d9fd7e76e82' --receivers 'alice','bob' --msgValues 1000,100 --transferFromAmounts 0,1000
```

### Snapshot States
Store signed simplex states on-chain as checkpoints
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|payAmounts|Yes|pay amounts list of linked pay id list|
|channelId|Yes|Id of channel| 
|transferAmounts|Yes|amount of token already transferred|
```
// After open channel with [bob's deposit amount, alice's deposit amount] = [1000, 2000]
// alice store signed simplex states on-chain as check points
yarn start snapshotStates --caller 'alice' --payAmounts 10,20 --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --seqNum 5 --transferAmounts 100 
```

### [Intend Withdraw](https://www.celer.network/docs/celercore/channel/pay_contracts.html#unilateral-withdraw)
Intend to withdraw funds from channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|payAmounts|Yes|pay amounts list of linked pay id list|
|channelId|Yes|Id of channel| 
|amount|Yes|amount of funds to withdraw|
```
// After open channel with [bob's deposit amount, alice's deposit amount] = [1000, 2000]
// alice intend to withdraw funds from channel
yarn start intendWithdraw --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --amount 1000
```

### [Confrim Withdraw](https://www.celer.network/docs/celercore/channel/pay_contracts.html#unilateral-withdraw)
Confirm channel withdrawal
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
```
// After alice intend to withdraw funds from channel
// alice confirm channel withdrawal after dispute timeout(default 10 block number)
yarn start confirmWithdraw --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### [Veto Withdraw](https://www.celer.network/docs/celercore/channel/pay_contracts.html#unilateral-withdraw)
Veto current withdrawal intent
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
```
// After alice intend to withdraw funds from channel
// bob veto current withdraw intent
yarn start vetoWithdraw --caller 'bob' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```
### [Cooperative Withdraw](https://www.celer.network/docs/celercore/channel/pay_contracts.html#cooperative-withdraw)
Cooperatively withdraw specfic amount of balance
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
|seqNum|Yes|sequence number|
|amount|Yes|amount of funds to withdraw|
|receiverAccount|Yes|receiver address of funds|
```
// After open channel with [bob's deposit amount, alice's deposit amount] = [1000, 2000]
// alice cooperatively withdraw
yarn start cooperativeWithdraw --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --seqNum 1 --amount 1000 --receiverAccount 'alice'
```

### [Intend Settle](https://www.celer.network/docs/celercore/channel/pay_contracts.html#unilateral-settle)
Intend to settle channel with an array of signed simplex states
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
|seqNums|Yes|sequence number list|
```
// After open channel with [bob's deposit amount, alice's deposit amount] = [2000, 2000]
// alice resolve [payment by conditions](https://www.celer.network/docs/celercore/channel/pay_contracts.html#resolve-payment-by-conditions) of a payment are finalized on-chain
yarn start resolvePaymentByConditions --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --seqNums 1,1 
// alice unilateral settle by co-signed offchain simplex states
yarn start intendSettle --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --seqNums 1,1 
```

### Clear Pays
Read payment results and add results to corresponding simplex payment channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
|seqNums|Yes|sequence number list|
```
// After alice intend settle
// clear pays all remaining pay
yarn start clearPays --caller 'alice' --channelId '0xc5c0757acf7c29f3a43b9ec7178a6491ed65b73989c75870138e5b8e3abdaaad' --seqNums 1,1 

```

### [Confirm Settle](https://www.celer.network/docs/celercore/channel/pay_contracts.html#unilateral-settle)
Confirm channel settlement
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
```
// After cleared all pay
// alice confrim settle and close channel
yarn start confirmSettle --caller 'alice' --channelId '0xc5c0757acf7c29f3a43b9ec7178a6491ed65b73989c75870138e5b8e3abdaaad'
```

### [Cooperative Settle](https://www.celer.network/docs/celercore/channel/pay_contracts.html#cooperative-settle)
Cooperatively settle the channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
|seqNum|Yes|sequence number|
|settleAmounts|Yes|settle amounts list|
```
yarn start cooperativeSettle --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --seqNum 2 --settleAmounts 1000,4000
```

### Deposit Pool
Deposit Native token into Pool
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|receiver|Yes|the address native token is deposited to pool|
|msgValue|Yes|amount of funds to deposit to pool|
```
yarn start depositPool --caller 'alice' --receiver 'alice' --msgValue 20000
```

### Withdraw From Pool
Withdraw native token from Pool
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|value|Yes|amount of funds to withdraw from pool|
```
yarn start withdrawFromPool --caller 'alice' --value 100
```

### Approve
Approve the passed address the spend the specified amount of funds on behalf of caller.
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|spender|Yes|the address which will spend the funds|
|value|Yes|amount of funds to spent|
```
yarn start approve --caller 'alice' --spender 'celerLedgerId' --value 20000
```

### Transfer From
Transfer funds from one address to another.
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|from|Yes|the address which you want to transfer funds from|
|to|Yes|the address which you want to transfer to|
|value|Yes|amount of funds to be transferred|
```
yarn start transferFrom --caller 'bob' --from 'alice' --to 'charlie' --value 1000
```

### Increase Allowance
Increase the amount of native token that an owner allowed to a spender
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|spender|Yes|the address which will spend the funds|
|addedValue|Yes|amount of funds to increase the allowance by spender|
```
yarn start increaseAllowance --caller 'alice' --spender 'celerLedgerId' --addedValue 1000
```

### Decrease Allowance
Decrease the amount of native token that an owner allowed to a spender
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|spender|Yes|the address which will spend the funds|
|subtractedValue|Yes|amount of funds to decrease the allowance by spender|
```
yarn start decreaseAllowance --caller 'alice' --spender 'celerLedgerId' --subtractedValue 1000
```

### [Resolve Payment By Conditions](https://www.celer.network/docs/celercore/channel/pay_contracts.html#resolve-payment-by-conditions)
Resolve a payment by onchain getting its conditons outcomes
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|channelId|Yes|Id of channel| 
|seqNums|Yes|sequence number list|
```
// After open channel with [bob's deposit amount, alice's deposit amount] = [2000, 2000]
// alice resolve [payment by conditions](https://www.celer.network/docs/celercore/channel/pay_contracts.html#resolve-payment-by-conditions) of a payment are finalized on-chain
yarn start resolvePaymentByConditions --caller 'alice' --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30' --seqNums 1,1 
```

### [Resolve Payment By Vouched Result](https://www.celer.network/docs/celercore/channel/pay_contracts.html#resolve-payment-by-vouched-result)
Resolve a payment by submitting an offchain vouched result
#### Parameter
|Name|Required|Description|
|---|---|---|
|caller|Yes|caller of dispatchable function|
|conditions|Yes|type of conditions list|
|maxAmounts|Yes|maximum token transfer amount|
|logicType|Yes|type of resolving logic based on condition outcome|
|amount|Yes|vouch amount|
```
yarn start resolvePaymentByVouchedResult --caller 'alice' --conditions 5 --maxAmounts 100 --logicType 3 --amount 20
```

### Query Celer Ledger Id
Get AccountId of Ledger Operation module
```
yarn start getCelerLedgerId
```

### Query Settle finalized time
Get confrim settle open time
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getSettleFinalizedTime --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Cooperative Withdraw Seq Num
Get cooperative withdraw seq num
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getCooperativeWithdrawSeqNum --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Channel's Total Balance
Get one channel's total balance amount
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getTotalBalance --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Channel's Status
Get one channel's status
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getChannelStatus --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Balance Map
Get one channel's balance info
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getBalanceMap --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Dispute Time Out
Get dispute timeout
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getDisputeTimeout --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Channel's State Seq Num Map
Get channel's state seq_num map of a duplex channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getStateSeqNumMap --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Transfer Out Map
Get transfer_out map of a duplex channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getTransferOutMap --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Next Pay Id List Hash Map
Get next_pay_id_list_hash_map of a duplex channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getNextPayIdListHashMap --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Last Pay Resolve Deadline Map 
Get last_pay_resolve_deadline map of a duplex channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getLastPayResolveDeadlineMap --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Pending Pay Out Map
Get pending_pay_out_map of a duplex channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getPendingPayOutMap --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Withdraw Intent
Get withdraw intent of the channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getWithdrawIntent --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query channel number if given status
Get channel number if given status
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelStatus|Yes|status of channel|
```
yarn start getChannelStatusNum --channelStatus 1
```

### Query Channel's Balance Limits
Get channel's balance limits
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getBalanceLimits --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query whether channel has balance limits 
Get whether channel has balance limits 
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelId|Yes|Id of channel|
```
yarn start getBalanceLimitsEnabled --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Peers Migration Info
Get migration info of the peers in the channel
#### Parameter
|Name|Required|Description|
|---|---|---|
|channelStatus|Yes|status of channel|
```
yarn start getPeersMigrationInfo --channelId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Celer Wallet Id
Get AccountId of Celer Wallet module
#### Parameter
|Name|Required|Description|
|---|---|---|
|walletId|Yes|Id of wallet|
```
yarn start getCelerWalletId --walletId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Wallet's owners
Get wallet owners corresponding to wallet_id
#### Parameter
|Name|Required|Description|
|---|---|---|
|walletId|Yes|Id of wallet|
```
yarn start getWalletOwners --walletId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Wallet's balance
Get wallet balance corresponding to wallet_id
#### Parameter
|Name|Required|Description|
|---|---|---|
|walletId|Yes|Id of wallet|
```
yarn start getWalletBalance --walletId '0x73f3379879d5945f4abf4f1f726f89ca45cc8865e00f3d4c52fe0289889c1c30'
```

### Query Pool Id
Get AccountId of Pool
```
yarn start getPoolId
```

### Query Pool Balance
Get Amount of funds which is pooled of specified address
#### Parameter
|Name|Required|Description|
|---|---|---|
|owner|Yes|the address of query balance of|
```
yarn start getPoolBalance --owner 'alice'
```

### Query Allowance
Get Amount of funds which owner allowed to a spender
#### Parameter
|Name|Required|Description|
|---|---|---|
|owner|Yes|the address of query balance of|
|spender|Yes|the address which will spend the funds|
```
yarn start getAllowance --owner 'alice' --spender 'celerLedgerId'
```

### Query Pay Reoslver Id
Get AccountId of PayResolver module
```
yarn start getPayResolverId
```

### Query PayInfo
Get PayInfo corresponding to pay_id
#### Parameter
|Name|Required|Description|
|---|---|---|
|payId|Yes|Id of pay info|
```
yarn start getPayId --payId '0xdc94f203b926caea3df55a56a186a875406f7c8f25684726c03dc743a4cddc77'
```





