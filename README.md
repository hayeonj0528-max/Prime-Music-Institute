# Prime Music Institute

Prime Music Institute의 공식 웹사이트입니다.

- 위치: 89a Wyralla Ave, Epping NSW 2121
- 전화: 0415 344 297
- 운영: 2017년부터

## 구조

정적(Static) 웹사이트로 별도의 빌드 도구가 필요하지 않습니다.

```
.
├── index.html        # 메인 페이지
├── styles.css        # 스타일
├── script.js         # 인터랙션 / 동적 콘텐츠 주입
├── site-info.js      # 사이트 텍스트/연락처 정보 (여기서 콘텐츠 수정)
├── assets/images/    # 로고, 강사진, 프로그램 이미지
└── Start.command     # 로컬 미리보기 (macOS)
```

## 로컬에서 미리보기

macOS에서는 `Start.command`를 더블클릭하면 로컬 서버가 실행되고 브라우저가 열립니다.

또는 터미널에서:

```bash
cd "Prime Music Institute"
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000 접속
```

## 콘텐츠 수정

학원 정보·프로그램·강사 소개는 `site-info.js`에서 수정합니다.
이미지 교체는 `assets/images/` 안의 파일을 같은 이름으로 덮어쓰면 됩니다.

## 배포

GitHub Pages로 호스팅됩니다.
저장소 → Settings → Pages 에서 `main` 브랜치 / `/ (root)` 를 선택하면 활성화됩니다.
