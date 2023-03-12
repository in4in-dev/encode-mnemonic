import Wallet from "../Core/Wallet";

(async function(){

	let test = await Wallet.createProtectedWallet('1234');
	console.log(test);

	let exact = await Wallet.fromProtectedMnemonic(test.mnemonic, '1234');

}());

