# Deployment Guide: TIP App on Vercel

## 1. Why Single Repository?
You mentioned wanting two separate sites. However, since this is a Single Page Application (React), the most efficient way is to deploy **one repository** that handles both views via URL:
- **Guest App**: `your-app.vercel.app/`
- **Admin Panel**: `your-app.vercel.app/admin`

This keeps your code synced and easier to manage.

## 2. Push to GitHub
1.  Initialize Git (if not done):
    ```bash
    git init
    git add .
    git commit -m "Final Deploy Ready"
    ```
2.  Create a new repository on [GitHub.com](https://github.com/new).
3.  Link and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## 3. Deploy to Vercel
1.  Go to [Vercel.com](https://vercel.com) and log in.
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository.
4.  **Important Setting**:
    -   **Framework Preset**: Vite
    -   **Root Directory**: `./` (default)
    -   **Build Command**: `npm run build` (default)
    -   **Output Directory**: `dist` (default)
5.  Click **Deploy**.

## 4. Admin Access
Once deployed, your admin panel will be at:
`https://your-project-name.vercel.app/admin`

**Note:** `localStorage` data (Waiters, Transactions) is stored on the *device*. If you access the Admin Panel from a different device than where transactions happened, you won't see them. For a real production app with centralized data, you would need a backend implementation (Firebase/Supabase).
