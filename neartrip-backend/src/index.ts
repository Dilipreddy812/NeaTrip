import express from 'express'; // Default import for express()
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); // This is an Application instance

// CORS configuration
const corsOptions = {
  origin: [
    'https://nea-trip.vercel.app',
    'http://localhost:5173'
  ],
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // enable pre-flight

app.use(express.json());

import placesRouter from './routes/places'; // This should be an ExpressRouter instance
import feedRouter from './routes/feed';
app.use('/api/places', placesRouter); // Correct usage: app.use(path, router)
app.use('/api/feed', feedRouter);
app.get('/', (req, res) => {
  res.send('🛠️ NearTrip API is running!');
});

const checkinsRouter = require('./routes/checkins');
app.use('/api/checkins', checkinsRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));