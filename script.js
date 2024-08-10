// script.js

// Scroll Hide/Show Header
let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    header.classList.add('hide');  // Scroll down, hide the header
  } else {
    header.classList.remove('hide');  // Scroll up, show the header
  }
  
  lastScrollTop = scrollTop;
});

// Parallax Effect
window.addEventListener('scroll', () => {
  const scrollPosition = window.pageYOffset;
  document.querySelector('.banner').style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// List Post Functionality
let posts = [];
for (let i = 1; i <= 100; i++) {
  posts.push({
    id: i,
    title: `Post Title ${i}`,
    image: 'img2.jpg',
    date: new Date(Date.now() - i * 10000000)
  });
}

let currentPage = 1;
let itemsPerPage = 10;
let sortOption = 'newest';

const postsContainer = document.getElementById('posts');
const paginationContainer = document.getElementById('pagination');
const sortSelect = document.getElementById('sort');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

sortSelect.addEventListener('change', () => {
  sortOption = sortSelect.value;
  renderPosts();
});

itemsPerPageSelect.addEventListener('change', () => {
  itemsPerPage = parseInt(itemsPerPageSelect.value, 10);
  renderPosts();
});

function renderPosts() {
  postsContainer.innerHTML = '';

  let sortedPosts = [...posts];
  if (sortOption === 'newest') {
    sortedPosts.sort((a, b) => b.date - a.date);
  } else {
    sortedPosts.sort((a, b) => a.date - b.date);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, startIndex + itemsPerPage);

  paginatedPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="post-thumbnail" loading="lazy">
      <h2 class="maignan">${post.title}</h2>
    `;
    postsContainer.appendChild(postElement);
  });

  renderPagination(sortedPosts.length);
}

function renderPagination(totalItems) {
  paginationContainer.innerHTML = '';
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    if (i === currentPage) {
      button.disabled = true;
    }
    button.addEventListener('click', () => {
      currentPage = i;
      renderPosts();
    });
    paginationContainer.appendChild(button);
  }
}

// Initial Render
renderPosts();
