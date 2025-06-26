
# Veritas: AI-Powered Search & Content Analysis Engine

> An intelligent search engine for personal blogs and articles, featuring AI-powered URL analysis and dynamic author portfolios.

Veritas is a modern, full-stack web application built with Next.js and powered by Google's Generative AI. It serves as a sophisticated search engine for personal blogs and articles, but goes a step further by offering intelligent content analysis tools. Users can not only search a curated database of articles but also process any URL from the web to classify its content type and generate a concise summary.

The project also features dynamic, beautifully designed portfolio pages for featured authors and designers, showcasing the versatility of the chosen tech stack.

![Veritas Homepage](https://storage.googleapis.com/aai-web-samples-test-exp-assets/veritas-screenshot.png)

## Key Features

-   **AI-Enhanced Search:** Search through a pre-populated database of over 200 articles. The search results page includes an AI-generated summary of the search query for providing context at a glance.
-   **Intelligent URL Processing:** Provide any URL and the application will:
    -   Fetch the content of the webpage.
    -   Classify it as a "Personal Blog," "Article," or "Other" using a Genkit flow.
    -   Generate a concise summary of the page's content.
-   **Dynamic Author/Designer Portfolios:** The application includes beautifully crafted, animated portfolio pages for "Aryan Mehra" and "Archita Saxena", which are triggered by specific search keywords.
-   **Interactive UI:** A sleek, modern interface built with ShadCN UI components and styled with Tailwind CSS, featuring a stunning animated galaxy background on the homepage created with Three.js.
-   **Server-Side AI with Genkit:** All generative AI functionality is handled by robust, server-side flows built with Google's Genkit, ensuring scalability and security.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit) (with Google's Gemini models)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **Animation:** [Framer Motion](https://www.framer.com/motion/) & [Three.js](https://threejs.org/)
-   **Deployment:** Firebase App Hosting (config in `apphosting.yaml`)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

### Environment Variables

To run the application, you'll need to set up your environment variables. Create a `.env` file in the root of the project and add the following:

```
GOOGLE_API_KEY=<Your_Google_AI_API_Key>
```

You can obtain a Google AI API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## Running the Application

This project uses `genkit` to run the AI flows and `next` for the frontend application. You'll need to run them in separate terminals.

1.  **Start the Genkit Server:**
    This command starts the Genkit server and watches for changes in your AI flow files.
    ```bash
    npm run genkit:watch
    ```

2.  **Start the Next.js Development Server:**
    In a separate terminal, run the following command to start the Next.js frontend.
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:9002`.

## Project Structure

```
.
├── src
│   ├── ai
│   │   ├── flows/         # Genkit flows for AI tasks
│   │   ├── genkit.ts      # Genkit configuration
│   │   └── dev.ts         # Genkit development server entrypoint
│   ├── app/               # Next.js App Router pages and layouts
│   ├── components/        # Reusable React components
│   │   ├── ui/            # ShadCN UI components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and data
│   └── ...
├── public/                # Static assets (images, fonts)
├── package.json           # Project dependencies and scripts
└── ...
```
