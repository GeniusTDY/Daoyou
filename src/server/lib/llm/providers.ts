import { createAlibaba } from '@ai-sdk/alibaba';
import { createDeepSeek, deepSeek } from '@ai-sdk/deepseek';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import type { LanguageModel } from 'ai';
import {
  LLM_PROVIDER_DEFAULT_MODELS,
  type LlmProviderId,
} from '@shared/config/llm';

export interface LlmProviderDef {
  id: LlmProviderId;
  defaultModel: string;
  apiKeyEnv: string;
  create: (opts: {
    apiKey?: string;
    fetch?: typeof fetch;
  }) => (modelId: string) => LanguageModel;
}

const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL?.trim();
const ALIBABA_BASE_URL =
  process.env.ALIBABA_BASE_URL?.trim() ||
  'https://dashscope.aliyuncs.com/compatible-mode/v1';
const OPENAI_BASE_URL =
  process.env.OPENAI_BASE_URL?.trim() ||
  process.env.OPENAI_COMPAT_BASE_URL?.trim() ||
  'https://api.openai.com/v1';

export const LLM_PROVIDERS: Record<LlmProviderId, LlmProviderDef> = {
  deepseek: {
    id: 'deepseek',
    defaultModel: LLM_PROVIDER_DEFAULT_MODELS.deepseek,
    apiKeyEnv: 'DEEPSEEK_API_KEY',
    create: ({ apiKey, fetch }) =>
      apiKey || fetch
        ? createDeepSeek({ apiKey, baseURL: DEEPSEEK_BASE_URL, fetch })
        : deepSeek,
  },
  alibaba: {
    id: 'alibaba',
    defaultModel: LLM_PROVIDER_DEFAULT_MODELS.alibaba,
    apiKeyEnv: 'ALIBABA_API_KEY',
    create: ({ apiKey, fetch }) => {
      const provider = createAlibaba({
        apiKey,
        baseURL: ALIBABA_BASE_URL,
        fetch,
      });
      return (modelId: string) => provider(modelId);
    },
  },
  openai: {
    id: 'openai',
    defaultModel: LLM_PROVIDER_DEFAULT_MODELS.openai,
    apiKeyEnv: 'OPENAI_API_KEY',
    create: ({ apiKey, fetch }) => {
      //  OpenAI  vLLM / Ollama baseURL
      const provider = createOpenAICompatible({
        name: 'openai-compatible',
        apiKey,
        baseURL: OPENAI_BASE_URL,
        fetch,
      });
      return (modelId: string) => provider(modelId);
    },
  },
};