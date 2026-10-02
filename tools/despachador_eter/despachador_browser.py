#!/usr/bin/env python3
"""
================================================================================
SAPIENSIA CLAN — DESPACHADOR DIRECTO POR NAVEGADOR (PLAYWRIGHT)
Archivo: tools/despachador_eter/despachador_browser.py
Descripción: Despacha publicaciones a Reddit directamente mediante navegador
             automatizado con sesión persistente, sin necesidad de API keys.
Autor: Nexo (Ingeniero Principal) & Éter (Estratega de Difusión)
================================================================================
"""

import os
import sys
import json
import time
import argparse
from datetime import datetime, timezone

# Compatibilidad UTF-8 en consolas Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPROTA_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", ".."))
COLA_DIR = os.path.join(UPROTA_DIR, "docs", "difusion", "cola_publicaciones")
MANIFEST_PATH = os.path.join(COLA_DIR, "cola_manifest.json")
HISTORY_PATH = os.path.join(COLA_DIR, "historial_despachos.json")
SESSION_DIR = os.path.join(BASE_DIR, ".browser_session")

def load_manifest():
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_manifest(manifest):
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

def load_history():
    if os.path.exists(HISTORY_PATH):
        try:
            with open(HISTORY_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def record_history(entry):
    history = load_history()
    history.append(entry)
    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def check_pacing(target_sub, manifest, history):
    pacing = manifest.get("pacing_config", {})
    min_hours_any = pacing.get("min_hours_between_any_post", 24)
    min_days_sub = pacing.get("min_days_between_posts_same_sub", 7)
    
    now = datetime.now(timezone.utc)

    for item in reversed(history):
        item_time = datetime.fromisoformat(item["timestamp"].replace("Z", "+00:00"))
        delta = now - item_time
        
        if delta.total_seconds() < min_hours_any * 3600:
            hours_left = min_hours_any - (delta.total_seconds() / 3600)
            return False, f"Enfriamiento activo: Faltan {hours_left:.1f}h para la siguiente publicación general."
        
        if item.get("target_subreddit", "").lower() == target_sub.lower():
            if delta.total_seconds() < min_days_sub * 86400:
                days_left = min_days_sub - (delta.total_seconds() / 86400)
                return False, f"Enfriamiento en r/{target_sub}: Faltan {days_left:.1f} días para volver a publicar aquí."

    return True, "Enfriamiento verificado."

def launch_browser_dispatcher(post_item, auto_submit=False):
    """Abre el navegador, rellena el post y publica."""
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("[ERROR] Playwright no está instalado. Ejecuta: pip install playwright && playwright install chromium")
        return False, "Playwright no disponible"

    post_file_abs = os.path.join(COLA_DIR, post_item["file"])
    with open(post_file_abs, "r", encoding="utf-8") as f:
        content = f.read().strip()

    title = post_item["title"]
    subreddit = post_item["target_subreddit"]

    os.makedirs(SESSION_DIR, exist_ok=True)

    print("\n" + "=" * 70)
    print("🌐 [INICIANDO NAVEGADOR PERSISTENTE DE ÉTER]")
    print(f"🎯 Destino: https://www.reddit.com/r/{subreddit}/submit")
    print(f"📝 Título: {title}")
    print(f"📄 Contenido: {len(content)} caracteres")
    print("=" * 70)

    with sync_playwright() as p:
        # Iniciar Chromium con sesión persistente (guarda cookies y login)
        context = p.chromium.launch_persistent_context(
            user_data_dir=SESSION_DIR,
            headless=False,
            viewport={"width": 1280, "height": 800},
            args=["--disable-blink-features=AutomationControlled"]
        )
        page = context.new_page()

        # Ir a la página de envío
        submit_url = f"https://www.reddit.com/r/{subreddit}/submit"
        print(f"📡 Navegando a: {submit_url}")
        page.goto(submit_url, wait_until="domcontentloaded", timeout=60000)
        time.sleep(3)

        # Comprobar si pide iniciar sesión
        if "login" in page.url.lower() or page.query_selector("button:has-text('Log In')") or page.query_selector("a:has-text('Log In')"):
            print("\n⚠️ [SESIÓN REQUERIDA] Inicia sesión en la ventana de Reddit que se abrió.")
            print("💡 Tu sesión quedará guardada permanentemente en '.browser_session' para futuros despachos.")
            input("👉 Una vez que hayas iniciado sesión y veas la pantalla de Reddit, presiona [ENTER] en esta terminal...")
            page.goto(submit_url, wait_until="domcontentloaded", timeout=60000)
            time.sleep(3)

        # Rellenar Título
        title_selectors = [
            "textarea[name='title']",
            "textarea[placeholder*='Title']",
            "textarea[placeholder*='Título']",
            "input[name='title']",
            "faceplate-textarea-input[name='title']",
            "[data-testid='post-title-input']"
        ]
        title_filled = False
        for sel in title_selectors:
            try:
                el = page.query_selector(sel)
                if el and el.is_visible():
                    el.click()
                    el.fill(title)
                    title_filled = True
                    print("✅ Título rellenado con éxito.")
                    break
            except Exception:
                continue

        if not title_filled:
            # Fallback interactivo por teclado
            page.keyboard.type(title)
            print("ℹ️ Título introducido por teclado.")

        time.sleep(1)

        # Rellenar Cuerpo de Texto
        body_selectors = [
            "div[contenteditable='true']",
            "textarea[placeholder*='Text']",
            "textarea[placeholder*='Texto']",
            "faceplate-textarea-input[name='body']",
            "[data-testid='post-text-input']",
            ".public-DraftEditor-content"
        ]
        body_filled = False
        for sel in body_selectors:
            try:
                el = page.query_selector(sel)
                if el and el.is_visible():
                    el.click()
                    el.fill(content)
                    body_filled = True
                    print("✅ Contenido del post rellenado con éxito.")
                    break
            except Exception:
                continue

        print("\n" + "*" * 70)
        print("✨ [POST PREPARADO EN EL NAVEGADOR]")
        print("Puedes revisar el post en la ventana del navegador abierta.")
        
        if auto_submit:
            print("🚀 Enviando post automáticamente...")
            submit_btn = page.query_selector("button:has-text('Post')") or page.query_selector("button:has-text('Publicar')")
            if submit_btn:
                submit_btn.click()
                time.sleep(4)
                print("🎉 ¡Post publicado!")
        else:
            print("👉 Revisa la ventana y haz clic en 'Publicar' / 'Post' cuando gustes (o dale ENTER en la consola para cerrar).")
            input("Presiona [ENTER] para cerrar el navegador y registrar la publicación...")

        post_url = page.url
        context.close()
        return True, post_url

def main():
    parser = argparse.ArgumentParser(description="Despachador Directo por Navegador (Playwright)")
    parser.add_argument("--post-id", type=str, default=None, help="ID específico del post a despachar (ej: post_001)")
    parser.add_argument("--auto", action="store_true", help="Hacer clic automáticamente en Publicar")
    parser.add_argument("--force", action="store_true", help="Ignorar reglas de enfriamiento / pacing")
    parser.add_argument("--list", action="store_true", help="Listar posts en cola")
    args = parser.parse_args()

    manifest = load_manifest()
    history = load_history()

    if args.list:
        print("\n📋 COLA DE PUBLICACIONES DEL CLAN SAPIENSIA:")
        for item in manifest.get("queue", []):
            status_symbol = "🟢" if item["status"] == "publicado" else "🟡"
            print(f" {status_symbol} [{item['id']}] [{item['status'].upper()}] r/{item['target_subreddit']}: {item['title'][:60]}...")
        print(f"\nTotal en historial: {len(history)} publicaciones realizadas.\n")
        return

    # Buscar post candidato
    target_post = None
    if args.post_id:
        for item in manifest.get("queue", []):
            if item["id"] == args.post_id:
                target_post = item
                break
    else:
        for item in manifest.get("queue", []):
            if item.get("status") == "pendiente":
                target_post = item
                break

    if not target_post:
        print("✨ No hay posts pendientes en la cola.")
        return

    # Validar Pacing
    if not args.force:
        ok, msg = check_pacing(target_post["target_subreddit"], manifest, history)
        if not ok:
            print(f"🛑 [PAUSA ORGÁNICA] {msg}")
            print("Usa --force si deseas anular el enfriamiento conscientemente.")
            return

    # Ejecutar en Navegador
    ok, result_url = launch_browser_dispatcher(target_post, auto_submit=args.auto)
    
    if ok:
        now_iso = datetime.now(timezone.utc).isoformat()
        target_post["status"] = "publicado"
        target_post["published_at"] = now_iso
        target_post["live_url"] = result_url
        save_manifest(manifest)

        record_history({
            "id": target_post["id"],
            "target_subreddit": target_post["target_subreddit"],
            "title": target_post["title"],
            "timestamp": now_iso,
            "url": result_url
        })
        print(f"💾 Manifiesto e historial actualizados correctamente.")

if __name__ == "__main__":
    main()
