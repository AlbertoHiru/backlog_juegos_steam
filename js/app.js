
// Estado global
let filteredGames = [];
let currentFilter = 'todos';
let currentCategory = null;
let searchTerm = '';

import { gamesData, loadGames, changeGameStatus } from './games.js';

// Renderizar tarjetas de juegos mejoradas
function renderGames() {
    const container = document.getElementById('games-list');
    
    // Aplicar filtros
    filteredGames = gamesData.filter(game => {
        const matchFilter = currentFilter === 'todos' || game.estado === currentFilter;
        const matchCategory = !currentCategory || game.categoria === currentCategory;
        const matchSearch = game.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        return matchFilter && matchCategory && matchSearch;
    }).sort((a, b) => {
        if (currentCategory) {
        return a.horas - b.horas;       // orden por horas si hay categoría activa
        }
        return a.nombre.localeCompare(b.nombre); // orden alfabético en cualquier otro caso
        });
    
    if (filteredGames.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <div class="empty-state">
                    <div class="empty-state-icon"></div>
                
                <img src="assets/img/apex.jpg" alt="apex" class="w-400 h-50 rounded-md object-cover">
               
                    <div class="empty-state-title">Sin juegos</div>
                    <div>No hay juegos que coincidan con tus filtros</div>
                </div>
            </div>
        `;
        return;
    }
    
    const gamesHTML = filteredGames.map(game => {
        
        
        const hoursMax = 100;
        const hoursPercent = Math.min((game.horas / hoursMax) * 100, 100);
        
        return `
            <div class="game-card">
                <div class="game-cover-wrapper">
                    <img src="${game.imagen || ''}" alt="${game.nombre}" class="game-cover" loading="lazy" onerror="this.parentElement.classList.add('cover-broken')">
                </div>
                <div class="game-info-wrapper">
                    <div class="game-header">
                        <h3 class="game-title">${game.nombre}</h3>
                        <div class="game-badges">
                            <span class="badge badge-categoria">
                                ${game.categoria === 'corto' ? '⚡' : game.categoria === 'medio' ? '🎯' : '🏆'}
                                ${game.categoria}
                            </span>
                            <span class="badge badge-estado ${game.estado}">
                                ${game.estado === 'pendiente' ? '📋 Pendiente' : game.estado === 'en-progreso' ? '▶️ En progreso' : '✅ Completado'}
                            </span>
                            <div class="status-buttons">
                            <button class="status-btn ${game.estado === 'en-progreso' ? 'active' : ''}" data-id="${game.id}" data-status="en-progreso">▶️</button>
                            <button class="status-btn ${game.estado === 'pendiente' ? 'active' : ''}" data-id="${game.id}" data-status="pendiente">📋</button>
                            <button class="status-btn ${game.estado === 'completado' ? 'active' : ''}" data-id="${game.id}" data-status="completado">✅</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="game-body">
                        <div class="game-hours">
                            <span class="hours-label">Horas estimadas:</span>
                            <span class="hours-value">~${game.horas}h</span>
                        </div>
                        <div class="hours-bar">
                            <div class="hours-fill" style="width: ${hoursPercent}%;"></div>
                        </div>
                    </div>
                    
                    <div class="game-footer">
                        ${game.estado === 'en-progreso' && game.fecha_inicio ? `<span>🎮 Jugando desde: ${game.fecha_inicio}</span>` : ''}
                        ${game.estado === 'completado' && game.fecha_completado ? `<span>✅ Completado: ${game.fecha_completado}</span>` : ''}
                        ${game.estado === 'pendiente' ? '<span>📌 No iniciado</span>' : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = gamesHTML;
}

// Actualizar estadísticas
function updateStats() {
    const total = gamesData.length;
    const pending = gamesData.filter(g => g.estado === 'pendiente').length;
    const inProgress = gamesData.filter(g => g.estado === 'en-progreso').length;
    const completed = gamesData.filter(g => g.estado === 'completado').length;
    const totalHours = gamesData.reduce((sum, g) => sum + g.horas, 0);
    
    document.getElementById('total-games').textContent = total;
    document.getElementById('pending-games').textContent = pending;
    document.getElementById('in-progress-games').textContent = inProgress;
    document.getElementById('completed-games').textContent = completed;
    document.getElementById('total-hours').textContent = totalHours;
}

/* ============================================================
   setFilter(filter) - función central para cambiar filtro
   Se llama desde el sidebar o desde las stats cards.
   Recibe el nombre del filtro: 'todos', 'pendiente', etc.
   ============================================================ */
function setFilter(filter) {
    currentFilter = filter;
    currentCategory = null;

    // Quitar active de todos, luego marcar el que corresponde
    document.querySelectorAll('[data-filter], [data-category]').forEach(el => el.classList.remove('active'));

    // Marcar tanto en sidebar como en stats cards
    document.querySelectorAll(`[data-filter="${filter}"]`).forEach(el => el.classList.add('active'));

    renderGames();
    closeSidebarMobile();
}

function setupNavigation() {
    // Click en filtros del sidebar
    document.querySelectorAll('.sidebar-nav [data-filter]').forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    // Click en filtros de categoría del sidebar
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            currentFilter = 'todos';

            document.querySelectorAll('[data-filter], [data-category]').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');

            renderGames();
            closeSidebarMobile();
        });
    });

    // Click en las stats cards (Pendientes, En Progreso, Completados)
    document.querySelectorAll('.stats-container [data-filter]').forEach(card => {
        card.addEventListener('click', () => setFilter(card.dataset.filter));
    });
}

// Búsqueda en tiempo real
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value;
        renderGames();
    });
}

// Toggle sidebar
function setupMobileToggle() {
    const toggleBtn = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        document.body.classList.toggle('sidebar-open');
    });
}

function closeSidebarMobile() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('open');
    document.body.classList.remove('sidebar-open');
}

// Función principal que inicia todo
async function init() {
    await loadGames();
    updateStats();
    renderGames();
    setupNavigation();
    setupSearch();
    setupMobileToggle();
}

// Ejecutar cuando el HTML esté listo
document.addEventListener('DOMContentLoaded', init); 

document.getElementById('games-list').addEventListener('click', async (e) => {
    if (e.target.classList.contains('status-btn')) {
        const id = parseInt(e.target.dataset.id);
        const newStatus = e.target.dataset.status;
        await changeGameStatus(id, newStatus);
        updateStats();
        renderGames();
    }

 

});