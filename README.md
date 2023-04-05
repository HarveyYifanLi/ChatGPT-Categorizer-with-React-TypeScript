## ChatGPT-Categorizer-with-React-TypeScript
This is a productive Web SPA integrated with the powerful OpenAI ChatGPT API, built with `React.js`, `TypeScript`, `React Router`, and `React-bootstrap` with advanced Filtering and searching features. It's your best companion to categorize and group those messy ChatGPT Queries and Replies in one place at hand.


### Instructions for execution
0. Modify the follow line in `NoteForm.jsx` file to include your own OpenAI API key, in order to get successfully authenticated by OpenAI (https://platform.openai.com/docs/api-reference/authentication):

 `const configuration = new Configuration({`
 
    `apiKey: "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",// This is a fake key, rememeber to insert your own OpenAI API key here`
    
 ` });`
 
1. Clone the Repo and cd into that cloned directory

2. Install all the necessary dependencies specified in `package.json` via command:
`npm install`

3. Run the app via command: `npm run dev`

### Screenshots from the completed App
![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/main-page-all.png)

![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/main-page-tags.png)

![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/main-page-title.png)

![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/EditTags.png)

![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/QnA.png)

![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/EditQnA2.png)

![Test image](https://github.com/HarveyYifanLi/ChatGPT-Categorizer-with-React-TypeScript/blob/main/images/NewQnA2.png)
