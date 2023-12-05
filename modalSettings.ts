import {PluginSettingTab, Setting} from 'obsidian';
import qaPlugin from './main';


// this class is used to create the settings tab
export default class pluginSetting extends PluginSettingTab {    
    // plugin is passed in as an argument
    constructor(private plugin: qaPlugin) {
        super(plugin.app, plugin);
    }

    // display the settings tab
    display(): void {
        // container that contains the settings 
        let {containerEl} = this;

        // clear the container --> fixes bug where settings are duplicated
        containerEl.empty();

        // title of settings tab
        containerEl.createEl("h1", {text: 'QA Plugin Settings'});
        
        // create a setting for the API key
        new Setting(containerEl)
            .setName('API Key')
            .setDesc('Please Enter an API Key')
            // add a text field to the setting
            .addText((item) => {
                item
                    .setValue(this.plugin.settings.apiKey)
                    // when the value of the text field changes, update the plugin settings
                    .onChange((value) => {
                        this.plugin.settings.apiKey = value;
                        this.plugin.saveSettings(); // Pass the settings object to saveData
                    });
            });
}}
