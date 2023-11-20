import { Plugin, Notice } from 'obsidian';
import { qaModal } from './modal'; 

export default class qaPlugin extends Plugin {
  async onload() {
    this.addRibbonIcon('search', 'QA Plugin', (evt: MouseEvent) => {
      new Notice('New QA Feature!!');
      this.openModal();
    });
  }

  openModal() {
    // Define the onSubmit function
    const onSubmit = (result: string) => {
      // Do something with the result
      console.log(result);
    };
  
    // Call the qaModal constructor with the onSubmit function as the second argument
    new qaModal(this.app, onSubmit).open();
  }
}
