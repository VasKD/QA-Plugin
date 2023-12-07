# Obsidian Question Answering Plugin

This is a plugin that utilizes NLP techniques to answer questions a user may have about the contents of the notes in their vault. 


**Note:** This plugin is not published in the Community Plugins. 
**Node.js:** Make sure that you have node.js to run the commands while installing


## How to install and use
**API Keys:** This plugin makes calls to the OpenAI and Hugging Face APIs, so an API key for both is needed to use this plugin. 
1. Download the zip from the Submission branch of this repo
2. Create or choose a vault in which you wish to use the plugin and navigate to the '.obsidian' folder in your file explorer.

       'obsidian-folder-name'\.obsidian\

3. Create a 'plugins' folder in the .obsidian folder and unzip the repo file within it 
4. In your terminal, navigate to the unzipped repo folder (Qa-Plugin-Submission) and run the following commands to install dependencies and build the plugin:

        npm install 
        npm run build 

5. Close and reopen the vault where you installed the plugin
6. Click on the settings tab on the bottom left of the obsidian window
7. Navigate to 'Community Plugins'
8. Toggle the sliding button next to the plugin in the 'Installed plugins' section, so that a magnifying glass appears in the navigation bar located on the left of the window
9. Click on the settings icon next to the sliding button
10. Provide your OpenAI and Hugging Face API keys
11. Click on the magnifying glass to open the modal for the plugin 
12. Ask questions about the notes in your vault

### Authors 
Kiara Vasquez 

Anushka Chinoy
