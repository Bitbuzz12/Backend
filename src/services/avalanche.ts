import {Avalanche, BinTools, BN, Buffer } from "@avalabs/avalanchejs"

import { avalanch_int } from "./types/avalanche"
import config from "../config/config"
import crypto from "crypto"

class Avl implements avalanch_int{
    private base_url = ""
    private host = ""
    private privateKey = ""
    private assetId = ""
    private keyPair: string[] = []
    private contractAddress: string = ""
    constructor (
        private avalanche = new Avalanche(config.server.host, parseInt(config.server.port!), config.server.protocol)
    ){
    }

    private getKeyPair(key?: string){
        const bintool = BinTools.getInstance()
        const Xchain = this.avalanche.XChain()
        const keyChain = Xchain.keyChain()
        let kp
        if(key){
            kp = keyChain.importKey(key)
        }else{
            kp = keyChain.makeKey()
        }
        return kp
    }


    private createTrx(){

    }

    private async getBalance(address: string){
        const xchain = this.avalanche.XChain()
        let addresses = xchain.keyChain().getAddresses()
        let addressStrings = xchain.keyChain().getAddressStrings() 
        let utxos = (await xchain.getUTXOs(addressStrings)).utxos
        return utxos.getBalance(addresses, this.assetId)
    }

    private async transferTokens(receiverAddress: string, amount: number, senderAddress?: string) {
        const xchain = this.avalanche.XChain()
        let addressStrings = xchain.keyChain().getAddressStrings()
        let utxos = (await xchain.getUTXOs(addressStrings)).utxos
        let unsignedTx = await xchain.buildBaseTx(
            utxos,
            amount,
            this.assetId,
            [receiverAddress],
            [senderAddress || this.contractAddress],
            addressStrings
          )
          const signed = unsignedTx.sign(xchain.keyChain())
          const txid = await xchain.issueTx(signed)
          return txid
      }

      
}