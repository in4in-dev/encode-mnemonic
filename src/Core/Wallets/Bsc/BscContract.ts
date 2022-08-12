import Contract20Interface from "../../Interfaces/Contract20Interface";

export default class BscContract implements Contract20Interface
{

    public address;
    public abi;

    constructor(address : string, abi : any) {
        this.address = address;
        this.abi = abi;
    }

}