import Contract20Interface from "./Contract20Interface";

export default interface Wallet20Interface<Contract extends Contract20Interface>
{
    sendToken(contract : Contract, amount : number, toAddress : string) : Promise<string>;
    send(amount : number, toAddress : string) : Promise<string>;

    getBalanceToken(contract : Contract) : Promise<number>;
    getBalance() : Promise<number>;
}