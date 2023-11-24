import OpenAI from "openai";

const openai = new OpenAI(
  { apiKey: process.env.OPENAI_API_KEY, 
    dangerouslyAllowBrowser: true 
  });


export async function askOpenAI(question: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      // {
      //   "role": "system",
      //   "content": prompt
      // },
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

