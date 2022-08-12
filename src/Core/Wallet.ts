import Web3 from 'web3';
import Bip32 from "./Bip32";
import * as Bip39 from "bip39";
import CryptoJS from "crypto-js";
import TrxWallet from "./Wallets/Trx/TrxWallet";
import EthWallet from "./Wallets/Eth/EthWallet";
import BscWallet from "./Wallets/Bsc/BscWallet";
import WalletInfo from "./WalletInfo";

export default class Wallet {

    public privateKey : string;
    public trx : TrxWallet;
    public eth : EthWallet;
    public bsc : BscWallet;

    public constructor(privateKey : string) {
        this.privateKey = privateKey;

        this.trx = new TrxWallet(privateKey);
        this.eth = new EthWallet(privateKey);
        this.bsc = new BscWallet(privateKey);
    }

    public static generateMnemonic() : string
    {
        return Bip39.generateMnemonic();
    }

    public static fromPrivateKey(privateKey : string) : Wallet
    {
        return new Wallet(privateKey);
    }

    public static async fromSeed(seed : string) : Promise<Wallet>
    {

        let node = await Bip32
            .fromSeed(Buffer.from(seed, 'hex'))
            .derivePath(`m/44'/195'/${ 0 }'/0/0`);

        let privateKey = node.privateKey!.toString('hex');

        return Wallet.fromPrivateKey(privateKey);

    }

    public static async fromMnemonic(mnemonic : string) : Promise<Wallet>
    {

        let seed = await Bip39.mnemonicToSeed(mnemonic);

        return await Wallet.fromSeed(
            seed.toString('hex')
        );

    }

    public static async fromProtectedMnemonic(mnemonic : string, password : string) : Promise<Wallet>
    {

        let seed = await Bip39.mnemonicToSeed(
            Wallet.encodeMnemonic(mnemonic, password)
        );

        return await Wallet.fromSeed(
            seed.toString('hex')
        );

    }

    protected static encodeMnemonic(mnemonic : string, password : string) : string
    {
        return CryptoJS.HmacSHA512(mnemonic, password).toString();
    }

    public static async createWallet() : Promise<WalletInfo>
    {

        let mnemonic = this.generateMnemonic();

        let wallet = await this.fromMnemonic(mnemonic);

        return new WalletInfo(mnemonic, wallet);

    }

    public static async createProtectedWallet(password : string) : Promise<WalletInfo>
    {

        let mnemonic = this.generateMnemonic();

        let wallet = await this.fromProtectedMnemonic(mnemonic, password);

        return new WalletInfo(mnemonic, wallet);

    }

}
