# Deployment Guide for Portfolio Website

## Deploy to Netlify

### Option 1: Deploy via Netlify UI (Recommended for beginners)

1. **Build your project locally first:**
   ```bash
   npm run build
   ```

2. **Go to [Netlify](https://netlify.com) and sign up/login**

3. **Drag and Drop Method:**
   - Drag your entire project folder to the Netlify dashboard
   - Or drag just the `build` folder after running `npm run build`

4. **Git Integration Method (Recommended):**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy
   ```

4. **For production:**
   ```bash
   netlify deploy --prod
   ```

## Important Notes

- The `netlify.toml` file is already configured for React Router
- Your app uses React Router, so the redirect rule handles client-side routing
- All images are in the `public` folder and will be served correctly
- The backend API calls will need to be updated to use your deployed backend URL

## Custom Domain (Optional)

1. Go to your Netlify dashboard
2. Click on "Domain settings"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Environment Variables Setup

### Frontend (Netlify)
1. Go to Site settings > Environment variables
2. Add: `REACT_APP_API_URL` = Your deployed backend URL
3. Redeploy your site

### Backend (Heroku/Railway/Render)
1. Set environment variables in your backend deployment:
   - `EMAIL_USER` = Your email address
   - `EMAIL_PASS` = Your Gmail app password
   - `PORT` = (usually auto-set by platform)

### Local Development
1. Create `.env` file in root directory
2. Create `backend/.env` file
3. Follow the setup instructions in `SETUP.md`

## Troubleshooting

- If images don't load, check that the paths in `App.js` are correct
- If routing doesn't work, ensure the `netlify.toml` file is in your root directory
- If build fails, check the build logs in Netlify dashboard 