import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { env } from "../config/env";

export interface LLMMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callLLM(messages: LLMMessage[]): Promise<string> {
  if (!env.OPENAI_API_KEY) {
    console.warn("[LLM] No API key configured, returning mock response.");
    return "LLM not configured. This is a mock response.";
  }

  const llm = new ChatOpenAI({
    apiKey: env.OPENAI_API_KEY,
    modelName: "gpt-4", // Or your preferred model
    temperature: 0.1,
  });

  const formattedMessages = messages.map(msg => {
    if (msg.role === "system") return new SystemMessage(msg.content);
    return new HumanMessage(msg.content);
  });

  try {
    const response = await llm.predictMessages(formattedMessages);
    return response.content as string;
  } catch (err) {
    console.error("[LLM] Error calling OpenAI:", err);
    return "Error calling LLM provider.";
  }
}
