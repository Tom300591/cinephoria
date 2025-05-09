const express = require('express');
const path = require('path');
const app = express();

// Chemin vers le build Angular
const distFolder = path.join(__dirname, 'dist/cinephoria-frontend/browser');

app.use(express.static(distFolder));

// Rediriger toutes les routes vers index.html (Angular router)
app.get('*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Cinephoria frontend is running on port ${PORT}`);
});
