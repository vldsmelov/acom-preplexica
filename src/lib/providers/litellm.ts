import axios from 'axios';
import { ChatOpenAI } from '@langchain/openai';
import { getLiteLLMApiEndpoint, getLiteLLMApiKey } from '../../config';
import logger from '../../utils/logger';

type LiteLLMModel = {
  id?: string;
  model?: string;
  name?: string;
};

const extractModelId = (model: LiteLLMModel) =>
  model.id || model.model || model.name;

const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const loadLiteLLMChatModels = async () => {
  const liteLLMApiEndpoint = stripTrailingSlash(getLiteLLMApiEndpoint());
  const liteLLMApiKey = getLiteLLMApiKey();

  if (!liteLLMApiEndpoint || !liteLLMApiKey) return {};

  try {
    let response;

    try {
      response = await axios.get(`${liteLLMApiEndpoint}/models`, {
        headers: {
          Authorization: `Bearer ${liteLLMApiKey}`,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      response = await axios.get(`${liteLLMApiEndpoint}/v1/models`, {
        headers: {
          Authorization: `Bearer ${liteLLMApiKey}`,
          'Content-Type': 'application/json',
        },
      });
    }

    const rawModels = response.data?.data || response.data?.models || [];

    const chatModels = rawModels.reduce((acc, model) => {
      const modelId = extractModelId(model);

      if (!modelId) return acc;

      acc[modelId] = {
        displayName: modelId,
        model: new ChatOpenAI({
          openAIApiKey: liteLLMApiKey,
          modelName: modelId,
          temperature: 0.7,
          configuration: {
            baseURL: liteLLMApiEndpoint,
          },
        }),
      };

      return acc;
    }, {});

    return chatModels;
  } catch (err) {
    logger.error(`Error loading LiteLLM models: ${err}`);
    return {};
  }
};
