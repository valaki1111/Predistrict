const express = require('express');
const { calculatePrizeDistribution } = require('./logic'); // Ha van ilyen modulod

const app = express();
app.use(express.json());

// Statikus fájlokat szolgálunk ki a 'public' mappából (ahol az index.html és logo.png van)
app.use(express.static('public'));

// A csomagok adatstruktúrája - ez kerül vissza az API-n keresztül
const packages = {
  monthly: [
    { questions: 4, price: 15, description: "Questions valid for the entire month" },
    { questions: 5, price: 25 },
    { questions: 6, price: 30 },
    { platformFee: "15%" }
  ],
  weekly: [
    { questions: 5, price: 15, description: "Questions valid for the week only" },
    { questions: 7, price: 25 },
    { platformFee: "25%" },
    { note: "Available only after purchasing a monthly package" }
  ],
  emergency: [
    { questions: 5, price: 10, description: "Valid for 1 month" },
    { note: "Use anytime during the month" }
  ]
};

// Végpont a csomagok lekérésére
app.get('/api/packages', (req, res) => {
  res.json(packages);
});

// Számítás végpontja
app.post('/calculate', (req, res) => {
  const { packageType, totalRevenue } = req.body;
  const result = calculatePrizeDistribution(packageType, totalRevenue);
  res.json(result);
});

// Alapértelmezett root útvonal (index.html)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
