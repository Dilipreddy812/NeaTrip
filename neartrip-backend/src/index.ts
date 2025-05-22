import express from 'express'; // Default import for express()
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); // This is an Application instance
app.use(cors());
app.use(express.json());

import placesRouter from './routes/places'; // This should be an ExpressRouter instance
app.use('/api/places', placesRouter); // Correct usage: app.use(path, router)
app.get('/', (req, res) => {
  res.send('🛠️ NearTrip API is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));