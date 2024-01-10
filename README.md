# Babylon Micro-Farms Chatbot App

## Description

The Babylon Micro-Farms Chatbot App, created by a Forge SWE team in January 2024, is a React-based chatbot application designed to assist users of the Galleri Micro-Farm product. Babylon Micro-Farms, starting at the University of Virginia, aims to make hydroponic farming more accessible and understandable. This chatbot serves as a tool for customers to ask questions regarding maintenance, hydroponic farming, and other questions regarding Babylon’s products. 

Key Ideas: 
   - This is a React application built without a backend or database. 
   - It uses OpenAI’s Assistants API.
   - The functionality of the chatbot relies on the assistant’s ID.
   - The developers created threads, runs, messages, etc to facilitate a conversation between the user and the assistant. It    also displays all previous messages of the conversation. 

This application aims to enhance customer experience by providing quick, reliable information about Babylon’s hydroponic farming products. 

## How to Install and Run the Project 

1. Clone Git Repository: ‘git clone https://github.com/IvanTheEngineer/BabylonChatBot’
2. Run ‘npm install’ to install all dependencies. Check they are correctly installed by running:
	npm install @mui/material @emotion/react @emotion/styled
    npm install @mui/icons-material
    npm install @mui/material-next
    npm install openai
3. Create an OpenAI assistant and save the assistant ID and API key: https://platform.openai.com/docs/assistants/how-it-works/creating-assistants 
4. Create .env file with variables VITE_OPENAI_API_KEY and VITE_ASSISTANT_ID
5. To view locally, run ‘npm run dev’


## File Structure:
	- App.jsx - parent file containing all API logic and organizing components, uses Chat.jsx component
	- index.html - root html file, used to import extra fonts (stylesheets)
	- components - folder storing all component and image files
		-> Chat.jsx - component organizing the layout of the chat itself, uses Message.jsx component
		-> Chat.css - component styling the various user and assistant textboxes
		-> Chatbox.css - component styling the design of the chatbox
		-> Message.jsx - component detailing the format of each specific message


## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Credits 

- Developers 
    Ivan Kisselev
    Mirela Lynch
    Tasdiq Bashar

- Adviors 
    Byron Richards
    Simon Anderson
