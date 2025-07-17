import express from 'express';
import { supabase } from '../lib/supabase';

// Create router
const router = express.Router();

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
