import Wallet from "./Core/Wallet";
import * as EthTokens from './Core/Consts/EthTokens';
import * as TronTokens from './Core/Consts/TronTokens';

(async function(){

	//a97ea37821e28c1b17a5fb6711fe523412958a7c1b1d4dd18c9f6c6a8cce3932
	//TXXPb1CViBKfDNK89PpGqYEGSpGoVnKDTm
	//0xeC70c9d28ad78407936d0CA717d5DB31Dc907a05

	let wallet = await Wallet.fromPrivateKey('a97ea37821e28c1b17a5fb6711fe523412958a7c1b1d4dd18c9f6c6a8cce3932');

	try{
		// console.log('Balance TRX:', await wallet.trx.getBalance());
		// console.log('Balance USDT:', await wallet.trx.getBalanceToken(TronTokens.USDT));

		// console.log(await wallet.trx.send(2, 'TEQH6py1Pi8YHNgi9cPMHCKLboBTUZrsYT'));
		// console.log(await wallet.trx.sendToken('TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', 2, 'TEQH6py1Pi8YHNgi9cPMHCKLboBTUZrsYT'));


		// console.log('Balance ETH:', await wallet.eth.getBalance());
		// console.log('Balance USDT:', await wallet.eth.getBalanceToken(
		// 	EthTokens.USDT
		// ));


		// console.log(await wallet.eth.send(0.0001, '0x5F759d685C1781B56FADf83494aEeA438264C6E5'));

		console.log(await wallet.eth.sendToken(EthTokens.USDT, 1, '0x5F759d685C1781B56FADf83494aEeA438264C6E5'));



	}catch (e){
		console.log(e);
	}

}());

