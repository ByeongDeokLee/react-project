const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Supabase 클라이언트 생성
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL과 Anon Key가 환경 변수에 설정되지 않았습니다.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log(supabaseUrl, supabaseAnonKey);
console.log(supabase);

module.exports = supabase;
