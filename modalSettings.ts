import { PluginSettingTab, Setting } from 'obsidian';
import qaPlugin from './main';

// This class is used to create the settings tab
export default class PluginSetting extends PluginSettingTab {
    // The plugin is passed in as an argument
    constructor(private plugin: qaPlugin) {
        super(plugin.app, plugin);
    }

    // Display the settings tab
    display(): void {
        // Container that contains the settings
        let { containerEl } = this;

        // Clear the container to fix the bug where settings are duplicated
        containerEl.empty();

        // Title of the settings tab
        containerEl.createEl("h1", { text: 'QA Plugin Settings' });

        // Create a setting for the API key
        new Setting(containerEl)
            .setName('API Key')
            .setDesc('Please Enter an API Key')
            // Add a text field to the setting
            .addText((text) => {
                text
                    .setValue(this.plugin.settings.apiKey)
                    // When the value of the text field changes, update the plugin settings
                    .onChange((value) => {
                        // Update the plugin settings
                        this.plugin.settings.apiKey = value;
                        // Pass the settings object to saveData
                        this.plugin.saveSettings();
                    });
            });

        // Create a setting for the HF_TOKEN
        new Setting(containerEl)
            .setName('HF_TOKEN')
            .setDesc('Please Enter an HF_TOKEN')
            // Add a text field to the setting
            .addText((text) => {
                text
                    .setValue(this.plugin.settings.HF_TOKEN)
                    // When the value of the text field changes, update the plugin settings
                    .onChange((value) => {
                        // Update the plugin settings
                        this.plugin.settings.HF_TOKEN = value;
                        // Pass the settings object to saveData
                        this.plugin.saveSettings();
                    });
            });
    }
}
