# Why not add a password when using a mnemonic phrase (12 words)?
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

## Example #1 (Wrong)
Imagine that a mnemonic phrase was stolen from you. An attacker is trying to enter your wallet through third-party crypto wallets.

```javascript
let usualWallet = await Wallet.fromMnemonic('dad novel inject measure venture doctor armor elevator spare debris pizza call');
console.log(usualWallet.privateKey);
```

It's useless, it's not your wallet:
```
cd3245a2223cc7cb1c7c9c3465c8295e6782e4c0d898d733eda39c7ea978767e
```

## Example #2 (True)
Only your password will allow access to your wallet.
```javascript
let encodeWallet = await Wallet.fromProtectedMnemonic('dad novel inject measure venture doctor armor elevator spare debris pizza call', '1234');
console.log(usualWallet.privateKey);
```

```
baf1f79a16ba2c0687ce49c2eb0237bc549002d9f0d04fc2c56192b85c6e4a56
```
After receiving the private key, you can also use it to enter third-party crypto wallets. Your private key = your money.
