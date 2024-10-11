document.querySelectorAll('nav ul li a:not(#loginBtn)').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!auth.currentUser) {
            e.preventDefault();
            alert('Please log in to access this page.');
            showLoginModal();
        }
    });
});