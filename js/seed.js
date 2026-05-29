// js/seed.js
import { supabase } from './supabase.js';

async function seed() {
  const response = await fetch('/data/games.json');
  const juegos = await response.json();

  console.log(`📦 ${juegos.length} juegos encontrados, insertando...`);

  const { data, error } = await supabase
    .from('juegos')
    .insert(juegos);

  if (error) {
    console.error('❌ Error al insertar:', error.message);
    return;
  }

  console.log('✅ Seed completado!', data);
}

seed();