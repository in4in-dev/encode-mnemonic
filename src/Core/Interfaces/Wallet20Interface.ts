export default interface Wallet20Interface
{
    sendToken(contract : string, amount : number, toAddress : string) : Promise<string>;
    send(amount : number, toAddress : string) : Promise<string>;

    getBalanceToken(contract : string) : Promise<number>;
    getBalance() : Promise<number>;
}