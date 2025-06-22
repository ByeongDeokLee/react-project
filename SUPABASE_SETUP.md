# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성합니다.
2. 프로젝트가 생성되면 Settings > API에서 다음 정보를 확인합니다:
   - Project URL
   - anon public key
   - service_role secret key

## 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Configuration (for direct PostgreSQL connection)
DB_HOST=db.your-project-id.supabase.co
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your_database_password
```

## 3. 데이터베이스 테이블 생성

Supabase Dashboard에서 SQL Editor를 사용하여 필요한 테이블을 생성하세요.

예시:

```sql
-- 사용자 테이블 생성
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

## 4. 사용 방법

### Supabase 클라이언트 사용

```javascript
const supabase = require("./db/supabaseConfig");

// 데이터 조회
const { data, error } = await supabase.from("users").select("*");

// 데이터 삽입
const { data, error } = await supabase
  .from("users")
  .insert([{ email: "test@example.com", name: "Test User" }]);
```

## 5. 보안 주의사항

- `.env` 파일을 `.gitignore`에 추가하여 민감한 정보가 Git에 포함되지 않도록 하세요.
- 프로덕션에서는 `SUPABASE_SERVICE_ROLE_KEY`를 서버 사이드에서만 사용하세요.
- 클라이언트 사이드에서는 `SUPABASE_ANON_KEY`만 사용하세요.

## 6. RLS (Row Level Security) 설정

Supabase의 보안 기능을 활용하려면 RLS 정책을 설정하세요:

```sql
-- 인증된 사용자만 자신의 데이터에 접근 가능
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);
```
