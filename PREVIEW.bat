@echo off
cd /d "%~dp0"
echo Starting local thesis page at http://127.0.0.1:8000/
echo Keep this window open. Press Ctrl+C to stop the server.
start "" "http://127.0.0.1:8000/"
python -m http.server 8000 --bind 127.0.0.1
if errorlevel 1 (
  echo If Python is unavailable, double-click index.html instead.
  pause
)
