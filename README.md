# Dashboard - 커뮤니티 게시판

## 🛠 기술 스택

### Frontend

- **Next.js** 15.4.6 
- **React** 19.1.0 
- **TypeScript** 5.x 
- **CSS Modules** 

### 개발 도구

- **ESLint** 9.x - 코드 린팅 및 품질 관리
- **Jest** 30.0.5 - 테스트 프레임워크
- **React Testing Library** 16.3.0 - React 컴포넌트 테스트
- **Turbopack** - 고속 번들러 (개발 환경)

## 📁 프로젝트 구조

```
dashboard/
├── public/                 # 정적 파일
├── src/                    
│   ├── app/                # Next.js App Router 페이지
│   │   ├── page.tsx        # 메인 페이지
│   │   ├── layout.tsx      # 공통 레이아웃
│   │   ├── globals.css     # 전역 스타일
│   │   └── posts/          # 게시글 관련 페이지
│   │       ├── create/     # 게시글 작성 페이지
│   │       └── [id]/       # 게시글 상세 페이지
│   │      
│   └── components/         # React 컴포넌트
│   │   ├── common/         # 공통 컴포넌트
│   │   ├── post/           # 게시글 관련 컴포넌트
│   │   ├── search/         # 검색 관련 컴포넌트
│   │   └── comment/        # 댓글 관련 컴포넌트
│   │      
│   └── services/           # 전체 비즈니스 로직
│   │   ├── commentService/ # 댓글 관련 로직
│   │   └── postService/    # 게시글 관련 로직
│   │      
│   └── types/              # 사용 타입 분리
│        
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

1. **압축 해제**

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

# 테스트 실행
npm run test

# 테스트 커버리지 확인
npm run test:coverage
```

## ✨ 주요 기능

### 🏠 메인 페이지

- 커뮤니티 게시판 소개
- 새 게시글 작성 버튼
- 게시글 검색 기능

### 📝 게시글 관리

- **게시글 작성**: 새로운 게시글 생성
- **게시글 조회**: 개별 게시글 상세 보기
- **게시글 삭제**: 게시글 삭제 기능

### 💬 댓글 시스템

- 게시글별 댓글 조회
- 댓글 작성 및 삭제

### 🔍 검색 기능

- 게시글 검색 및 필터링
- 실시간 검색 결과 표시

## 🧪 테스트

프로젝트는 Jest와 React Testing Library를 사용하여 테스트가 구성되어 있습니다.

```bash
# 전체 테스트 실행
npm run test

# 특정 컴포넌트 테스트
npm run test -- MainHeader

# 테스트 커버리지 확인
npm run test:coverage

```

### 테스트 예시

- `MainHeader` 컴포넌트의 렌더링 및 링크 기능 테스트
- 컴포넌트별 단위 테스트 및 통합 테스트
