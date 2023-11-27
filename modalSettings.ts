import {App, PluginSettingTab, Setting} from 'obsidian';
import qaPlugin from './main';



export default class pluginSetting extends PluginSettingTab {    
    constructor(private plugin: qaPlugin) {
        super(plugin.app, plugin);
    }

    display(): void {
        // container that contains the settings 
        let {containerEl} = this;

        // title of settings tab
        containerEl.createEl("h1", {text: 'QA Plugin Settings'});

        new Setting(containerEl)
            .setName('API Key')
            .setDesc('Please Enter an API Key')
            .addText((item) => {
                item
                    .setValue(this.plugin.settings.apiKey)
                    .onChange((value) => {
                        this.plugin.settings.apiKey = value;
                        this.plugin.saveSettings(); // Pass the settings object to saveData
                    });
            });
}}
