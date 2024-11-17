const postContainer = document.getElementById('post-container');
const loader = document.getElementById('loader');
let page = 1;

// Fetch posts from API
async function getPosts(page) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`);
  const data = await res.json();
  return data;
}

// Show posts in the DOM
async function showPosts() {
  const posts = await getPosts(page);
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;
    postContainer.appendChild(postEl);
  });
}

// Initial posts
showPosts();

// Detect scroll to bottom
window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      showLoading();
    }
  });
  
  // Show loading animation
  function showLoading() {
    loader.classList.add('show');
    
    setTimeout(() => {
      loader.classList.remove('show');
      setTimeout(() => {
        page++;
        showPosts();
      }, 300);
    }, 1000);
  }
  
