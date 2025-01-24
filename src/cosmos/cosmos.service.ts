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
            console.log(response)
            const blockData = response.data;
            const block = blockData.block;

            return {
                height: block.header.height,
                time: block.header.time,
                hash: blockData.block_id.hash,
                proposerAddress: block.header.proposer_address,
            };
        } catch (error) {
        throw new Error(`Failed to fetch block data: ${error.message}`);
        }
    }

    // Получение транзакции по хешу
    async getTransactionByHash(hash: string): Promise<TransactionData> {
        try {
        const payload = {
            jsonrpc: '2.0',
            method: 'tx',
            params: {
            hash: hash,
            },
            id: 2,
        };

        const response = await lastValueFrom(
            this.httpService.post(this.provider, payload),
        );

        const tx = response.data.result;

        return {
            hash: tx.hash,
            height: tx.height,
            time: tx.timestamp,
            gasUsed: tx.gas_used,
            gasWanted: tx.gas_wanted,
            fee: tx.fee.amount,
            sender: tx.sender,
        };
        } catch (error) {
        throw new Error(`Failed to fetch transaction data: ${error.message}`);
        }
    }
}
