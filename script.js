// Mode Toggle Functionality
const toggleBtn = document.querySelector('.toggle-btn');
const body = document.body;

// Check for saved mode preference in localStorage and apply it
if (localStorage.getItem('mode') === 'dark') {
    body.classList.add('dark-mode');
    body.classList.remove('light-mode');
    toggleBtn.innerHTML = 'Switch to Light Mode';
} else {
    body.classList.add('light-mode');
    body.classList.remove('dark-mode');
    toggleBtn.innerHTML = 'Switch to Dark Mode';
}

toggleBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Update the button text based on current mode
    if (body.classList.contains('dark-mode')) {
        toggleBtn.innerHTML = 'Switch to Light Mode';
        localStorage.setItem('mode', 'dark'); // Save the mode preference
    } else {
        toggleBtn.innerHTML = 'Switch to Dark Mode';
        localStorage.setItem('mode', 'light'); // Save the mode preference
    }
});

// Comment Button functionality (updated)
document.addEventListener("DOMContentLoaded", function() {
    loadComments(); // Load comments when the page loads
});

document.getElementById('comment-btn').addEventListener('click', function() {
    const comment = prompt('Enter your comment:');
    if (comment) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
        loadComments(); // Update the displayed comments
    } else {
        alert('No comment entered.');
    }
});

document.getElementById('clear-btn').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete all comments?')) {
        localStorage.removeItem('comments'); // Remove all comments
        loadComments(); // Refresh comments display
    }
});

function loadComments() {
    const commentSection = document.getElementById('comments-section');
    commentSection.innerHTML = ''; // Clear previous comments
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    comments.forEach((comment, index) => {
        const commentWrapper = document.createElement('div');
        commentWrapper.style.display = 'flex';
        commentWrapper.style.alignItems = 'center';
        commentWrapper.style.marginBottom = '5px';

        const newComment = document.createElement('p');
        newComment.textContent = comment;
        newComment.style.marginRight = '10px';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '❌';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.background = 'red';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.padding = '3px 6px';
        deleteBtn.style.borderRadius = '5px';

        deleteBtn.addEventListener('click', function() {
            deleteComment(index);
        });

        commentWrapper.appendChild(newComment);
        commentWrapper.appendChild(deleteBtn);
        commentSection.appendChild(commentWrapper);
    });
}

function deleteComment(index) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.splice(index, 1); // Remove the selected comment
    localStorage.setItem('comments', JSON.stringify(comments));
    loadComments(); // Refresh comments display
}

// Handle Navbar active state based on page
const navLinks = document.querySelectorAll('#navbar ul li a');

// Function to set the active link based on the current URL
function setActiveLink() {
    navLinks.forEach(link => {
        if (window.location.pathname.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function to set the active link when the page loads
setActiveLink();

// Optional: Add smooth page transitions using CSS
const pageContent = document.getElementById('page-content');

pageContent.addEventListener('transitionend', () => {
    // This ensures the page content remains properly aligned after transitions
    pageContent.style.transform = 'none';
});

// Gallery hover effect to make images pop
const galleryImages = document.querySelectorAll('.gallery-images img');

galleryImages.forEach(image => {
    image.addEventListener('mouseover', function() {
        image.style.transform = 'scale(1.1)';
        image.style.boxShadow = '0px 8px 20px rgba(0, 0, 0, 0.2)';
    });

    image.addEventListener('mouseout', function() {
        image.style.transform = 'scale(1)';
        image.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)';
    });
});

window.addEventListener("scroll", function () {
    let footer = document.querySelector("footer");
    let scrollTop = window.scrollY;

    if (scrollTop > 100) { // Adjust value as needed
        footer.style.display = "block"; // Show when scrolling down
    } else {
        footer.style.display = "none"; // Hide when at the top
    }
});
