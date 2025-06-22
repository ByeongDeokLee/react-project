const supabase = require("./supabaseConfig");

// Supabase 사용 예시들
class SupabaseService {
  // 사용자 조회
  async getUsers() {
    try {
      const { data, error } = await supabase.from("users").select("*");

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("사용자 조회 오류:", error);
      throw error;
    }
  }

  // 사용자 추가
  async createUser(userData) {
    try {
      const { data, error } = await supabase
        .from("users")
        .insert([userData])
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("사용자 생성 오류:", error);
      throw error;
    }
  }

  // 사용자 업데이트
  async updateUser(id, updates) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error("사용자 업데이트 오류:", error);
      throw error;
    }
  }

  // 사용자 삭제
  async deleteUser(id) {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("사용자 삭제 오류:", error);
      throw error;
    }
  }

  // 인증된 사용자 정보 가져오기
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;
      return user;
    } catch (error) {
      console.error("현재 사용자 정보 조회 오류:", error);
      throw error;
    }
  }
}

module.exports = SupabaseService;
