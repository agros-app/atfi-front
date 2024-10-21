This is AGRAS Project.

This project was built with Next.JS 14

## Key Folders:

public/:

    Static files like images, fonts, and icons that don’t need to be processed. These are accessible like <img src="/logo.png"/>

app/:

    Source code of application, where you can find all the pages and its corresponding stylesheets.

components/:

    Reusable UI components.

styles/:

    Global SCSS files (including base styles and variables) for styling.

lib/:

    Here are the controllers such as the API one. This allow us to have all the endpoints in just one place.

hooks/:

    Custom React hooks for organizing logic.

context/:

    React context files for global state management.

utils/:

    General utility functions.

## Standards

The standard we try to follow is following one:

Components

    ├── components/
    │   ├── component_name/
    │       ├── componentName.tsx
    │       ├── componentName.module.scss

You can add them to the page folder instead if the component is only used on that page

## Route Groups

We have 3 main route groups:

    - Auth: where all pages like login, register and complete-profile are included.

    - Landing: where all pages related to the marketing page are.

    - With-navbar: where all pages that has to have the navbar at the top are.
