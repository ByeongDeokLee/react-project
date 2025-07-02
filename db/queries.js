const supabase = require("./supabaseConfig");

// 게시글 관련 쿼리
const getPosts = async () => {
  try {
    const { data, error } = await supabase.from("posts").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

const getPostById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("🔥 Supabase 오류:", error.message);
    } else {
      console.log("✅ 조회된 데이터:", data);
    }

    return data;
  } catch (error) {
    console.error("Error getting post:", error);
    throw error;
  }
};

async function updatePostViews(postId) {
  try {
    // Step 1: 현재 views 값 가져오기
    const { data: post, error: fetchError } = await supabase
      .from("posts")
      .select("views")
      .eq("id", postId)
      .single();

    if (fetchError) throw fetchError;

    const currentViews = post.views;

    // Step 2: views 값 1 증가시켜 업데이트
    const { data, error: updateError } = await supabase
      .from("posts")
      .update({ views: currentViews + 1 })
      .eq("id", postId);

    if (updateError) throw updateError;

    return data;
  } catch (err) {
    console.error("Error updating post views:", err);
    throw err;
  }
}

const createPost = async (title, content, author) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, author, views: 0, likes: 0 }])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

const updatePost = async (id, title, content) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ title, content, updated_at: new Date() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

const deletePost = async (id) => {
  try {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

// 댓글 관련 쿼리
const getCommentsByPostId = async (postId) => {
  try {
    // Supabase에서는 복잡한 JOIN과 집계를 RPC(Remote Procedure Call)로 처리하는 것이 효율적입니다.
    // 여기서는 간단한 버전으로 replies를 따로 조회합니다.
    const { data, error } = await supabase
      .from("comments")
      .select("*, replies(*)")
      .eq("post_id", Number(postId))
      .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
};

const createComment = async (postId, content, author) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert([{ post_id: postId, content, author }])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

const createReply = async (commentId, content, author) => {
  try {
    const { data, error } = await supabase
      .from("replies")
      .insert([{ comment_id: commentId, content, author }])
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating reply:", error);
    throw error;
  }
};

// 좋아요 관련 쿼리
const togglePostLike = async (postId, userId) => {
  try {
    // Supabase에서는 보통 이 로직을 데이터베이스 함수(RPC)로 만듭니다.
    // 클라이언트 사이드에서 구현하는 간단한 예시입니다.
    const { data: existing, error: selectError } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_id", userId);

    if (selectError) throw selectError;

    if (existing.length > 0) {
      const { error: deleteError } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);
      if (deleteError) throw deleteError;
      return { liked: false };
    } else {
      const { error: insertError } = await supabase
        .from("post_likes")
        .insert([{ post_id: postId, user_id: userId }]);
      if (insertError) throw insertError;
      return { liked: true };
    }
  } catch (error) {
    console.error("Error toggling post like:", error);
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    // const { data, error } = await supabase
    //   .from("users")
    //   .insert([userData])
    //   .select()
    //   .single();
    // 1. 먼저 해당 조건으로 검색
const { data: existingUser, error: selectError } = await supabase
.from("users")
.select("*")
.eq("email", userData.email)
.single();

if (!existingUser) {
// 2. 없으면 insert
const { data: newUser, error: insertError } = await supabase
  .from("users")
  .insert([userData])
  .select()
  .single();

  return newUser;
} else {
  return existingUser;
}
    // if (error) throw error;
    // return data;
  } catch (error) {
    console.error("Error creating user:", error);
    // '23505'는 PostgreSQL의 unique_violation 에러 코드입니다.
    if (error.code === "23505") {
      throw new Error("이미 가입된 이메일입니다.");
    }
    throw error;
  }
};

module.exports = {
  getPosts,
  getPostById,
  updatePostViews,
  createPost,
  updatePost,
  deletePost,
  getCommentsByPostId,
  createComment,
  createReply,
  togglePostLike,
  registerUser,
};
