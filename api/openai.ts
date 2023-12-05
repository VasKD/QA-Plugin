import qaPlugin from "main";
import OpenAI from "openai";

// this function is used to ask OpenAI a question
export async function askOpenAI(question: string, plugin: qaPlugin) {
  // create an instance of the OpenAI class
  const openai = new OpenAI({ apiKey: plugin.settings.apiKey, dangerouslyAllowBrowser: true});
  // ask OpenAI a question
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": question
      }
    ],
    // temperature, max_tokens, top_p, frequency_penalty, and presence_penalty are all parameters that can be adjusted
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}