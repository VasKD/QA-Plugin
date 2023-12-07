import qaPlugin from "main";
import OpenAI from "openai";
import { TFile } from "obsidian";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HfInference } from '@huggingface/inference';


// this function is used to ask OpenAI a question
export async function askOpenAI(question: string, plugin: qaPlugin) {
  // create an instance of the OpenAI class
  const openai = new OpenAI({ 
    apiKey: plugin.settings.apiKey, 
    dangerouslyAllowBrowser: true
  });

  // create an instance of the HuggingFace class
  const HF_TOKEN = plugin.settings.HF_TOKEN;
  const hf = new HfInference(HF_TOKEN);

  // initialize variables
  let relevantChunks = "";
  
  // create a list containing all markdown files in vault
  let allMarkdownFiles: TFile[] = this.app.vault.getMarkdownFiles();
   
  for (let i = 0 ; i < allMarkdownFiles.length; i++) {
    let markdownFile = await this.app.vault.read(allMarkdownFiles[i]);

    // create an instance of the RecursiveCharacterTextSplitter class
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });
    
    // split the text into chunks
    let chunks = await textSplitter.splitText(markdownFile);
    chunks = chunks.map(chunk => chunk.toLowerCase());

    // get the similarity score for each chunk
    const output = await hf.sentenceSimilarity({
      model: 'sentence-transformers/paraphrase-xlm-r-multilingual-v1',
      inputs: {
        source_sentence: question,
        sentences: chunks,
      }
    });

    // make a list of the similarity scores
    const scores = Object.values(output);
    // find the index of the highest score
    const highestScore = Math.max(...scores);

    // find the index of the highest score
    let highestScoreIndex = 0;
    for (let i = 0; i < scores.length; i++) {
      if (scores[i] <= 0){
        continue;
      }
      if (scores[i] == highestScore) {
        console.log("highest" + scores[i])
        highestScoreIndex = i;
        relevantChunks += chunks[highestScoreIndex];
        break;
      }
    }

  }
  console.log(relevantChunks);

  // possible prompts
  let prompt1 = "Answer the question asked below using the following context; If no answer can be found inform the user that no answer can be found for the question from that context. "
  let prompt2 = "Instructions: You are a helpful assistant called SecretaryGPT and will not engage in active conversation with the user. You will be given a question and the user's note files as context. You must answer the question based on their notes only. If no answer can be found inform the user that no answer can be found for the given question from their notes."
  let prompt3 = "Instructions: You are a helpful assistant called SecretaryGPT and will not engage in active conversation with the user. You will be given a question and the user's note files as context. You must answer the question based on the their notes only. Simply provide an answer, if no answer can be found inform the user that no answer can be found for the given question from their notes."
  let prompt4 = "Instructions: You are a helpful assistant called SecretaryGPT and will not engage in active conversation with the user or ask for additional input. You will be given a question and the user's note files as context. You must answer the question based on the their notes only. Simply provide an answer, if no answer can be found inform the user that no answer can be found for the given question from their notes and do nothing else."

  // ask OpenAI a question
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          "role": "system",
          "content": prompt3
        },
        {
          "role": "user",
          "content": "Question: " + question + "Context: " + relevantChunks
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    return response.choices[0].message.content;
  } catch (error) {
    throw new Error(error.message);
  }}