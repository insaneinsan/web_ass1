const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const Survey = require('./models/Survey');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/online_survey_db';

// Connect to MongoDB once when the server starts.
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error.message));

// Basic Express setup.
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // Read form data (no AJAX)
app.use(express.static(path.join(__dirname, 'public')));

// Redirect the home page to the survey form.
app.get('/', (req, res) => {
  res.redirect('/survey');
});

// 1) Survey form page
app.get('/survey', (req, res) => {
  res.render('survey-form');
});

// Save survey response and redirect to thank-you page.
app.post('/survey', async (req, res) => {
  try {
    const { ageGroup, gender, country, preferredDevice, satisfaction } = req.body;

    // Very simple validation for beginner-friendly readability.
    if (!ageGroup || !gender || !country || !preferredDevice || !satisfaction) {
      return res.status(400).send('All fields are required.');
    }

    await Survey.create({
      ageGroup,
      gender,
      country,
      preferredDevice,
      satisfaction: Number(satisfaction)
    });

    // 2) Thank-you page
    res.redirect('/thank-you');
  } catch (error) {
    console.error('Error saving survey:', error.message);
    res.status(500).send('Something went wrong while saving your response.');
  }
});

app.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

// Helper function: get grouped count data from MongoDB for charts.
async function getGroupedData(fieldName) {
  const results = await Survey.aggregate([
    {
      $group: {
        _id: `$${fieldName}`,
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  return results.map((item) => ({
    label: item._id,
    count: item.count
  }));
}

// 3) Bar chart page (satisfaction 1 to 5)
app.get('/charts/bar', async (req, res) => {
  try {
    const data = await getGroupedData('satisfaction');
    res.render('bar-chart', { chartData: data });
  } catch (error) {
    console.error('Bar chart error:', error.message);
    res.status(500).send('Unable to load bar chart.');
  }
});

// 4) Pie chart page (preferred device)
app.get('/charts/pie', async (req, res) => {
  try {
    const data = await getGroupedData('preferredDevice');
    res.render('pie-chart', { chartData: data });
  } catch (error) {
    console.error('Pie chart error:', error.message);
    res.status(500).send('Unable to load pie chart.');
  }
});

// 5) Map chart page (responses by country)
app.get('/charts/map', async (req, res) => {
  try {
    const data = await getGroupedData('country');
    res.render('map-chart', { mapData: data });
  } catch (error) {
    console.error('Map chart error:', error.message);
    res.status(500).send('Unable to load map chart.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
