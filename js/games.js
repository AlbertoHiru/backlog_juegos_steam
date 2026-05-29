import { supabase } from "./supabase.js";

let gamesData = [];

async function loadGames() {
    const { data, error } = await supabase
        .from('juegos')
        .select('*')
        .order('nombre', { ascending: true });

    if (error) {
        console.error('Error al cargar los juegos:', error.message);
        return [];  
    }

    gamesData = data;
    return gamesData;
}


async function changeGameStatus(id, newStatus) {
  const updates = { estado: newStatus };

  if (newStatus === 'en-progreso') {
    updates.fecha_inicio = getTodayDate();
    updates.fecha_completado = null;
  } else if (newStatus === 'completado') {
    updates.fecha_completado = getTodayDate();
  } else {
    updates.fecha_inicio = null;
    updates.fecha_completado = null;
  }

  const { error } = await supabase
    .from('juegos')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('Error al actualizar:', error.message);
    return;
  }

  // Refrescar datos locales
  await loadGames();
  
}

function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

 export { gamesData, loadGames, changeGameStatus, getTodayDate }   