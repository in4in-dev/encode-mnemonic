import Wallet from "./Core/Wallet";

(async function(){

	let test = await Wallet.createProtectedWallet('1234');
	console.log(test);

	let usualWallet = await Wallet.fromMnemonic(test.mnemonic);
	console.log(usualWallet.privateKey);

	let yourWallet = await Wallet.fromProtectedMnemonic(test.mnemonic, '1234');
	console.log(yourWallet.privateKey);

}());

