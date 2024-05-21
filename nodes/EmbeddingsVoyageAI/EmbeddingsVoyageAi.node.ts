/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';
import { VoyageEmbeddings } from '@langchain/community/embeddings/voyage';
import { logWrapper } from '../../utils/logWrapper';

export class EmbeddingsVoyageAi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Embeddings VoyageAI',
		name: 'embeddingsVoyageAi',
		icon: 'file:voyageai.svg',
		credentials: [
			{
				name: 'voyageaiApi',
				required: true,
			},
		],
		group: ['transform'],
		version: 1,
		description: 'Use VoyageAI Embeddings',
		defaults: {
			name: 'Embeddings VoyageAI',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiEmbedding],
		outputNames: ['Embeddings'],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL: 'https://api.voyageai.com/v1',
		},
		properties: [
			{
				displayName: 'Model',
				name: 'model',
				type: 'string',
				default: 'voyage-large-2-instruct',
				description: 'The model to use for generating embeddings'
			},
			{
				displayName: 'Input Type',
				name: 'inputType',
				default: 'document',
				description: 'Configure if you embed document or query',
				type: 'string',
			},
		],
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials('voyageaiApi');
		const modelName = this.getNodeParameter('model', itemIndex) as string;
		const inputType = this.getNodeParameter('inputType', itemIndex) as string;

		const embeddings = new VoyageEmbeddings({
			apiKey: credentials.apiKey as string,
			modelName,
			inputType: inputType,
		});

		return {
			response: logWrapper(embeddings, this),
		};
	}
}
