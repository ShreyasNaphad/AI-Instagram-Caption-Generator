**A premium, AI-powered Instagram Caption and Hashtag Generator using React, TypeScript, and the Groq API (Llama 3.1 8b).**

Key Features
AI-Powered Content: Generates 5 trendy captions and 10 trending hashtags based on user context.
Tone Selection: Support for multiple tones (Aesthetic, Funny, Travel, Motivational, Professional).
Premium UI: Minimal layout with glassmorphism, soft gradients, and rounded cards.

Frontend Architecture
Vite + React + TS: Modern setup for fast development and type safety.
State Management: React useState for handling UI states and API data.
Styling: Vanilla CSS with custom properties for a professional design system.
API Integration
Groq SDK: Efficiently communicating with Llama 3.1 8b.
Prompt Engineering: Tailored prompts for captions and hashtags to ensure high-quality output.
GitHub Repository

How to Run

Install dependencies:
npm install
Set up environment variables:
Copy 
.env.example
 to 
.env
Add your VITE_GROQ_API_KEY to the 
.env file.
Run the development server:
npm run dev
Open http://localhost:5173 in your browser.
Verification Results
Logic: The API integration is correctly set up to use the user's input and selected tone.
UI: Implemented responsive design with premium aesthetics.
Functionality: Included "Copy" buttons for both captions and hashtags.
