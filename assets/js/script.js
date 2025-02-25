'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });






// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    // First remove active class from all pages and nav links
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(link => link.classList.remove("active"));
    
    // Then add active class to clicked nav link and corresponding page
    this.classList.add("active");
    const targetPage = document.querySelector(`[data-page="${this.innerHTML.toLowerCase()}"]`);
    targetPage.classList.add("active");
  });
}
// Add this event listener
// Add this event listener
document.querySelectorAll('.skills-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const resumeButton = Array.from(document.querySelectorAll('[data-nav-link]'))
      .find(link => link.textContent === 'Resume');
    resumeButton.click();
    setTimeout(() => {
      document.getElementById('skills-section').scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  });
});
document.querySelector('.form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSe5gepODlukqWT_H6XjVejquk0Aa8ZyWhzeDJ2U_L8SRJjKNA/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
  })
  .then(() => {
    // Clear the form
    this.reset();
    // Show success message
    alert('Message sent successfully!');
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



document.getElementById('blogSearch').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const blogPosts = document.querySelectorAll('.blog-post-item');
  
  blogPosts.forEach(post => {
      const title = post.querySelector('.blog-item-title').textContent.toLowerCase();
      const category = post.querySelector('.blog-category').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || category.includes(searchTerm)) {
          post.classList.remove('hidden');
      } else {
          post.classList.add('hidden');
      }
  });
});


function navigateAndSearch(searchTerm) {
  const blogButton = Array.from(document.querySelectorAll('[data-nav-link]'))
      .find(link => link.textContent === 'Blog');
  
  blogButton.click();
  
  setTimeout(() => {
      const searchInput = document.getElementById('blogSearch');
      searchInput.value = searchTerm;
      searchInput.dispatchEvent(new Event('input'));
  }, 100);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
          behavior: 'smooth'
      });
  });
});
