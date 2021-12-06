import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Web3 from 'web3';
import { HttpProvider } from 'web3-core';

@Injectable()
export default class InfuraConfigService extends ConfigService {
    web3: Web3
    provider: HttpProvider;

    constructor() {
        super();
        this.provider = this.createHttpProvider(
            super.get('INFURA_URL'),
            super.get('INFURA_PROJECT_ID'),
            super.get('INFURA_PROJECT_SECRET'),
        );
        this.web3 = new Web3(this.provider);
    }
      
    private createHttpProvider(
        host: string,
        projectId: string,
        projectSecret: string,
    ): HttpProvider {
        const url = "https" + '://:' + projectSecret + '@' + host + '/' + projectId;
        return new Web3.providers.HttpProvider(url);
    }
}