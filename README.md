# gleep-corral
Another fullstack project utilizing a variety of technologies I've used to some degree or would like to explore — this came to me in a vision

## Project Overview
This system is comprised of these components:
- Web application (frontend logic and API calls)
- Gemini models (content generation)
- Firebase (user authentication, textual data storage, and webapp deployment)
- Cloudflare R2 (visual data storage)

Users will first be brought to the webapp's main page where they can generate a "gleep" (silly animal). Gleeps come in one of three rarities based on the number of identical slot symbols that are produced when the slot machine is used — once a gleep is made, the user can then save the gleep to their compendium (with potentially other gleeps), and can be retrieved at a later time.


Here is an abstraction of the major project flows that the above text describes:
<img width="948" height="542" alt="Screenshot 2025-06-23 at 1 20 41 PM" src="https://github.com/user-attachments/assets/51c0f68e-16b7-4463-86f2-a26223b6ec05" />


## Technologies Used
- Typescript + Next.JS
- Google Gemini Flash 2.5
- Google Gemini 2.0 Flash Preview Image Generation
- Firebase
    - Studio
    - App Hosting
    - Authentication
    - Firestore

## Project Timeline and Obstacles Breakdown
Task | Notes | Resolved?
--- | --- | ---
~~Set up new Raspberry Pi~~ | - | ~~✅~~
Set up Python environment | RPi (and Python, subsequently) not needed | ❎
Set up new Firebase project | - | ✅
Create slot machine graphic | - | ✅
Create slot machine spin animation | - | ✅
Create Firestore database and R2 bucket | in progress | -
Get API key(s) for Gemini models | generated it ages ago, just never added it | ✅
Add API calls to card component | - | -

