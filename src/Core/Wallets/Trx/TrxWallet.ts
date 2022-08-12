import Wallet20Interface from "../../Interfaces/Wallet20Interface";
import TrxContract from "./TrxContract";
import TransactionInterface from "../../Interfaces/TransactionInterface";
let TronWeb = require('tronweb');

export default class TrxWallet implements Wallet20Interface<TrxContract>
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

    protected getTrxContract(contract : TrxContract) : any
    {
        return this.tronWeb.contract(contract.abi, contract.address);
    }

    public async signTransaction(transaction : TransactionInterface) : Promise<any>
    {
        return await this.tronWeb.trx.sign(transaction, this.privateKey);
    }

    public async sendSignedTransaction(signedTransaction : any) : Promise<string>
    {
        let result = await this.tronWeb.trx.sendRawTransaction(signedTransaction);

        return result.txid;
    }

    public async sendTransaction(transaction : TransactionInterface) : Promise<string>
    {

        return this.sendSignedTransaction(
            await this.signTransaction(transaction)
        )

    }

    public async createSendTransaction(amount : number, toAddress : string) : Promise<TransactionInterface>
    {
        let transaction = await this.tronWeb.transactionBuilder.sendTrx(
            toAddress,
            Math.floor(amount * 1000000)
        );

        return transaction.transaction;
    }

    public async send(amount: number, toAddress: string) : Promise<string>
    {

        return this.sendTransaction(
            await this.createSendTransaction(amount, toAddress)
        );

    }

    public async createSendTokenTransaction(contract : TrxContract, amount : number, toAddress : string) : Promise<TransactionInterface>
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

        return transaction.transaction;
    }

    public async sendToken(contract : TrxContract, amount : number, toAddress : string) : Promise<string>
    {

        return this.sendTransaction(
            await this.createSendTokenTransaction(contract, amount, toAddress)
        );

    }

    public async getBalance(): Promise<number>
    {
        let balance = await this.tronWeb.trx.getBalance(this.address);

        return balance / 1000000;
    }

    public async getBalanceToken(contract : TrxContract): Promise<number>
    {

        let contractTrx = await this.getTrxContract(contract);

        let balance = await contractTrx.methods.balanceOf(this.address).call();

        return +balance.toString() / 1000000;

    }

}