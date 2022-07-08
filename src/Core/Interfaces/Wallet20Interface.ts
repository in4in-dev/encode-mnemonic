import Contract20Interface from "./Contract20Interface";

export default interface Wallet20Interface
{
    sendToken(contract : Contract20Interface, amount : number, toAddress : string) : Promise<string>;
    send(amount : number, toAddress : string) : Promise<string>;

    getBalanceToken(contract : Contract20Interface) : Promise<number>;
    getBalance() : Promise<number>;
}