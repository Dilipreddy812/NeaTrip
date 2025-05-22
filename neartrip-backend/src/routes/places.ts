import express from 'express';
import { createClient } from '@supabase/supabase-js';

// Create router
const router = express.Router();

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Route to fetch all places
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('places')
      .select('*')
      .order('distance_km', { ascending: true });

    if (error) throw error;

    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

export default router;
