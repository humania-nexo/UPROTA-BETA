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
    return ssets/sprites/emojis//.png;
  }

  static renderImg(ruta, alt = '') {
    return <img src="" alt="" class="emoji-pixel">;
  }
}
