import Wallet20Interface from "../../Interfaces/Wallet20Interface";
import Web3 from "web3";
import EthContract from "./EthContract";
import { Contract, ContractSendMethod } from "web3-eth-contract";

export default class EthWallet implements Wallet20Interface<EthContract> {

    public privateKey: string;
    public address: string;

    protected ethWeb: Web3;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
        this.ethWeb = this.getEthWeb();
        this.address = this.getAddress();
    }

    protected getAddress(): string {
        return this.ethWeb.eth.accounts.privateKeyToAccount(this.privateKey).address;
    }

    protected getEthWeb(): Web3 {
        return new Web3('https://api.mycryptoapi.com/eth');
    }

    public async getBalance(): Promise<number> {

        let balance = await this.ethWeb.eth.getBalance(this.address);

        return +balance / 1000000000000000000;

    }

    public async getBalanceToken(contract: EthContract): Promise<number> {

        let contractEth = await this.getContractEth(contract);

        let balance = await contractEth.methods.balanceOf(this.address).call();

        return +balance / 1000000;

    }

    public async send(amount: number, toAddress: string): Promise<string> {

        return this.sendTransaction({
            to : toAddress,
            value : Math.floor(amount * 1000000000000000000)
        });

    }

    public async sendToken(contract: EthContract, amount: number, toAddress: string): Promise<string> {

        let contractEth = await this.getContractEth(contract);

        let transfer = contractEth.methods.transfer(toAddress, amount * 1000000);
        // let gas = await transfer.estimateGas({from : this.address});

        return this.sendTransaction({
            from : this.address,
            to : contract.address,
            data: transfer.encodeABI(),
        });

    }

    public async sendTransaction(transaction : { [key:string] : any }) : Promise<string>
    {

        // let gasPrice = await this.ethWeb.eth.getGasPrice();

        let gas = await this.ethWeb.eth.estimateGas(transaction);

        let sign = await this.ethWeb.eth.accounts.signTransaction(
            {
                gas,
                // gasPrice,
                ...transaction
            },
            this.privateKey
        );

        let receipt = await this.ethWeb.eth.sendSignedTransaction(sign.rawTransaction!);

        return receipt.transactionHash;

    }

    public async getContractEth(contract : EthContract) : Promise<Contract>
    {
        return new this.ethWeb.eth.Contract(contract.abi, contract.address);
    }



}