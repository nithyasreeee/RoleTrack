# 🚀 Deployment Guide - RoleTrack Backend

## Deployment Options

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- Heroku CLI installed
- Git repository initialized

#### Steps:

```bash
# 1. Login to Heroku
heroku login

# 2. Create Heroku app
heroku create roletrack-api

# 3. Add MongoDB addon (or use MongoDB Atlas)
heroku addons:create mongolab:sandbox

# 4. Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_super_secret_jwt_key_here
heroku config:set JWT_EXPIRE=7d
heroku config:set CORS_ORIGIN=https://your-frontend.vercel.app

# 5. If using MongoDB Atlas, set connection string
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/roletrack

# 6. Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# 7. Open your app
heroku open
```

**Your API will be available at:** `https://roletrack-api.herokuapp.com/api`

---

### Option 2: Railway

#### Steps:

1. **Go to Railway.app and sign in**
2. **Click "New Project" → "Deploy from GitHub repo"**
3. **Select your repository**
4. **Add Environment Variables:**
   - NODE_ENV: `production`
   - MONGODB_URI: `your_mongodb_atlas_connection_string`
   - JWT_SECRET: `your_secret_key`
   - JWT_EXPIRE: `7d`
   - CORS_ORIGIN: `https://your-frontend.vercel.app`
   - PORT: `5000`

5. **Deploy automatically**

**Your API will be available at:** Railway provides a custom URL

---

### Option 3: Render

#### Steps:

1. **Go to Render.com and sign in**
2. **Create New → Web Service**
3. **Connect GitHub repository**
4. **Configure:**
   - Name: `roletrack-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add Environment Variables (same as above)

5. **Deploy**

**Your API will be available at:** `https://roletrack-api.onrender.com/api`

---

### Option 4: DigitalOcean / AWS / VPS

#### Prerequisites
- Ubuntu server
- SSH access
- Domain name (optional)

#### Steps:

```bash
# 1. SSH into your server
ssh user@your-server-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install MongoDB (or use Atlas)
# Follow MongoDB installation guide for Ubuntu

# 4. Install PM2 (process manager)
sudo npm install -g pm2

# 5. Clone your repository
git clone https://github.com/yourusername/roletrack-backend.git
cd roletrack-backend

# 6. Install dependencies
npm install

# 7. Create .env file
nano .env
# Add all environment variables

# 8. Start with PM2
pm2 start server.js --name roletrack-api
pm2 save
pm2 startup

# 9. Install and configure Nginx (reverse proxy)
sudo apt install nginx
sudo nano /etc/nginx/sites-available/roletrack

# Add this configuration:
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# 10. Enable site
sudo ln -s /etc/nginx/sites-available/roletrack /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 11. Install SSL certificate (Let's Encrypt)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Your API will be available at:** `https://your-domain.com/api`

---

## MongoDB Atlas Setup (Cloud Database)

### Steps:

1. **Go to MongoDB Atlas** (cloud.mongodb.com)
2. **Create free cluster**
3. **Create database user:**
   - Username: `roletrack_user`
   - Password: `secure_password`
4. **Whitelist IP addresses:**
   - Add `0.0.0.0/0` (allow from anywhere) for development
   - Add specific IPs for production
5. **Get connection string:**
   ```
   mongodb+srv://roletrack_user:secure_password@cluster.mongodb.net/roletrack?retryWrites=true&w=majority
   ```
6. **Add to environment variables**

---

## Environment Variables Checklist

Before deploying, ensure these are set:

```env
✅ NODE_ENV=production
✅ PORT=5000
✅ MONGODB_URI=your_mongodb_connection_string
✅ JWT_SECRET=random_secure_string_at_least_32_chars
✅ JWT_EXPIRE=7d
✅ CORS_ORIGIN=https://your-frontend-domain.com
✅ RATE_LIMIT_WINDOW_MS=900000
✅ RATE_LIMIT_MAX_REQUESTS=100
```

---

## Post-Deployment Steps

### 1. Test API Health
```bash
curl https://your-api-domain.com/api/health
```

### 2. Create Admin User
```bash
curl -X POST https://your-api-domain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@roletrack.com",
    "password": "secure_admin_password",
    "role": "admin"
  }'
```

### 3. Update Frontend Environment
Update your React app's `.env` file:
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

### 4. Redeploy Frontend
```bash
# Vercel
vercel --prod

# Or commit and push (auto-deploy)
git add .
git commit -m "Update API URL"
git push
```

---

## Monitoring & Maintenance

### PM2 Commands (if using VPS)
```bash
# View logs
pm2 logs roletrack-api

# Restart app
pm2 restart roletrack-api

# Stop app
pm2 stop roletrack-api

# Monitor
pm2 monit
```

### Database Backups
```bash
# MongoDB backup
mongodump --uri="your_mongodb_uri" --out=/backup/$(date +%Y%m%d)

# Restore
mongorestore --uri="your_mongodb_uri" /backup/20240127
```

---

## SSL Certificate (HTTPS)

### Using Cloudflare (Free & Easy)
1. Add your domain to Cloudflare
2. Update nameservers
3. Enable "Full (Strict)" SSL mode
4. Automatic HTTPS

### Using Let's Encrypt (Free)
```bash
sudo certbot --nginx -d your-domain.com
# Auto-renewal is configured automatically
```

---

## Security Checklist

Before going live:

- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable HTTPS/SSL
- [ ] Set proper CORS_ORIGIN (no wildcards)
- [ ] Enable rate limiting
- [ ] Set up database authentication
- [ ] Restrict MongoDB IP whitelist
- [ ] Enable MongoDB encryption at rest
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Enable database backups
- [ ] Set up monitoring (UptimeRobot, Pingdom)
- [ ] Review and update dependencies regularly

---

## Troubleshooting

### API not responding
- Check server logs: `pm2 logs` or platform logs
- Verify environment variables
- Check database connection
- Verify PORT configuration

### CORS errors
- Verify CORS_ORIGIN includes frontend URL
- Check protocol (http vs https)
- Ensure no trailing slash in URLs

### MongoDB connection failed
- Check connection string format
- Verify database user credentials
- Check IP whitelist
- Test connection: `mongosh "your_connection_string"`

### 502 Bad Gateway (Nginx)
- Check if Node app is running: `pm2 status`
- Verify Nginx configuration
- Check firewall rules

---

## Performance Optimization

### Enable Compression
Add to `app.js`:
```javascript
const compression = require('compression');
app.use(compression());
```

### Database Indexing
Already configured in Employee schema for common queries

### Caching (Redis)
For high-traffic apps, consider adding Redis:
```bash
npm install redis
```

---

## Cost Estimates

### Free Tier Options:
- **Heroku**: Free (with sleep after 30min inactivity)
- **Railway**: $5/month credit free
- **Render**: Free tier available
- **MongoDB Atlas**: 512MB free cluster
- **Vercel Frontend**: Free

### Paid Options:
- **Heroku Hobby**: $7/month
- **DigitalOcean Droplet**: $6/month
- **MongoDB Atlas M10**: $57/month
- **AWS EC2 t2.micro**: ~$8/month

---

## Support

For deployment issues:
1. Check platform-specific documentation
2. Review error logs
3. Test locally with production environment variables
4. Contact platform support

Good luck with your deployment! 🚀
