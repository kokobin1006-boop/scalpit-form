# SCALPIT · Claude Code 전달 패키지

2026-10-06 / 공개 홈페이지 v41 기준 소스와 브랜드 자료입니다.

## 대표님 사용 방법

1. ZIP을 다운로드하고 압축을 풉니다.
2. Claude Code에서 `SCALPIT_Claude_Code_v41` 폴더를 엽니다.
3. `CLAUDE_FIRST_MESSAGE.txt` 내용을 Claude Code에 붙여넣습니다.

이 폴더에는 홈페이지 소스코드와 실제 사용 중인 이미지·영상, 작업 인계서가 들어 있습니다. 기존 사이트 접속 권한이나 배포 권한은 포함되지 않습니다. 여기서 파일을 수정해도 현재 공개 홈페이지가 자동으로 변경되지는 않습니다.

공개 사이트: https://scalpit-franchise.kohanbin1006.chatgpt.site
참고 브랜드 사이트: https://scalpitheadspa.com/
참고 Instagram: https://www.instagram.com/scalpit_global/

## Claude Code가 먼저 볼 파일

- `CLAUDE.md`: 프로젝트 작업 원칙과 핵심 파일.
- `HANDOFF.md`: 디자인 방향, 현재 구성, 사실 확인이 필요한 자료, 남은 검수.
- `SOURCE_MANIFEST.json`: 내보낸 기준 커밋과 원본 파일 해시.
- `STARTER_README.md`: 기본 프레임워크 설명. 과거 npm 안내보다 아래 현재 pnpm 실행 안내를 우선합니다.
- `CONTENT_NOTES.md`: 초기 버전 기록입니다. 최신 구현 설명이 아니므로 현재 화면의 근거로 사용하지 마세요.

## 로컬 실행

Node.js 22.13.0 이상과 인터넷 연결이 필요합니다. 프로젝트가 지정한 패키지 매니저는 pnpm 11.25.0입니다.

압축을 푼 프로젝트 폴더에서:

```sh
npx --yes pnpm@11.25.0 install --frozen-lockfile
npx --yes pnpm@11.25.0 dev
```

실행 후 터미널에 표시되는 로컬 주소를 엽니다. 코드상 기본 포트는 5173이며 사용 중이면 실제 출력 주소를 따르세요.

이 복사본에는 원래 환경의 `.sites-runtime`이 없으므로 `scripts/execution-profile.mjs`에서 `portable` 모드를 선택합니다. 로컬 실행에 ChatGPT 플러그인 설치 경로는 필요하지 않습니다. 일반 Next.js 프로젝트로 가정해 `next dev`를 실행하지 마세요. 실제 실행기는 Vinext/Vite입니다.

이미 pnpm 11.25.0이 설치되어 있다면 `pnpm install --frozen-lockfile`, `pnpm dev`도 가능합니다. 설치 오류가 나면 Node 버전과 오류 내용을 먼저 확인하고, lockfile이나 의존성 정책을 임의로 삭제하지 마세요.

## 코드 검사와 빌드

```sh
npx --yes pnpm@11.25.0 exec tsc --noEmit --incremental false
npx --yes pnpm@11.25.0 build
```

원래 작업 환경에서는 v41의 타입 검사, 빌드, 게시가 완료되었습니다. 이 전달본의 새 컴퓨터 설치와 portable 모드 실행을 별도로 검증한 것은 아닙니다.

## 문의 접수 기능까지 로컬에서 확인하려면

화면 확인과 달리 문의 제출에는 로컬 D1 테이블이 필요합니다. 위 빌드 후, **새 로컬 데이터베이스에 한 번만** 아래 초기 마이그레이션을 적용합니다.

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_bored_silver_surfer.sql
npx --yes pnpm@11.25.0 start
```

이미 테이블이 있으면 초기 마이그레이션을 반복하지 마세요. 반드시 `--local`을 유지하고, 가상의 테스트 입력만 사용하세요. 로컬 DB와 실제 고객 문의 DB는 별개이며 실제 고객 데이터는 이 패키지에 없습니다.

현재 문의 API는 저장 및 접수번호 반환 기능입니다. 이메일·카카오톡·문자 알림이나 관리자 대시보드는 구현되어 있지 않습니다. 운영 전 접수 내용을 확인할 방법과 담당자 알림을 별도로 결정해야 합니다.

## 포함·제외 범위

- 포함: 현재 추적 중인 소스, 패키지 설정·lockfile, 이미지·영상, DB 구조와 마이그레이션, 라이선스, 작업 인계서.
- 제외: 설치 의존성 폴더, 빌드 결과, Git 이력·인증 정보, 환경변수 파일, 로컬 DB, 운영 고객 데이터, 컴파일 캐시.
- 실제 앱 소스와 자산은 기준 커밋과 동일합니다. README를 인계용으로 바꾸고 원래 README를 `STARTER_README.md`로 보존했으며, 인계 문서와 파일 목록만 추가했습니다.

## 현재 사이트로 다시 반영하기

Claude에서 수정한 파일 또는 수정본 ZIP을 이 대화로 전달하면 기존 사이트에 이어서 반영할 수 있습니다. 변경 파일 목록과 실행·검수 결과도 함께 받으세요. 현재 ChatGPT Sites 주소로 게시하려면 원래 프로젝트의 정식 배포 절차와 권한이 필요합니다. 다른 호스팅으로 이전할 때는 Cloudflare D1 의존성을 먼저 검토해야 합니다.
