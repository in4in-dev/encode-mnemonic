import Wallet20Interface from "../../Interfaces/Wallet20Interface";
import Web3 from "web3";
import EthContract from "./EthContract";

export default class EthWallet implements Wallet20Interface
{

    public privateKey : string;
    public address : string;

    protected ethWeb : Web3;

    constructor(privateKey : string) {
        this.privateKey = privateKey;
        this.ethWeb = this.getEthWeb();
        this.address = this.getAddress();
    }

    protected getAddress() : string
    {
        return this.ethWeb.eth.accounts.privateKeyToAccount(this.privateKey).address;
    }

    protected getEthWeb() : Web3
    {
        return new Web3('https://cloudflare-eth.com/');
    }

    public async getBalance(): Promise<number> {

        let balance = await this.ethWeb.eth.getBalance(this.address);

        return +balance / 1000000;

    }

    public async getBalanceToken(contract : EthContract): Promise<number> {

        let contractEth = await this.getContract(contract);

        let balance = await contractEth.methods.balanceOf(this.address).call();

        return +balance / 1000000;

    }

    public send(amount: number, toAddress: string): Promise<string> {
        return Promise.resolve("");
    }

    public sendToken(contract: EthContract, amount: number, toAddress: string): Promise<string> {
        return Promise.resolve("");
    }

    public async getContract(contract : EthContract)
    {
        return new this.ethWeb.eth.Contract(contract.abi, contract.address);
    }



}