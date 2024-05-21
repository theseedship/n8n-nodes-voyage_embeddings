const EmbeddingsVoyageAi = require('./dist/nodes/EmbeddingsVoyageAI/EmbeddingsVoyageAi.node.js');
const voyageaiCredentials = require('./dist/credentials/EmbeddingsVoyageAiApi.credentials.js');

module.exports = {
  nodes: [
    EmbeddingsVoyageAi
  ],
  credentials: [
    voyageaiCredentials
  ]
};
