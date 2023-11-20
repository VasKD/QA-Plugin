import { App, Modal, Setting, TFile } from 'obsidian';
import { HfInference } from '@huggingface/inference';

export class qaModal extends Modal {
    // store the user's response in the result variable as a string
    result: string;
    onSubmit: (result: string) => void;
    constructor(app: App, onSubmit: (result: string) => void) {
        super(app);
        this.onSubmit = onSubmit;
    }

  async onOpen() {
    const hf = new HfInference("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");
  
    // get contents of current file open in the vault
    const TFile = this.app.workspace.getActiveFile();
    // read the file into variable (wait until it successfuly loads)
    let fileContent: string = '';
    if (TFile !== null) {
        fileContent = await this.app.vault.read(TFile);
    }
 
    const { contentEl } = this;
    
    // create h1 header for title of modal
    contentEl.createEl('h1', { text: 'QA Plugin' });

    // check if markdown file has content
    if (fileContent == null || fileContent == ""){
      const fileError = contentEl.createDiv()
      fileError.innerHTML = `<p>Please Make Sure Your File Has Content</p>`
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
              if (this.result == null || this.result == "") {
                inputError.innerHTML = `<p>Please Provide a Question</p>`;
                return;
              } else {
                // remove any input errors that may have been present prior
                inputError.detach();
                const result = await hf.questionAnswering({
                  model: 'deepset/roberta-base-squad2',
                  inputs: {
                    question: this.result,
                    context: fileContent
                  }
                });
                displayQuestion.innerHTML = `<p>Question: ${this.result} <br> <br> Answer: ${result.answer}</p>`;
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


