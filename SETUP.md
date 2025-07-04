# Environment Setup Instructions

## Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp env.example .env
   ```

4. **Edit .env file with your credentials:**
   ```env
   EMAIL_USER=iamayushsingh42@gmail.com
   EMAIL_PASS=lchz dspc unjh gpmu
   PORT=5000
   ```

## Frontend Setup

1. **Navigate to root folder:**
   ```bash
   cd ..
   ```

2. **Create .env file:**
   ```bash
   cp env.example .env
   ```

3. **Edit .env file:**
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

## For Production Deployment

### Netlify Environment Variables

1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add the following variables:
   - `REACT_APP_API_URL` = Your deployed backend URL

### Backend Deployment (Heroku/Railway/Render)

1. Deploy your backend to your preferred platform
2. Set environment variables in your backend deployment:
   - `EMAIL_USER` = Your email
   - `EMAIL_PASS` = Your app password
   - `PORT` = (usually auto-set by platform)

## Security Notes

- Never commit .env files to git
- Use app passwords for Gmail (not your regular password)
- Keep your credentials secure
- The .env files are already in .gitignore

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an app password for your application
4. Use that app password in your .env file 