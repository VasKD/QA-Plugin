import { App, Modal, Notice, Setting, TFile } from 'obsidian';
import { askOpenAI } from 'api/openai';
import qaPlugin from './main';


// this class is used to create the modal
export class qaModal extends Modal {
    // store the user's response in the result variable as a string
    result: string;
    onSubmit: (result: string) => void;
    private plugin: qaPlugin;

    // a constructor for the modal
    constructor(app: App, plugin: qaPlugin, onSubmit: (result: string) => void) {
        super(plugin.app);
        this.plugin = plugin;
        this.onSubmit = onSubmit;
    }

  onOpen() {  
    const { contentEl } = this;
    // create a list containing all markdown files in vault
    let allMarkdownFiles: TFile[] = this.app.vault.getMarkdownFiles();

    // create h1 header for title of modal
    contentEl.createEl('h1', { text: 'QA Plugin' });

    // check if the vault has any markdown files
    if (TFile == null){
      const fileError = contentEl.createDiv()
      fileError.innerHTML = `<p>Please Make Sure Your Vault Has File With Content</p>`
    } else {
      // create a text box named "Enter a Question"
      new Setting(contentEl)
      .setName("Enter a Question: ")
      .addText((textarea) => {
        textarea.onChange( async (value) => {
          // store value in result
          this.result = value.trim();
        });
        // make the width of the text box 300px
        textarea.inputEl.style.width = '300px';
      });
    
      // create div for printing user question
      const displayQuestion = contentEl.createDiv();

      // notify the user if they have not provided an API key
      const apiKey = this.plugin.settings.apiKey;
      const HF_TOKEN = this.plugin.settings.HF_TOKEN;
      
      if (apiKey == null || apiKey == "") {
        new Notice('Please provide an OpenAI API key in the QA Plugin Settings.');
        return;
      }
      if (HF_TOKEN == null || HF_TOKEN == "") {
        new Notice('Please provide a HuggingFace API key in the QA Plugin Settings.');
        return;
      }
      
      // create a submit button
      new Setting(contentEl)
        .addButton((btn) =>
          btn
            .setButtonText("Submit")
            .setCta()
            // when the button is clicked, check if the user has provided a question
            .onClick(async () => {
              if (this.result == null || this.result == "") {
                new Notice('Please provide a question.');
                return;
              } else {
                // ask OpenAI a question. If the API key is invalid, notify the user
                try {
                  const answer = await askOpenAI(this.result, this.plugin);
                  displayQuestion.innerHTML = `<p>Question: ${this.result} <br> <br> Answer: ${answer}</p>`;
                } catch (error) {
                  console.log(error)
                  new Notice('One of your API keys is invalid. Please fix it in the QA Plugin Settings.');
                }
              }
              this.onSubmit(this.result);
          }));
      } 

  }

   // clear the contents of the modal when closed
  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }
}


