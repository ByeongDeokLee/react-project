const supabase = require("./supabaseConfig");

// 게시글 조회
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

//게시글 상세 조회
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

//게시글 상세
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

//게시글 생성
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

//게시글 수정
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

//게시글 삭제
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

const UserLogin = async (email, password) => {
  try {
    console.log("이메일", email);
    console.log("비밀번호", password);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password);
    // .single();
    console.log("쿼리 응답ㄱ밧", data);
    return data;
  } catch (error) {
    console.error("Error toggling post like:", error);
    throw error;
  }
};

//회원가입 여부 쿼리
const registerUser = async (userData) => {
  try {
    const { data: existingUser, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("email", userData.email)
      .eq("name", userData.name)
      .eq("phone", userData.phone)
      .maybeSingle();

    if (selectError) throw selectError;

    if (!existingUser) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([userData])
        .select()
        .single();

      if (insertError) throw insertError;
      return newUser;
    } else {
      return existingUser;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.code === "23505") {
      throw new Error("이미 가입된 이메일입니다.");
    }
    throw error;
  }
};

//공지사항 쿼리
const NoticeList = async () => {
  try {
    console.log("NoticeList 쿼리 실행");
    const { data, error } = await supabase.from("notice_page").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
};

const getNotice = async (id) => {
  try {
    console.log("getNotice 쿼리 실행");
    const { data, error } = await supabase
      .from("notice_page")
      .select("*")
      .eq("id", id)
      .single();

    console.log("쿼리 확인", data);
    return data;
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
};

//공지사항 게시물
const updateNoticeViews = async (id) => {
  try {
    // Step 1: 현재 views 값 가져오기
    const { data: notice, error: fetchError } = await supabase
      .from("notice_page")
      .select("views")
      .eq("id", id)
      .single();

    console.log("여기 확인", notice);

    if (fetchError) throw fetchError;

    const currentViews = notice.views;

    // Step 2: views 값 1 증가시켜 업데이트
    const { data, error: updateError } = await supabase
      .from("notice_page")
      .update({ views: currentViews + 1 })
      .eq("id", id);

    if (updateError) throw updateError;

    return data;
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
};

//리뷰
const reviewsList = async () => {
  try {
    console.log("NoticeList 쿼리 실행");
    const { data, error } = await supabase.from("reviews").select("*");
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
}

//서비스 종류
const serviceList = async () => {
  try {
    console.log("serviceList 쿼리 실행");
    // const { data, error } = await supabase.from("service_items").select("*");
    // if (error) throw error;
  // Step 1. service_items 전체 조회
    const { data: services, error: serviceError } = await supabase
    .from('service_items')
    .select('*');

  if (serviceError) throw serviceError;


  // Step 2. service_items.id 목록 추출
    const serviceIds = services.map((item) => item.id);

    const serviceUserIds = services.map((item) => item.user_id)

    console.log("\n\n\n serviceUserIds \n\n\n", serviceUserIds)

  // Step 3. 해당 id 목록에 맞는 images 조회
  const { data: images, error: imageError } = await supabase
    .from('service_images')
    .select('*')
    .in('service_id', serviceIds);

    if (imageError) throw imageError;

    // Step 3_1. 해당 id 목록에 맞는 user 조회
    const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
      .in('id', serviceUserIds);

  if (usersError) throw usersError;

  // Step 4. 이미지 매칭해서 병합
  const merged = services.map((item) => {
    const matchedImages = images.filter((img) => img.service_id === item.id);
    const matchedUsers = users.find((user) => user.id === item.user_id);
    return {
      ...item,
      images: matchedImages,
      user : matchedUsers,
    };
  });

    return merged;
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
}

//회원 조회
const memberList = async () => {
  try {
    console.log("회원 정보 쿼리 실행");
    const { data, error } = await supabase
      .from("users")
      .select("*")

    console.log("쿼리 확인", data);
    return data;
  } catch (error) {
    console.error("Error getting inquiry:", error);
    throw error;
  }
}

//유저 정보
const getMemberInfo = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

      // return data;
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
}


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
  UserLogin,
  NoticeList,
  getNotice,
  updateNoticeViews,
  reviewsList,
  serviceList,
  memberList,
  getMemberInfo,
};
