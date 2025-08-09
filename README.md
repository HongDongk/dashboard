# Dashboard - 커뮤니티 게시판

Next.js와 TypeScript를 기반으로 한 커뮤니티 게시판 웹 애플리케이션입니다. 사용자들이 자유롭게 소통하고 정보를 공유할 수 있는 플랫폼을 제공합니다.

## 🛠 기술 스택

### Frontend

- **Next.js** 15.4.6 - React 프레임워크 (App Router 사용)
- **React** 19.1.0 - UI 라이브러리
- **TypeScript** 5.x - 타입 안전성 보장
- **CSS Modules** - 컴포넌트 스타일링

### 개발 도구

- **ESLint** 9.x - 코드 린팅 및 품질 관리
- **Jest** 30.0.5 - 테스트 프레임워크
- **React Testing Library** 16.3.0 - React 컴포넌트 테스트
- **Turbopack** - 고속 번들러 (개발 환경)

## 📁 프로젝트 구조

```
dashboard/
├── public/                 # 정적 파일
├── src/                    # 소스 코드
│   ├── app/                # Next.js App Router 페이지
│   │   ├── page.tsx        # 홈페이지
│   │   ├── layout.tsx      # 공통 레이아웃
│   │   ├── globals.css     # 전역 스타일
│   │   └── posts/          # 게시글 관련 페이지
│   │       ├── create/     # 게시글 작성 페이지
│   │       └── [id]/       # 게시글 상세 페이지
│   └── components/         # React 컴포넌트
│       ├── common/         # 공통 컴포넌트
│       │   └── MainHeader/ # 헤더 컴포넌트
│       ├── post/           # 게시글 관련 컴포넌트
│       └── search/         # 검색 관련 컴포넌트
├── jest.config.ts          # Jest 설정
├── jest.setup.ts           # Jest 초기 설정
├── next.config.ts          # Next.js 설정
├── tsconfig.json           # TypeScript 설정
├── eslint.config.mjs       # ESLint 설정
├── package.json            # 프로젝트 의존성
└── README.md
```

## 🚀 실행 방법

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 확인할 수 있습니다.

### 사용 가능한 스크립트

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# ESLint 실행
npm run lint

# 테스트 실행
npm run test

# 테스트 감시 모드
npm run test:watch

# 테스트 커버리지 확인
npm run test:coverage
```

## ✨ 주요 기능

### 🏠 홈페이지

- 커뮤니티 게시판 소개
- 새 게시글 작성 버튼
- 게시글 검색 기능

### 📝 게시글 관리

- **게시글 작성**: 새로운 게시글 생성
- **게시글 조회**: 개별 게시글 상세 보기
- **게시글 수정**: 기존 게시글 편집
- **게시글 삭제**: 게시글 삭제 기능

### 💬 댓글 시스템

- 게시글별 댓글 조회
- 댓글 작성 및 관리

### 🔍 검색 기능

- 게시글 검색 및 필터링
- 실시간 검색 결과 표시

### 📱 반응형 디자인

- 모바일, 태블릿, 데스크톱 지원
- CSS Modules를 활용한 모듈화된 스타일링

## 🧪 테스트

프로젝트는 Jest와 React Testing Library를 사용하여 테스트가 구성되어 있습니다.

```bash
# 전체 테스트 실행
npm run test

# 특정 컴포넌트 테스트
npm run test -- MainHeader

# 테스트 커버리지 확인
npm run test:coverage

# 테스트 감시 모드 (파일 변경 시 자동 실행)
npm run test:watch
```

### 테스트 예시

- `MainHeader` 컴포넌트의 렌더링 및 링크 기능 테스트
- 컴포넌트별 단위 테스트 및 통합 테스트

## 🔧 개발 환경 설정

### TypeScript 설정

- 엄격한 타입 검사 활성화
- Next.js와의 완벽한 통합
- 절대 경로 임포트 지원 (`@/` 접두사)

### ESLint 설정

- Next.js 공식 규칙 적용
- TypeScript 지원
- 코드 품질 및 일관성 보장

### Jest 설정

- jsdom 테스트 환경
- TypeScript 지원
- 모듈 경로 매핑 (`@/` 별칭)

## 📊 성능 최적화

- **Turbopack**: 개발 환경에서 빠른 번들링
- **Next.js App Router**: 최신 라우팅 시스템
- **CSS Modules**: 스타일 캡슐화로 성능 향상
- **TypeScript**: 컴파일 타임 최적화

## 🤝 기여하기

1. 이 저장소를 Fork 합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/새기능`)
3. 변경사항을 커밋합니다 (`git commit -am '새 기능 추가'`)
4. 브랜치에 Push 합니다 (`git push origin feature/새기능`)
5. Pull Request를 생성합니다

### 개발 가이드라인

- TypeScript 타입을 적절히 정의해주세요
- 새로운 컴포넌트에는 테스트를 작성해주세요
- ESLint 규칙을 준수해주세요
- 커밋 메시지는 명확하게 작성해주세요

## 📄 라이선스

이 프로젝트는 개인 과제용으로 제작되었습니다.

## 📞 연락처

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.
