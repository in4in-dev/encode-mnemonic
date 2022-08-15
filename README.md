# Good wallet for you (BSC, ETH, TRX) (+Tokens)
Cryptocurrency wallet that has all the standard features and even a little more. See docs.
```
npm i encode-mnemonic-wallet
```

- [Creator/restore methods](#main)
- [Wallets methods](#methods)
- [Contracts (tokens)](#contracts)
- [Feature: Protected wallet](#feature)

<a name="main"></a>
## Create/restore methods
```typescript
Wallet.generateMnemonic() : string;
```
```typescript
Wallet.fromPrivateKey(key : string) : Promise<Wallet>;
```
```typescript
Wallet.fromSeed(seed : string) : Promise<Wallet>;
```
```typescript
Wallet.fromMnemonic(mnemonic : string) : Promise<Wallet>;
```
```typescript
Wallet.fromProtectedMnemonic(mnemonic : string, password : string) : Promise<Wallet>;
```
```typescript
Wallet.createWallet() : Promise<WalletInfo>;
```
```typescript
Wallet.createProtectedWallet(password : string) : Promise<WalletInfo>;
```


<a name="methods"></a>
## Wallets Methods
```typescript
let wallet = Wallet.fromMnemonic('...');
```
For access to this methods - you must use

``wallet.trx.[method]``
``wallet.bsc.[method]`` 
``wallet.eth.[method]``

```typescript
send(amount : number, toAddress : string) : Promise<string>;
```
```typescript
sendToken(contract : Contract, amount : number, toAddress : string) : Promise<string>;
```
```typescript
createSendTransaction(amount : number, toAddress : string) : Promise<TransactionInterface>;
```
```typescript
createSendTokenTransaction(contract : Contract, amount : number, toAddress : string) : Promise<TransactionInterface>;
```
```typescript
getBalanceToken(contract : Contract) : Promise<number>;
```
```typescript
getBalance() : Promise<number>;
```
```typescript
signTransaction(transaction : TransactionInterface) : Promise<any>;
```
```typescript
sendTransaction(transaction : TransactionInterface) : Promise<string>;
```
```typescript
sendSignedTransaction(signedTransaction : any) : Promise<string>;
```

<a name="contracts"></a>
## Contracts

```typescript
let bscContract = new BscContract(address : string, abi : any);
let ethContract = new EthContract(address : string, abi : any);
let trxContract = new TrxContract(address : string, abi : any);
```

### Default contracts for you (USDT, BUSD, USDC):
```typescript
import {EthTokens, TrxTokens, BscTokens} from 'encode-mnemonic-wallet';
```

<a name="feature"></a>
# Feature: Protected wallet
### We are so afraid for our mnemonic phrases (12 words), but why not just protect your wallet with a password (salt)?
Even if your phrase is stolen from you, it will be useless without a password.

```javascript
let test = await Wallet.createProtectedWallet('1234');
console.log(test);
```

```javascript
{
  mnemonic: 'dad novel inject measure venture doctor armor elevator spare debris pizza call',
  privateKey: 'baf1f79a16ba2c0687ce49c2eb0237bc549002d9f0d04fc2c56192b85c6e4a56',
  trxAddress: 'TFdU1iDGsFHhtyJKA39joKG296as6dzwz7',
  bscAddress: '0x3e14F75a8B78239d2c40Fa58Fc386f94Ca80FE22',
  ethAddress: '0x3e14F75a8B78239d2c40Fa58Fc386f94Ca80FE22'
}
```
### Example #1 (Wrong)
Imagine that a mnemonic phrase was stolen from you. An attacker is trying to enter your wallet through third-party crypto wallets.

```javascript
let usualWallet = await Wallet.fromMnemonic('dad novel inject measure venture doctor armor elevator spare debris pizza call');
console.log(usualWallet.privateKey);
```

It's useless, it's not your wallet:
```
cd3245a2223cc7cb1c7c9c3465c8295e6782e4c0d898d733eda39c7ea978767e
```

### Example #2 (True)
Only your password will allow access to your wallet.
```javascript
let encodeWallet = await Wallet.fromProtectedMnemonic('dad novel inject measure venture doctor armor elevator spare debris pizza call', '1234');
console.log(usualWallet.privateKey);
```

```
baf1f79a16ba2c0687ce49c2eb0237bc549002d9f0d04fc2c56192b85c6e4a56
```
After receiving the private key, you can also use it to enter third-party crypto wallets. Your private key = your money.
