import Wallet from "../Core/Wallet";
import {USDT} from "../Core/Consts/TrxTokens";

(async function(){

	let wallet = await Wallet.fromMnemonic('word word word word');

	console.log('Balance before:', await wallet.trx.getBalanceToken(USDT));

	console.log('TxID:', await wallet.trx.sendToken(USDT, 1, 'address'));

	console.log('Balance after:', await wallet.trx.getBalanceToken(USDT));

}());

