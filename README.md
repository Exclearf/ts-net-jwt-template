# [WIP] TS + ASP.Net REST Web API Example

# Work In Progress:

* Frontend
    * Fallback to login/signup screen when auth promise is rejected
    * Extract API routes to an .env file for possibility to have another backend
    * Extract all resource strings into separate file for translations
    * Clean the project
* Backend
    * Support different DBs
    * Extract hard-coded token lifetime into .env

## Info

This is just a simple template that can be used for greater things

Current the main tech used is:
1. React
2. UI Library: [shadcn](https://ui.shadcn.com/)
3. Redux for global auth state (persistence included!)

## How to set up

For the front end part you have to:
* Add `.env` to the root path of the front end
* Add `VITE_API_HOST` with the link to the backend
* Use `npm run dev` for livewatch and use `npm run build` to create a build


## Contributions/Ideas are appreciated