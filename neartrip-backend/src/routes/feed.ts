import express from 'express';
import { supabase } from '../lib/supabase';

// Create router
const router = express.Router();

// Route to fetch all check-ins for the feed
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const { data, error } = await supabase
      .from('checkins')
      .select(`
        *,
        profiles:user_id ( username, avatar_url ),
        places ( name, location_short )
      `)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;

    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Unexpected error' });
  }
});

export default router;
