const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.set('view engine', 'ejs');

// Helper function to read content
function getContent() {
  const data = fs.readFileSync('data/content.json', 'utf8');
  return JSON.parse(data);
}

// Helper function to write content
function saveContent(content) {
  fs.writeFileSync('data/content.json', JSON.stringify(content, null, 2));
}

// Routes

// Home page
app.get('/', (req, res) => {
  const content = getContent();
  res.render('index', { content });
});

// Article detail page
app.get('/article/:id', (req, res) => {
  const content = getContent();
  const article = content.articles.find(a => a.id == req.params.id);
  if (!article) {
    return res.status(404).send('Artikel nicht gefunden');
  }
  res.render('article', { article, content });
});

// Admin page
app.get('/admin', (req, res) => {
  const content = getContent();
  res.render('admin', { content });
});

// Update site info
app.post('/admin/update-site', (req, res) => {
  const content = getContent();
  content.siteName = req.body.siteName;
  content.welcomeText = req.body.welcomeText;
  content.description = req.body.description;
  saveContent(content);
  res.redirect('/admin');
});

// Add new article
app.post('/admin/add-article', upload.single('image'), (req, res) => {
  const content = getContent();
  const newId = content.articles.length > 0 
    ? Math.max(...content.articles.map(a => a.id)) + 1 
    : 1;
  
  const newArticle = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.file ? '/uploads/' + req.file.filename : '',
    date: new Date().toISOString().split('T')[0]
  };
  
  content.articles.push(newArticle);
  saveContent(content);
  res.redirect('/admin');
});

// Edit article
app.post('/admin/edit-article/:id', upload.single('image'), (req, res) => {
  const content = getContent();
  const articleIndex = content.articles.findIndex(a => a.id == req.params.id);
  
  if (articleIndex !== -1) {
    content.articles[articleIndex].title = req.body.title;
    content.articles[articleIndex].content = req.body.content;
    
    if (req.file) {
      // Delete old image if exists
      if (content.articles[articleIndex].image) {
        const oldImagePath = path.join(__dirname, content.articles[articleIndex].image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      content.articles[articleIndex].image = '/uploads/' + req.file.filename;
    }
    
    saveContent(content);
  }
  
  res.redirect('/admin');
});

// Delete article
app.post('/admin/delete-article/:id', (req, res) => {
  const content = getContent();
  const articleIndex = content.articles.findIndex(a => a.id == req.params.id);
  
  if (articleIndex !== -1) {
    // Delete associated image if exists
    if (content.articles[articleIndex].image) {
      const imagePath = path.join(__dirname, content.articles[articleIndex].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    content.articles.splice(articleIndex, 1);
    saveContent(content);
  }
  
  res.redirect('/admin');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
