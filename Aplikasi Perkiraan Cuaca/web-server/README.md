# Aplikasi Cek Cuaca & Berita

Aplikasi web untuk melihat prakiraan cuaca dan berita terkini menggunakan Node.js, Express, dan Handlebars.

## 🚀 Fitur

- ✅ Cek cuaca berdasarkan lokasi (menggunakan Mapbox & Weatherstack API)
- ✅ Berita terkini dari berbagai kategori (menggunakan Mediastack API)
- ✅ Filter berita berdasarkan kategori dan negara
- ✅ Responsive design
- ✅ Fallback data jika API gagal

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>
cd web-server

# Install dependencies
npm install

# Copy file .env.example ke .env dan isi dengan API keys Anda
cp .env.example .env
```

## 🔑 API Keys

Aplikasi ini memerlukan API keys dari:

1. **Mediastack** - https://mediastack.com/
2. **Mapbox** - https://www.mapbox.com/
3. **Weatherstack** - https://weatherstack.com/

Masukkan API keys ke file `.env`:

```
MEDIASTACK_KEY=your_key_here
MAPBOX_TOKEN=your_token_here
WEATHERSTACK_KEY=your_key_here
PORT=4000
NODE_ENV=development
```

## 🏃 Menjalankan Aplikasi

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

Server akan berjalan di `http://localhost:4000`

## 📚 Endpoints

- `GET /` - Halaman utama
- `GET /berita` - Halaman berita
- `GET /berita/api` - API berita (query: category, country)
- `GET /infocuaca` - API cuaca (query: address)
- `GET /tentang` - Halaman tentang
- `GET /bantuan` - Halaman bantuan

## 🌐 Deployment

### 1. Heroku

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MEDIASTACK_KEY=your_key
heroku config:set MAPBOX_TOKEN=your_token
heroku config:set WEATHERSTACK_KEY=your_key
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### 2. Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables di dashboard Vercel
```

### 3. Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Set environment variables
railway variables set MEDIASTACK_KEY=your_key
railway variables set MAPBOX_TOKEN=your_token
railway variables set WEATHERSTACK_KEY=your_key
```

### 4. Render

1. Buat akun di https://render.com
2. Connect repository GitHub
3. Pilih "Web Service"
4. Set Build Command: `npm install`
5. Set Start Command: `npm start`
6. Tambahkan environment variables di dashboard

### 5. VPS/Server Sendiri

```bash
# SSH ke server
ssh user@your-server-ip

# Install Node.js (jika belum)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone <your-repo>
cd web-server

# Install dependencies
npm install

# Install PM2 untuk process manager
sudo npm install -g pm2

# Start aplikasi
pm2 start src/server.js --name "weather-app"

# Auto-restart saat server reboot
pm2 startup
pm2 save

# Setup Nginx sebagai reverse proxy (optional)
sudo apt install nginx
# Configure nginx untuk proxy ke localhost:4000
```

## 📁 Struktur Folder

```
web-server/
├── public/              # Static files (CSS, JS, images)
│   ├── css/
│   ├── js/
│   └── img/
├── src/
│   ├── app.js          # Express app configuration
│   ├── server.js       # Server entry point
│   └── utils/          # Utility functions
│       ├── berita.js
│       ├── geocode.js
│       └── prediksiCuaca.js
├── templates/
│   ├── views/          # Handlebars pages
│   └── partials/       # Reusable components
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Teknologi

- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **Handlebars (HBS)** - Template engine
- **Mediastack API** - News data
- **Mapbox API** - Geocoding
- **Weatherstack API** - Weather data

## 📝 Catatan

- Aplikasi menggunakan fallback mock data jika API gagal atau quota habis
- Free tier API biasanya memiliki rate limit
- Untuk production, pertimbangkan caching dan rate limiting

## 👤 Author

Faza Azka M.

## 📄 License

ISC
