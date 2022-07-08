import Wallet20Interface from "../../Interfaces/Wallet20Interface";
import TronContract from "./TronContract";
let TronWeb = require('tronweb');

export default class TronWallet implements Wallet20Interface
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
        return this.tronWeb.contract(contract.abi.entrys, contract.address);
    }

    public async send(amount: number, toAddress: string) : Promise<string>
    {

        let transaction = await this.tronWeb.trx.sendTransaction(toAddress, amount * 1000000);

        return transaction.transaction.txID;

    }

    public async sendToken(contract : TronContract, amount : number, toAddress : string) : Promise<string>
    {

        let contractTrx = this.getTrxContract(contract);

        return contractTrx.methods.transfer(toAddress, amount * 1000000).send();

    }

    public async getBalance(): Promise<number>
    {
        let balance = await this.tronWeb.trx.getBalance(this.address);

        return balance / 1000000;
    }

    public async getBalanceToken(contract : TronContract): Promise<number>
    {

        let contractTrx = await this.getTrxContract(contract);

        let balance = await contractTrx.balanceOf(this.address).call();

        return +balance.toString() / 1000000;

    }

}