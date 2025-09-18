# [Gleep Corral](https://gleep-corral.web.app/)
Another fullstack project utilizing a variety of technologies I've used to some degree or would like to explore

## Project Overview
This system is comprised of the following components:
- Web application (frontend logic and API calls to backend)
- Backend proxy (calls to AI generation services)
- Text + Image generation models
- Firebase (webapp deployment)

Users will first be brought to the webapp's main page where they can generate a "gleep" (silly animal). Gleeps come in one of three rarities based on the number of identical slot symbols that are produced when the slot machine is used — once a gleep is made, the user can optionally save them to their computer.

Here is an abstraction of the major project flows that the above text describes:
<img width="948" height="542" alt="Screenshot 2025-06-23 at 1 20 41 PM" src="https://github.com/user-attachments/assets/51c0f68e-16b7-4463-86f2-a26223b6ec05" />

## Technologies Used
- Typescript + Next.JS
- Google Gemini Flash 2.5
- Cloudflare Workers AI
- Supabase Edge Functions
- Firebase
    - Studio
    - App Hosting
 
## Note
Cloud storage was secondarily considered when originally brainstorming this project, and as development went on, I decided that that feature/subsystem could be dropped since it wasn't core to the project.
Though doable, my idea was just to generate cards to get familiar with AI usage and
- setting up authentication and authorization to
- save and store card info to
- cloud servers across several platforms (Cloudflare R2 + Cloud Firestore/Supabase DB)

seemed like it would detract from the purpose I want this project to have, and I don't really plan on expanding the project into something greater since I have other ideas I want to work on :]

## Project Timeline and Obstacles Breakdown
Task | Notes | Resolved?
--- | --- | ---
~~Set up new Raspberry Pi~~ | - | ~~✅~~
Set up Python environment | RPi (and Python, subsequently) not needed | ❎
Set up new Firebase project | - | ✅
Create slot machine graphic | - | ✅
Create slot machine spin animation | - | ✅
Get API key(s) for Gemini models | generated it ages ago, just never added it | ✅
Hide API key calling | After some research, found that Supabase has a generous free tier for Edge (Cloud) Functions and made that my calling backend B^) | ✅
Add API calls to card component for text | phew | ✅
Refine text prompts to return exactly one result | No thinking budget sometimes results in bizarre responses, but that'll be a feature and not a bug ;) | ✅
Deploy app via Firebase hosting | Mystery build error fixed | ✅
Figure out how to call flux-1-schnell model | [documentation](https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/) my beloved | ✅ 
Add API calls to card component for images | - | ✅
Create R2 bucket | functionality dropped | ❎
Create Firestore/Supabase database | functionality dropped | ❎
Add Base64 data -> image conversion | in progress | -
Add means of downloading card | | -
Publish complete release | | -


