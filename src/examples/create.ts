import Wallet from "../Core/Wallet";

(async function(){

	let test = await Wallet.createWallet();
	console.log(test);

	let exact = await Wallet.fromMnemonic(test.mnemonic);

}());

