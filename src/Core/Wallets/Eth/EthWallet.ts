import Wallet20Interface from "../../Interfaces/Wallet20Interface";
import Web3 from "web3";
import EthContract from "./EthContract";
import { Contract, ContractSendMethod } from "web3-eth-contract";
import TransactionInterface from "../../Interfaces/TransactionInterface";
import {SignedTransaction} from "web3-core";

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

    public async createSendTransaction(amount : number, toAddress : string) : Promise<TransactionInterface>
    {
        return {
            to : toAddress,
            value : Math.floor(amount * 1000000000000000000)
        }
    }

    public async createSendTokenTransaction(contract: EthContract, amount: number, toAddress: string) : Promise<TransactionInterface>
    {

        let contractEth = await this.getContractEth(contract);

        let transfer = contractEth.methods.transfer(toAddress, amount * 1000000);

        return {
            from : this.address,
            to : contract.address,
            data: transfer.encodeABI(),
        }

    }

    public async send(amount: number, toAddress: string): Promise<string> {

        return this.sendTransaction(
            await this.createSendTransaction(amount, toAddress)
        );

    }

    public async sendToken(contract: EthContract, amount: number, toAddress: string): Promise<string> {

        return this.sendTransaction(
            await this.createSendTokenTransaction(contract, amount, toAddress)
        );

    }

    public async signTransaction(transaction : TransactionInterface) : Promise<SignedTransaction>
    {

        let gas = await this.ethWeb.eth.estimateGas(transaction);

        return await this.ethWeb.eth.accounts.signTransaction(
            {
                gas,
                // gasPrice,
                ...transaction
            },
            this.privateKey
        );

    }

    public async sendSignedTransaction(signedTransaction : SignedTransaction) : Promise<string>
    {

        let receipt = await this.ethWeb.eth.sendSignedTransaction(signedTransaction.rawTransaction!);

        return receipt.transactionHash;

    }

    public async sendTransaction(transaction : TransactionInterface) : Promise<string>
    {

        return this.sendSignedTransaction(
            await this.signTransaction(transaction)
        );

    }

    public async getContractEth(contract : EthContract) : Promise<Contract>
    {
        return new this.ethWeb.eth.Contract(contract.abi, contract.address);
    }

}