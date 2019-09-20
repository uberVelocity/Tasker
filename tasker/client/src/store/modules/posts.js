import axios from 'axios';

const url = 'api/posts/';

const state = {
    posts: []
};

const getters = {
    allPosts: state => state.posts
};

const actions = {
    async fetchPosts() {
        const res = await axios.get(url);
        const data = res.data;
        data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));
        commit("setPosts", data);
    },
    insertPost(text) {
        const response = await axios.post(url, {
            text
        });

        commit("newPost", response.data);
    },
    deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

const mutations = {
    setPosts: (state, posts) => (state.posts = posts),
    newPost: (state, post) => (state.posts.unshift(post))
};

export default {
    state,
    getters,
    actions,
    mutations
};