
function goSearch(event) {
  event.preventDefault();
  const message = document.getElementById('message');
  message.textContent = "Searching...";
  message.style.color = "#00ffcc";
  setTimeout(() => {
    message.textContent = "Search complete!";
  }, 1500);
}


document.addEventListener("DOMContentLoaded", () => {
  const profileIcon = document.querySelector('.menu-icon');
  const menu = document.getElementById('profile-menu');

  if (profileIcon && menu) {
    profileIcon.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });

   
    menu.addEventListener('click', (e) => {
      if (e.target === menu) {
        menu.style.display = 'none';
      }
    });
  }
});

function subscribe(event) {
  event.preventDefault();
  const emailInput = document.querySelector('.newsletter-form input');
  const message = document.getElementById('message');
  const email = emailInput.value;

  if (email) {
    message.textContent = "Thank you for subscribing!";
    message.style.color = "#00ffcc";

    setTimeout(() => {
      message.textContent = "";
      emailInput.value = "";
    }, 2000);
  }
}


function highlightText(query) {
  
  const prevHighlights = document.querySelectorAll('.highlight');
  prevHighlights.forEach(span => {
    span.replaceWith(document.createTextNode(span.textContent));
  });

  if (!query) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const regex = new RegExp(`(${query})`, 'gi');
  const nodesToHighlight = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (regex.test(node.nodeValue)) {
      nodesToHighlight.push(node);
    }
  }

  nodesToHighlight.forEach(node => {
    const parent = node.parentNode;
    const frag = document.createDocumentFragment();
    let lastIndex = 0;

    node.nodeValue.replace(regex, (match, p1, offset) => {
      if (offset > lastIndex) {
        frag.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex, offset)));
      }
      const span = document.createElement('span');
      span.className = 'highlight';
      span.textContent = match;
      frag.appendChild(span);
      lastIndex = offset + match.length;
    });

    if (lastIndex < node.nodeValue.length) {
      frag.appendChild(document.createTextNode(node.nodeValue.substring(lastIndex)));
    }

    parent.replaceChild(frag, node);
  });

  
  const first = document.querySelector('.highlight');
  if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.addEventListener('DOMContentLoaded', () => {
  const searchIcon = document.getElementById('search-icon');
  const searchBar = document.getElementById('search-bar');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  if (searchIcon && searchBar && searchInput && searchBtn) {
    searchIcon.addEventListener('click', () => {
      if (searchBar.style.display === 'flex') {
        searchBar.style.display = 'none';
      } else {
        searchBar.style.display = 'flex';
        searchInput.focus();
      }
    });

    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      highlightText(query); 
      searchInput.value = "";
      searchBar.style.display = 'none';
    });
  }
});

