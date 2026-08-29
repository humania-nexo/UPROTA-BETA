/**
 * EmojisEngine — UPROTA v1.0
 * Gestor del Catálogo Maestro de 200 Emojis Pixel Art del Yermo.
 * Creados por: Pix (Artista Técnico)
 * Integrado por: Nexo (Arquitecto de Software)
 */

export class EmojisEngine {
  static manifest = null;

  static async cargarManifest() {
    if (this.manifest) return this.manifest;
    try {
      const res = await fetch('assets/sprites/emojis/emojis_manifest.json');
      if (res.ok) {
        this.manifest = await res.json();
      }
    } catch (e) {
      console.warn('No se pudo cargar emojis_manifest.json:', e);
    }
    return this.manifest;
  }

  static obtenerRuta(id, categoria = 'habitos') {
    return  `assets/sprites/emojis/${categoria}/${id}.png`;
  }

  static renderImg(ruta, alt = '') {
    return `<img src="${ruta}" alt="${alt}" class="emoji-pixel">`;
  }
}

export class ModalSelectorGlifos {
  static manifest = null;
  static categoriaActiva = 'habitos';

  static async abrir(onSeleccionar, iconoActual = null) {
    if (!this.manifest) {
      this.manifest = await EmojisEngine.cargarManifest();
    }

    let glifosContainer = document.getElementById('modal-glifos-container');
    if (!glifosContainer) {
      glifosContainer = document.createElement('div');
      glifosContainer.id = 'modal-glifos-container';
      glifosContainer.className = 'modal-overlay';
      glifosContainer.style.zIndex = '1100';
      glifosContainer.innerHTML = `<div class="modal-card" id="modal-glifos-content" style="max-width: 440px; max-height: 85vh; display: flex; flex-direction: column;"></div>`;
      document.body.appendChild(glifosContainer);
    }

    const modalContent = glifosContainer.querySelector('#modal-glifos-content');
    this.renderSelector(modalContent, onSeleccionar, glifosContainer);
    glifosContainer.classList.remove('hidden');
  }

  static renderSelector(modalContent, onSeleccionar, container) {
    const cats = [
      { id: 'habitos', label: '🏃 Hábitos' },
      { id: 'emociones', label: '🎭 Estados' },
      { id: 'naturaleza', label: '🌲 Naturaleza' },
      { id: 'objetos', label: '🎒 Objetos' }
    ];

    const lista = (this.manifest?.categories && this.manifest.categories[this.categoriaActiva]) || [];

    modalContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="assets/sprites/ui/ico_info.png" alt="Glifos" class="pixel-icon icon-20">
          <h3 style="font-size: 1.05rem; color: var(--oro-torta-glow); margin: 0;">Elegir Figura Pixel Art</h3>
        </div>
        <button id="btn-cerrar-glifos" class="modal-close-btn" style="position: static; font-size: 1.4rem;">&times;</button>
      </div>

      <!-- PESTAÑAS DE CATEGORÍAS -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-bottom: 10px;">
        ${cats.map(c => `
          <button type="button" class="btn-tab-cat ${c.id === this.categoriaActiva ? 'active' : ''}" data-cat="${c.id}" style="
            background: ${c.id === this.categoriaActiva ? 'var(--oro-torta)' : 'var(--bg-surface)'};
            color: ${c.id === this.categoriaActiva ? '#000' : 'var(--text-secondary)'};
            border: 1px solid var(--border-subtle);
            border-radius: var(--radius-sm);
            padding: 6px 2px;
            font-size: 0.72rem;
            font-weight: 600;
            cursor: pointer;
            text-align: center;
          ">
            ${c.label}
          </button>
        `).join('')}
      </div>

      <!-- BUSCADOR RÁPIDO -->
      <input type="text" id="input-buscar-glifo" class="card-yermo" placeholder="Buscar glifo (ej: agua, fuego, libro, pesas)..." style="width: 100%; padding: 6px 8px; font-size: 0.78rem; margin-bottom: 10px; color: #fff; background: var(--bg-surface);">

      <!-- GRID DE ICONOS (50 por categoría) -->
      <div id="grid-glifos" style="
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 6px;
        overflow-y: auto;
        padding: 6px;
        background: rgba(0,0,0,0.35);
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-sm);
        max-height: 280px;
      ">
        ${lista.map(item => `
          <button type="button" class="btn-glifo-item" data-png="${item.png}" data-name="${item.name}" title="${item.name}" style="
            background: var(--bg-surface);
            border: 1px solid var(--border-subtle);
            border-radius: 4px;
            padding: 6px 2px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <img src="${item.png}" alt="${item.name}" class="emoji-pixel" style="width: 18px; height: 18px;">
            <span style="font-size: 0.55rem; color: var(--text-muted); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 44px;">${item.name}</span>
          </button>
        `).join('')}
      </div>
    `;

    modalContent.querySelector('#btn-cerrar-glifos').addEventListener('click', () => {
      container.classList.add('hidden');
    });

    modalContent.querySelectorAll('.btn-tab-cat').forEach(btn => {
      btn.addEventListener('click', () => {
        this.categoriaActiva = btn.getAttribute('data-cat');
        this.renderSelector(modalContent, onSeleccionar, container);
      });
    });

    const inputBuscar = modalContent.querySelector('#input-buscar-glifo');
    inputBuscar.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      modalContent.querySelectorAll('.btn-glifo-item').forEach(el => {
        const name = el.getAttribute('data-name').toLowerCase();
        el.style.display = name.includes(q) ? 'flex' : 'none';
      });
    });

    modalContent.querySelectorAll('.btn-glifo-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const png = btn.getAttribute('data-png');
        container.classList.add('hidden');
        if (onSeleccionar) onSeleccionar(png);
      });
    });
  }
}
