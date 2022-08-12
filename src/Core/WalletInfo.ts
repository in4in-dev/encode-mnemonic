import Wallet from "./Wallet";

export default class WalletInfo{

    public mnemonic : string;
    public privateKey : string;
    public trxAddress : string;
    public bscAddress : string;
    public ethAddress : string;

    public constructor(mnemonic : string, wallet : Wallet) {
        this.mnemonic = mnemonic;
        this.privateKey = wallet.privateKey;
        this.trxAddress = wallet.trx.address;
        this.bscAddress = wallet.bsc.address;
        this.ethAddress = wallet.eth.address;
    }



}