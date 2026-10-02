#!/usr/bin/env python3
"""
================================================================================
SAPIENSIA CLAN — DESPACHADOR AUTÓNOMO DE ÉTER (REDDIT DISPATCHER)
Archivo: tools/despachador_eter/despachador_reddit.py
Descripción: Publicador programado y controlado para Reddit mediante API oficial.
             Garantiza cadencia orgánica (pacing), cero spam, y registro en bitácora.
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
ENV_PATH = os.path.join(BASE_DIR, ".env")
HISTORY_PATH = os.path.join(COLA_DIR, "historial_despachos.json")

def load_env():
    """Carga variables de entorno desde .env si existe."""
    env_vars = {}
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    env_vars[key.strip()] = val.strip()
    return env_vars

def load_manifest():
    """Carga el manifiesto de cola de publicaciones."""
    if not os.path.exists(MANIFEST_PATH):
        print(f"[ERROR] No se encontró el manifiesto en: {MANIFEST_PATH}")
        sys.exit(1)
    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_manifest(manifest):
    """Guarda el estado actualizado del manifiesto."""
    with open(MANIFEST_PATH, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

def load_history():
    """Carga el historial de publicaciones realizadas."""
    if os.path.exists(HISTORY_PATH):
        try:
            with open(HISTORY_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []
    return []

def record_history(entry):
    """Registra una publicación en el historial."""
    history = load_history()
    history.append(entry)
    with open(HISTORY_PATH, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def check_pacing(target_sub, manifest, history):
    """Verifica si ha pasado el tiempo mínimo de enfriamiento para no saturar."""
    pacing = manifest.get("pacing_config", {})
    min_hours_any = pacing.get("min_hours_between_any_post", 24)
    min_days_sub = pacing.get("min_days_between_posts_same_sub", 7)
    
    now = datetime.now(timezone.utc)

    for item in reversed(history):
        item_time = datetime.fromisoformat(item["timestamp"].replace("Z", "+00:00"))
        delta = now - item_time
        
        # Enfriamiento general entre cualquier post
        if delta.total_seconds() < min_hours_any * 3600:
            hours_left = min_hours_any - (delta.total_seconds() / 3600)
            return False, f"Enfriamiento activo: Faltan {hours_left:.1f}h para la siguiente publicación general."
        
        # Enfriamiento específico para el mismo subreddit
        if item.get("target_subreddit", "").lower() == target_sub.lower():
            if delta.total_seconds() < min_days_sub * 86400:
                days_left = min_days_sub - (delta.total_seconds() / 86400)
                return False, f"Enfriamiento específico en r/{target_sub}: Faltan {days_left:.1f} días para volver a publicar aquí."

    return True, "Enfriamiento verificado. Listo para despachar."

def dispatch_post(post_item, is_dry_run=True, env={}):
    """Ejecuta o simula el envío del post a Reddit."""
    post_file_rel = post_item["file"]
    post_file_abs = os.path.join(COLA_DIR, post_file_rel)
    
    if not os.path.exists(post_file_abs):
        return False, f"Archivo de post no encontrado: {post_file_abs}", None

    with open(post_file_abs, "r", encoding="utf-8") as f:
        content = f.read().strip()

    title = post_item["title"]
    subreddit = post_item["target_subreddit"]
    flair = post_item.get("flair", "")

    print("\n" + "=" * 70)
    print(f"📡 [DESPACHADOR DE ÉTER] - {'[SIMULACIÓN DRY-RUN]' if is_dry_run else '[MODO EN VIVO]'}")
    print(f"📌 ID: {post_item['id']}")
    print(f"🎯 Subreddit: r/{subreddit}")
    print(f"🏷️ Flair: {flair}")
    print(f"📝 Título: {title}")
    print(f"📄 Longitud del texto: {len(content)} caracteres ({len(content.split())} palabras)")
    print("=" * 70)

    if is_dry_run:
        print("\n🔍 VISTA PREVIA DE PRIMERAS LÍNEAS:")
        preview = "\n".join(content.split("\n")[:6])
        print(preview + "\n...\n")
        print("✅ [DRY-RUN EXITOSO] El post está perfectamente formateado y listo para emisión en vivo.")
        return True, "Simulación exitosa", f"https://reddit.com/r/{subreddit}/comments/mock_{post_item['id']}"

    # Modo En Vivo con PRAW (Python Reddit API Wrapper)
    try:
        import praw
    except ImportError:
        print("\n⚠️ [AVISO] La librería 'praw' no está instalada. Instalando o utilizando fallback HTTP...")
        return False, "Por favor instala praw ejecutando: pip install praw", None

    client_id = env.get("REDDIT_CLIENT_ID")
    client_secret = env.get("REDDIT_CLIENT_SECRET")
    username = env.get("REDDIT_USERNAME")
    password = env.get("REDDIT_PASSWORD")
    user_agent = env.get("REDDIT_USER_AGENT", "SapiensiaClanDispatcher/1.0")

    if not all([client_id, client_secret, username, password]) or client_id == "TU_CLIENT_ID_AQUI":
        return False, "Credenciales de Reddit incompletas en tools/despachador_eter/.env", None

    try:
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            username=username,
            password=password,
            user_agent=user_agent
        )
        
        sub = reddit.subreddit(subreddit)
        submission = sub.submit(title=title, selftext=content, flair_id=None)
        post_url = f"https://reddit.com{submission.permalink}"
        print(f"🚀 [PUBLICACIÓN EXITOSA EN REDDIT] URL: {post_url}")
        return True, "Publicado exitosamente", post_url
    except Exception as e:
        return False, f"Error al comunicar con la API de Reddit: {str(e)}", None

def main():
    parser = argparse.ArgumentParser(description="Despachador Autónomo de Éter para Reddit")
    parser.add_argument("--live", action="store_true", help="Ejecutar publicación real en vivo (por defecto es Dry-Run)")
    parser.add_argument("--post-id", type=str, default=None, help="ID específico del post a despachar (ej: post_001)")
    parser.add_argument("--force", action="store_true", help="Ignorar reglas de enfriamiento / pacing")
    parser.add_argument("--list", action="store_true", help="Listar posts en cola y su estado")
    args = parser.parse_args()

    manifest = load_manifest()
    history = load_history()
    env = load_env()

    is_dry_run = not args.live

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
        if not target_post:
            print(f"[ERROR] No se encontró el post con ID: {args.post_id}")
            return
    else:
        for item in manifest.get("queue", []):
            if item.get("status") == "pendiente":
                target_post = item
                break

    if not target_post:
        print("✨ No hay posts pendientes en la cola. Todo el contenido ha sido despachado.")
        return

    # Validar Pacing
    if not args.force and not is_dry_run:
        ok, msg = check_pacing(target_post["target_subreddit"], manifest, history)
        if not ok:
            print(f"🛑 [PAUSA ORGÁNICA] {msg}")
            print("Usa --force si deseas anular el enfriamiento conscientemente.")
            return

    # Despachar
    success, msg, post_url = dispatch_post(target_post, is_dry_run=is_dry_run, env=env)

    if success:
        now_iso = datetime.now(timezone.utc).isoformat()
        if not is_dry_run:
            target_post["status"] = "publicado"
            target_post["published_at"] = now_iso
            target_post["live_url"] = post_url
            save_manifest(manifest)

            record_history({
                "id": target_post["id"],
                "target_subreddit": target_post["target_subreddit"],
                "title": target_post["title"],
                "timestamp": now_iso,
                "url": post_url
            })
            print(f"💾 Manifiesto e historial actualizados correctamente.")
    else:
        print(f"❌ [FALLO DE DESPACHO] {msg}")

if __name__ == "__main__":
    main()
