import { App, Modal, Setting, TFile } from 'obsidian';
import { askOpenAI } from 'api/openai';
import qaPlugin from './main';


// this class is used to create the modal
export class qaModal extends Modal {
    // store the user's response in the result variable as a string
    result: string;
    onSubmit: (result: string) => void;
    private plugin: qaPlugin;

    constructor(app: App, plugin: qaPlugin, onSubmit: (result: string) => void) {
        super(plugin.app);
        this.plugin = plugin;
        this.onSubmit = onSubmit;
    }

  onOpen() {  
    // create a list containing all markdown files in vault
    let allMarkdownFiles: TFile[] = this.app.vault.getMarkdownFiles();

    const { contentEl } = this;

    // create h1 header for title of modal
    contentEl.createEl('h1', { text: 'QA Plugin' });

    // check if markdown file has content
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
      const inputError = contentEl.createDiv();
      
      // create a button called "Submit"
      new Setting(contentEl)
        .addButton((btn) =>
          btn
            .setButtonText("Submit")
            // set button color to theme in vault
            .setCta()
            .onClick(async () => {
              console.log('Submit button clicked'); // Log when the button is clicked
              console.log('this.result:', this.result); // Log the value of this.result
              console.log(this.plugin.settings.apiKey)

              if (this.result == null || this.result == "") {
                inputError.innerHTML = `<p>Please Provide a Question</p>`;
                return;
              } else {
                // remove any input errors that may have been present prior
                inputError.detach();
                const answer = await askOpenAI(this.result, this.plugin).catch(console.error);
                displayQuestion.innerHTML = `<p>Question: ${this.result} <br> <br> Answer: ${answer}</p>`;
              }
              this.onSubmit(this.result);
          }));
      } 

  }

  onClose() {
    // clear the contents of the modal when closed
    let { contentEl } = this;
    contentEl.empty();
  }
}


