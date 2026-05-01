#!/bin/bash
# Prime Music Institute — 로컬 서버를 켜고 브라우저를 엽니다.
cd "$(dirname "$0")"
PORT=8765
if lsof -i ":$PORT" -sTCP:LISTEN -t >/dev/null 2>&1; then
  open "http://127.0.0.1:$PORT"
  exit 0
fi
(sleep 0.7 && open "http://127.0.0.1:$PORT") &
exec python3 -m http.server "$PORT"
