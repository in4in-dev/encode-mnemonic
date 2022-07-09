import Wallet20Interface from "../../Interfaces/Wallet20Interface";
import TronContract from "./TronContract";
let TronWeb = require('tronweb');

export default class TronWallet implements Wallet20Interface<TronContract>
{

    public privateKey : string;
    public address    : string;

    protected tronWeb;

    constructor(privateKey : string) {
        this.privateKey = privateKey;
        this.address = this.getAddress();
        this.tronWeb = this.getTronWeb();
    }

    protected getAddress() : string
    {
        return TronWeb.address.fromPrivateKey(this.privateKey);
    }

    protected getTronWeb() : any
    {

        const HttpProvider = TronWeb.providers.HttpProvider;
        const fullNode = new HttpProvider("https://api.trongrid.io");
        const solidityNode = new HttpProvider("https://api.trongrid.io");
        const eventServer = new HttpProvider("https://api.trongrid.io");

        return new TronWeb(fullNode, solidityNode, eventServer, this.privateKey);

    }

    protected getTrxContract(contract : TronContract) : any
    {
        return this.tronWeb.contract(contract.abi, contract.address);
    }

    public async sendTransaction(transaction : any) : Promise<string>
    {

        let signedTransaction = await this.tronWeb.trx.sign(transaction, this.privateKey);
        let result = await this.tronWeb.trx.sendRawTransaction(signedTransaction);

        return result.txid;

    }

    public async send(amount: number, toAddress: string) : Promise<string>
    {

        let transaction = await this.tronWeb.transactionBuilder.sendTrx(
            toAddress,
            Math.floor(amount * 1000000)
        );

        return this.sendTransaction(transaction);

    }

    public async sendToken(contract : TronContract, amount : number, toAddress : string) : Promise<string>
    {

        let transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(
            contract.address,
            'transfer(address,uint256)',
            {},
            [
                {
                    type : 'address',
                    value : toAddress
                },
                {
                    type : 'uint256',
                    value : Math.floor(amount * 1000000)
                }
            ],
            this.address
        );

        return this.sendTransaction(transaction.transaction);

    }

    public async getBalance(): Promise<number>
    {
        let balance = await this.tronWeb.trx.getBalance(this.address);

        return balance / 1000000;
    }

    public async getBalanceToken(contract : TronContract): Promise<number>
    {

        let contractTrx = await this.getTrxContract(contract);

        let balance = await contractTrx.methods.balanceOf(this.address).call();

        return +balance.toString() / 1000000;

    }

}