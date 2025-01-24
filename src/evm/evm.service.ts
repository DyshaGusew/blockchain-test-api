import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';

export interface BlockData {
    height: number;
    hash: string;
    parentHash: string;
    gasLimit: number;
    gasUsed: number;
    size: number;
}

export interface TransactionData {
    hash: string;
    to: string | null;
    from: string;
    value: string;
    input: string;
    maxFeePerGas: string | null;
    maxPriorityFeePerGas: string | null;
    gasPrice: string | null;
}

@Injectable()
export class EvmService {
    private readonly provider;

    constructor() {
        this.provider = new ethers.JsonRpcProvider('https://haqq-evm.publicnode.com/');
    }

// Получение информации о блоке по высоте
// http://localhost:3000/evm/block/15060891
    async getBlockByHeight(height: number): Promise<BlockData> {
        try {
            const block = await this.provider.send('eth_getBlockByNumber', [height, false]);

        if (!block) {
            throw new HttpException('Block not found', HttpStatus.NOT_FOUND);
        }

        return {
            height: parseInt(block.number, 16),
            hash: block.hash,
            parentHash: block.parentHash,
            gasLimit: parseInt(block.gasLimit, 16),
            gasUsed: parseInt(block.gasUsed, 16),
            size: parseInt(block.size, 16),
        };
        } catch (error) {
        throw new HttpException(
            'Failed to fetch block data',
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
        }
    }

// Получение информации о транзакции по хэшу
// http://localhost:3000/evm/transactions/0x9950ea9cc0d5b399dacad0eedb89978e7367e49e54332d6a019c21f8743655fb
    async getTransactionByHash(hash: string): Promise<TransactionData> {
        try {
            const transaction = await this.provider.send('eth_getTransactionByHash', [hash]);
        if (!transaction) {
            console.error(`Transaction not found for hash: ${hash}`);
            throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
        }

        return {
            hash: transaction.hash,
            to: transaction.to,
            from: transaction.from,
            value: transaction.value ? transaction.value.toString() : null,
            input: transaction.input,
            maxFeePerGas: transaction.maxFeePerGas?.toString() || null,
            maxPriorityFeePerGas: transaction.maxPriorityFeePerGas?.toString() || null,
            gasPrice: transaction.gasPrice?.toString() || null,
        };
        } catch (error) {
            console.error(`Error fetching transaction for hash: ${hash}`, error);
            throw new HttpException(
            'Failed to fetch transaction data',
            HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
