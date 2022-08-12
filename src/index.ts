import * as EthTokens from "./Core/Consts/EthTokens";
import * as TrxTokens from "./Core/Consts/TrxTokens";
import * as BscTokens from "./Core/Consts/BscTokens";

import EthContract from "./Core/Wallets/Eth/EthContract";
import EthWallet from "./Core/Wallets/Eth/EthWallet";

import TrxContract from "./Core/Wallets/Trx/TrxContract";
import TrxWallet from "./Core/Wallets/Trx/TrxWallet";

import Wallet from "./Core/Wallet";

import Wallet20Interface from "./Core/Interfaces/Wallet20Interface";
import Contract20Interface from "./Core/Interfaces/Contract20Interface";

export {Wallet, TrxWallet, EthWallet, TrxContract, EthContract, EthTokens, TrxTokens, BscTokens, Wallet20Interface, Contract20Interface}