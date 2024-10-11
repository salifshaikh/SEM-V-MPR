const auth = firebase.auth();

// Login form submission
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Logged in:', userCredential.user);
            closeModals();
            updateUI(true);
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        });
});

// Sign up form submission
document.getElementById('signupForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('Signed up:', userCredential.user);
            closeModals();
            updateUI(true);
        })
        .catch((error) => {
            console.error('Signup error:', error);
            alert('Signup failed: ' + error.message);
        });
});

// Google Sign In
document.getElementById('googleSignIn')?.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Google sign in:', result.user);
            closeModals();
            updateUI(true);
        })
        .catch((error) => {
            console.error('Google sign in error:', error);
            alert('Google sign in failed: ' + error.message);
        });
});

// Logout
function logout() {
    auth.signOut()
        .then(() => {
            console.log('Logged out');
            updateUI(false);
            // Redirect to home page after logout
            window.location.href = '/index.html';
        })
        .catch((error) => {
            console.error('Logout error:', error);
        });
}

// Check auth state
auth.onAuthStateChanged((user) => {
    updateUI(!!user);
});

function updateUI(isLoggedIn) {
    const loginBtn = document.getElementById('loginBtn');
    const navItems = document.querySelectorAll('nav ul li a:not(#loginBtn)');

    if (isLoggedIn) {
        loginBtn.textContent = 'Logout';
        loginBtn.onclick = logout;
        navItems.forEach(item => item.style.display = 'inline');
    } else {
        loginBtn.textContent = 'Login';
        loginBtn.onclick = showLoginModal;
        navItems.forEach(item => {
            if (!item.classList.contains('active')) {
                item.style.display = 'none';
            }
        });
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
}

function closeModals() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'none';
}

document.getElementById('showSignup')?.addEventListener('click', showSignupModal);
document.getElementById('showLogin')?.addEventListener('click', showLoginModal);

document.querySelectorAll('.close').forEach(el => {
    el.onclick = closeModals;
});

window.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        closeModals();
    }
};

// Initialize UI
updateUI(auth.currentUser !== null);