import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

export interface BlockData {
    height: number;
    time: string;
    hash: string;
    proposerAddress: string;
}

export interface TransactionData {
    hash: string;
    height: number;
    time: string;
    gasUsed: number;
    gasWanted: number;
    fee: string;
    sender: string;
}

@Injectable()
export class CosmosService {
    private readonly provider = 'https://cosmos-rest.publicnode.com';

    constructor(private readonly httpService: HttpService) {}

  // Получение блока по высоте
  //http://localhost:3000/cosmos/block/23388629
    async getBlockByHeight(height: number): Promise<BlockData>{
        try {
            const response = await lastValueFrom(
                this.httpService.get(`${this.provider}/cosmos/base/tendermint/v1beta1/blocks/${height}`)
            );
            console.log(response.data)
            const blockData = response.data;
            const blockHeader = blockData.block.header;

            return {
                height: blockHeader.height,
                time: blockHeader.time,
                hash: blockData.block_id.hash,
                proposerAddress: blockHeader.proposer_address,
            };
        } catch (error) {
        throw new Error(`Failed to fetch block data: ${error.message}`);
        }
    }

    // Получение транзакции по хешу
    //http://localhost:3000/cosmos/transactions/0c1d9f2a51d90fb8306c1895c30babc3c484321bb54680e1917ae5c205bd4a28
    async getTransactionByHash(hash: string): Promise<TransactionData> {
        try {
        const response = await lastValueFrom(
                this.httpService.get(`${this.provider}/cosmos/tx/v1beta1/txs/${hash}`)
            );

        const tx_data = response.data.tx_response;
        const tx_auth_info = tx_data.tx.auth_info

        const sender = tx_data.tx.body.messages
        .find(message => message["@type"] === "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward")
        ?.delegator_address;


        return {
            hash: tx_data.txhash,
            height: tx_data.height,
            time: tx_data.timestamp,
            gasUsed: tx_data.gas_used,
            gasWanted: tx_data.gas_wanted,
            fee: tx_data.tx.auth_info.fee, //Не совсем понял, что выводить из fee, вывел все))
            sender: sender
        };

        } catch (error) {
        throw new Error(`Failed to fetch transaction data: ${error.message}`);
        }
    }
}
