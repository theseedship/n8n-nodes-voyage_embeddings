import type {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties
} from 'n8n-workflow';

export class EmbeddingsVoyageAi implements ICredentialType {
	name = 'voyageaiApi';

	displayName = 'VoyageAI API';

	documentationUrl = 'voyageai';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
		},
	];

    authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.voyageai.com/v1',
            url: '/embeddings',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                input: ["Test input"],
                model: "voyage-2",
            },
            json: true,
        },
    };
}