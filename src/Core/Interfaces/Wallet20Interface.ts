import Contract20Interface from "./Contract20Interface";
import TransactionInterface from "./TransactionInterface";

export default interface Wallet20Interface<Contract extends Contract20Interface>
{
    send(amount : number, toAddress : string) : Promise<string>;
    sendToken(contract : Contract, amount : number, toAddress : string) : Promise<string>;

    createSendTransaction(amount : number, toAddress : string) : Promise<TransactionInterface>;
    createSendTokenTransaction(contract : Contract, amount : number, toAddress : string) : Promise<TransactionInterface>;

    getBalanceToken(contract : Contract) : Promise<number>;
    getBalance() : Promise<number>;

    signTransaction(transaction : TransactionInterface) : Promise<any>;

    sendTransaction(transaction : TransactionInterface) : Promise<string>;
    sendSignedTransaction(signedTransaction : any) : Promise<string>;

}