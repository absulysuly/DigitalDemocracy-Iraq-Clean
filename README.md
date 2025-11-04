# Digital Diwan - Iraqi Social Election Platform (Next.js 14)

This is a modern, multilingual (English, Arabic, Kurdish), and responsive web application for fostering civic engagement around the Iraqi elections, built with Next.js 14 and the App Router.

## Getting Started

### 1. Install Dependencies

If you have made changes to `package.json` or are setting up for the first time, run:

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🚀 Final Deployment Checklist (Cloudflare Pages)

You're ready to deploy! The project is in great shape. Follow these steps carefully, and your Digital Diwan will be live.

### Pre-Flight Check
1.  **Final Code Push**: Make sure all your latest code changes are pushed to your main branch on GitHub.
2.  **Get Your API Keys Ready**: You will need two critical pieces of information. Have them ready in a notepad:
    *   `NEXT_PUBLIC_API_BASE_URL`: This is the full URL to your deployed backend API (e.g., `https://your-backend-api.up.railway.app`).
    *   `API_KEY`: This is your Google Gemini API Key for generating AI posts.

### Deployment Steps on Cloudflare

1.  **Connect to GitHub**:
    *   Log in to your Cloudflare dashboard.
    *   Go to **Workers & Pages** and click **Create application**.
    *   Select the **Pages** tab and click **Connect to Git**.
    *   Choose your project's GitHub repository and click **Begin setup**.

2.  **Configure Build & Deploy Settings**:
    *   **Project name**: Give your project a name (e.g., `digital-diwan`).
    *   **Production branch**: Select your main branch (`main` or `master`).
    *   **Framework preset**: Select **Next.js** from the dropdown. Cloudflare will automatically set the build command and output directory for you. It should look like this:
        *   **Build command**: `npm run build`
        *   **Build output directory**: `.next`
    
3.  **Add Environment Variables (Most Important Step!)**:
    *   Scroll down to **Environment variables (advanced)**.
    *   Click **Add variable** for each of the following. Be very careful with the names and values.

    | Variable Name              | Value                                         | Type   |
    | -------------------------- | --------------------------------------------- | ------ |
    | `NEXT_PUBLIC_API_BASE_URL` | *Paste your backend API URL here*             | Plain  |
    | `API_KEY`                  | *Paste your Google Gemini API Key here*       | Secret |
    | `NODE_VERSION`             | `20`                                          | Plain  |

    *   **Note**: Mark `API_KEY` as `Secret` by clicking the "Encrypt" button. This keeps it secure.

4.  **Deploy!**
    *   Click the **Save and Deploy** button.
    *   Cloudflare will now pull your code from GitHub, build the project, and deploy it. You can watch the progress in the deployment logs.

5.  **Celebrate!**
    *   Once the deployment is finished, Cloudflare will give you a unique URL (e.g., `digital-diwan.pages.dev`). Your application is now live!

Cloudflare will automatically redeploy your site every time you push new changes to your connected branch. You've got this!
