const pool = require('./dbConfig');

// 게시글 관련 쿼리
const getPosts = async () => {
    try {
        const result = await pool.query(`
           SELECT * FROM POSTS
        `);
        return result.rows;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

const getPostById = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error getting post:', error);
        throw error;
    }
};

const createPost = async (title, content, author) => {
    try {
        const result = await pool.query(
            `INSERT INTO posts (title, content, author, views, likes, created_at, updated_at)
             VALUES ($1, $2, $3, 0, 0, NOW(), NOW()) RETURNING *`,
            [title, content, author]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

const updatePost = async (id, title, content) => {
    try {
        const result = await pool.query(
            'UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

const deletePost = async (id) => {
    try {
        await pool.query('DELETE FROM posts WHERE id = $1', [id]);
        return true;
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};



// 댓글 관련 쿼리
const getCommentsByPostId = async (postId) => {
    try {
        const result = await pool.query(`
            SELECT c.*,
                   COUNT(r.id) as reply_count,
                   ARRAY_AGG(
                       CASE WHEN r.id IS NOT NULL THEN
                           json_build_object(
                               'id', r.id,
                               'content', r.content,
                               'author', r.author,
                               'created_at', r.created_at,
                               'likes', r.likes
                           )
                       END
                   ) FILTER (WHERE r.id IS NOT NULL) as replies
            FROM comments c
            LEFT JOIN replies r ON c.id = r.comment_id
            WHERE c.post_id = $1
            GROUP BY c.id
            ORDER BY c.created_at ASC
        `, [postId]);
        return result.rows;
    } catch (error) {
        console.error('Error getting comments:', error);
        throw error;
    }
};

const createComment = async (postId, content, author) => {
    try {
        const result = await pool.query(
            'INSERT INTO comments (post_id, content, author) VALUES ($1, $2, $3) RETURNING *',
            [postId, content, author]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

const createReply = async (commentId, content, author) => {
    try {
        const result = await pool.query(
            'INSERT INTO replies (comment_id, content, author) VALUES ($1, $2, $3) RETURNING *',
            [commentId, content, author]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error creating reply:', error);
        throw error;
    }
};

// 좋아요 관련 쿼리
const togglePostLike = async (postId, userId) => {
    try {
        const existing = await pool.query(
            'SELECT * FROM post_likes WHERE post_id = $1 AND user_id = $2',
            [postId, userId]
        );

        if (existing.rows.length > 0) {
            await pool.query(
                'DELETE FROM post_likes WHERE post_id = $1 AND user_id = $2',
                [postId, userId]
            );
            return { liked: false };
        } else {
            await pool.query(
                'INSERT INTO post_likes (post_id, user_id) VALUES ($1, $2)',
                [postId, userId]
            );
            return { liked: true };
        }
    } catch (error) {
        console.error('Error toggling post like:', error);
        throw error;
    }
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
    getCommentsByPostId,
    createComment,
    createReply,
    togglePostLike,

};