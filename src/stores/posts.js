import { defineStore } from 'pinia';


export const usePostsStore = defineStore('posts-store', {

    // data
    // state: () => ({ posts: [] })
    state() {
        return {
            posts: [],
            loading: true,
            errorMsg: '',
        }
    },
    // computed
    getters: {
        // sorted() {
        //     return this.posts.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
        // },
        sorted: (state) => state.posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)),
        saved: (state) => state.posts.filter((posts) => posts.is_saved)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    },
    // methods
    actions: {
        getPosts() {

            fetch("http://localhost:3000/posts")
                .then((data) => { return data.json() })
                .then((data) => { 
                    this.posts = data 
                    setTimeout(()=> {
                        this.loading = false;
                    },2000)
                    
                })
                .catch((err) => {
                    console.log("there is an errror : ", err)
                    this.errorMsg = "Something went wrong!"
                    this.loading = false;
                })
        },
        async addPost(post) {

            try {

                const response = await fetch("http://localhost:3000/posts", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: this.posts.length + 1,
                        title: post.title,
                        body: post.body,
                        author: post.author,
                        created_at: new Date().toLocaleDateString(),
                        is_saved: false,
                    })
                })

                const newPost = await response.json();



                this.posts.push(newPost);


                console.log("the new post : ", newPost);
                console.log("the loading : ", this.loading);
                
            } catch (error) {
                console.log("Error adding post: ", error);
            }

            // fetch("http://localhost:3000/posts", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //         id: this.posts.length + 1,
            //         title: post.title,
            //         body: post.body,
            //         author: post.author,
            //         created_at: new Date().toLocaleDateString(),
            //         is_saved: false,             
            //     })
            // })
            // .then((data) => { console.log("inside passed", data.json) })


            // this.posts.push(
            //     {
            //         id: this.posts.length + 1,
            //         title: post.title,
            //         body: post.body,
            //         author: post.author,
            //         created_at: new Date().toLocaleDateString(),
            //         is_saved: false,
            //     }
            // )


        },
        async deletePost(id) {

            // this.posts = this.posts.filter((post) => post.id !== id)
            console.log("the id to delete : ", id);
            try {
                const response = await fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'DELETE'
                })

                const deletedPost = await response.json();
                console.log("the deleted post : ", deletedPost);
                // this.posts.push(newPost)
                this.posts = this.posts.filter((post) => post.id !== id)

            } catch (error) {
                console.log("Error deleting post: ", error);
            }

        },
        async savePost(id) {

            console.log("the id to update : ", id);
            const post = this.posts.find((p) => p.id === id);
            post.is_saved = !post.is_saved;

            try {
                const response = await fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        is_saved: post.is_saved
                    })
                })
                const updatedPost = await response.json();
                console.log("the updated post : ", updatedPost);

            } catch (error) {
                console.log("Error updateing post: ", error);
            }
        }
    }

});