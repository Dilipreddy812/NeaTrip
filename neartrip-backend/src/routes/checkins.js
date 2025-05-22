// src/routes/checkins.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const toRad = v => (v * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

router.post('/', async (req, res) => {
  const { user_id, place_id, latitude, longitude, caption } = req.body;

  if (!user_id || !place_id || !latitude || !longitude) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data: placeData, error: placeError } = await supabase
    .from('places')
    .select('location')
    .eq('id', place_id)
    .single();

  if (placeError || !placeData) return res.status(400).json({ error: 'Invalid place ID' });

  const [placeLng, placeLat] = placeData.location.coordinates;
  const distance = calculateDistanceMeters(latitude, longitude, placeLat, placeLng);
  if (distance > 500) {
    return res.status(403).json({ error: 'Too far from the place (limit 500m)' });
  }

  const today = new Date().toISOString().split('T')[0];
  const { data: existingCheckin } = await supabase
    .from('checkins')
    .select('*')
    .eq('user_id', user_id)
    .eq('place_id', place_id)
    .gte('checked_in_at', today)
    .maybeSingle();

  if (existingCheckin) {
    return res.status(429).json({ error: 'Already checked in today' });
  }

  const { error: insertError } = await supabase.from('checkins').insert([
    {
      user_id,
      place_id,
      caption,
      checked_in_at: new Date().toISOString(),
    },
  ]);

  if (insertError) {
    return res.status(500).json({ error: insertError.message });
  }

  return res.json({ success: true, message: 'Check-in recorded!' });
});

module.exports = router;
