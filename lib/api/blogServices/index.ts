export async function  getAllPosts() {
    const res = (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
    return  res;
  }


  export async function getPostById(id:string) {
    const res = (await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)).json();
    return res;
  }