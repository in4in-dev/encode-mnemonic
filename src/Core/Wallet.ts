import Web3 from 'web3';
import Bip32 from "./Bip32";
import * as Bip39 from "bip39";
import CreatedWalletData from "./CreatedWalletData";
import CryptoJS from "crypto-js";

let TronWeb = require('tronweb');

export default class Wallet {

    public privateKey : string;

    public constructor(privateKey : string) {
        this.privateKey = privateKey;
    }

    public getTrxAddress() : string
    {
        return TronWeb.address.fromPrivateKey(this.privateKey);
    }

    public getBscAddress() : string
    {
        return this.getEthAddress();
    }

    public getEthAddress() : string
    {
        return (new Web3).eth.accounts.privateKeyToAccount(this.privateKey).address;
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
        return CryptoJS.HmacSHA256(mnemonic, password).toString();
    }

    public static async createWallet() : Promise<CreatedWalletData>
    {

        let mnemonic = this.generateMnemonic();

        let wallet = await this.fromMnemonic(mnemonic);

        return {
            mnemonic,
            privateKey : wallet.privateKey,
            trxAddress : wallet.getTrxAddress(),
            bscAddress : wallet.getBscAddress(),
            ethAddress : wallet.getEthAddress()
        }

    }

    public static async createProtectedWallet(password : string) : Promise<CreatedWalletData>
    {

        let mnemonic = this.generateMnemonic();

        let wallet = await this.fromProtectedMnemonic(mnemonic, password);

        return {
            mnemonic,
            privateKey : wallet.privateKey,
            trxAddress : wallet.getTrxAddress(),
            bscAddress : wallet.getBscAddress(),
            ethAddress : wallet.getEthAddress()
        }

    }

}
