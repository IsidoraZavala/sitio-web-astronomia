import os
import requests

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(ROOT_DIR, '.env.local')

api_key = None
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('GEMINI_API_KEY='):
                api_key = line.split('=', 1)[1].strip().strip('"').strip("'")
                break

print("Checking models...", flush=True)
url = f"https://generativelanguage.googleapis.com/v1beta/models?key={api_key}"
r = requests.get(url, timeout=10)
if r.status_code == 200:
    for m in r.json().get('models', []):
        name = m['name'].replace('models/', '')
        if 'generateContent' in m.get('supportedGenerationMethods', []):
            print(f"Testing {name}...", end=' ', flush=True)
            test_url = f"https://generativelanguage.googleapis.com/v1beta/models/{name}:generateContent?key={api_key}"
            try:
                t = requests.post(test_url, json={"contents": [{"parts": [{"text": "hi"}]}]}, timeout=5)
                if t.status_code == 200:
                    print("OK!", flush=True)
                else:
                    print(f"ERR {t.status_code}", flush=True)
            except Exception as e:
                print(f"TIMEOUT", flush=True)
else:
    print(f"Failed to list models: {r.status_code}", flush=True)
