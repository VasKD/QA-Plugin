import qaPlugin from "main";
import OpenAI from "openai";


export async function askOpenAI(question: string, plugin: qaPlugin) {
  const openai = new OpenAI({ apiKey: plugin.settings.apiKey, dangerouslyAllowBrowser: true});

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "user",
        "content": question
      }
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}