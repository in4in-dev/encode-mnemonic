import Wallet from "./Core/Wallet";
import * as EthTokens from './Core/Consts/EthTokens';
import * as TronTokens from './Core/Consts/TronTokens';

(async function(){

	//095bd6fd4278f20bf4fa1ad7075e0d51ee5894bf35695af1d3fd73cc41593c91
	//TJfx6JnwQjcY6z2WVmSSLEm6eyqthFHy4r
	//0x5F759d685C1781B56FADf83494aEeA438264C6E5

	let wallet = await Wallet.fromPrivateKey('095bd6fd4278f20bf4fa1ad7075e0d51ee5894bf35695af1d3fd73cc41593c91');

	try{
		// console.log('Balance TRX:', await wallet.trx.getBalance());
		// console.log('Balance USDT:', await wallet.trx.getBalanceToken(TronTokens.USDT));

		// console.log(await wallet.trx.send(2, 'TEQH6py1Pi8YHNgi9cPMHCKLboBTUZrsYT'));
		// console.log(await wallet.trx.sendToken('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', 2, 'TEQH6py1Pi8YHNgi9cPMHCKLboBTUZrsYT'));


		console.log('Balance ETH:', await wallet.eth.getBalance());
		console.log('Balance USDT:', await wallet.eth.getBalanceToken(
			EthTokens.USDT
		));



	}catch (e){
		console.log(e);
	}

}());

