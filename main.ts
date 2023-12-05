import { Plugin, Notice } from 'obsidian';
import { qaModal } from './modal'; 
import pluginSetting  from './modalSettings';

// interface for the settings
interface MyPluginSettings {
  apiKey: string;
}

// default settings
export const  DEFAULT_SETTINGS: MyPluginSettings = {
  apiKey: " ",
};

// main class
export default class qaPlugin extends Plugin {
  settings: MyPluginSettings;
  settingsView: pluginSetting;

  // load settings and add ribbon icon
  async onload() {
    await this.loadSettings();
    console.log(this.settings)
    // add instance of settings tab
    this.settingsView = new pluginSetting(this);
    this.addSettingTab(this.settingsView);
    this.addRibbonIcon('search', 'QA Plugin', (evt: MouseEvent) => {
      new Notice('New QA Feature!!');
      this.openModal();
    });
  }

  // function to load settings from a json file
  async loadSettings() {
    this.settings = Object.assign({}, 
      DEFAULT_SETTINGS, 
      await this.loadData());
  }

  // save settings to a json file
  async saveSettings() {
    this.saveData(this.settings)
  }

  // function to open the modal
   openModal() {
    // Define the onSubmit function
    const onSubmit = (result: string) => {
      // Do something with the result
      console.log(result);
    };
  
    // Call the qaModal constructor with the onSubmit function as the second argument
    new qaModal(this.app, this, onSubmit).open();
  }
}
