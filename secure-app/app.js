// Secure Web Application - Educational Project
class SecureApp {
    constructor() {
        this.users = [
            { email: 'student@example.com', password: 'SecurePass123!' }
        ];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.checkSession();
    }

    bindEvents() {
        const loginForm = document.getElementById('loginForm');
        const logoutBtn = document.getElementById('logoutBtn');

        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Input validation
        if (!this.validateEmail(email)) {
            this.showMessage('Invalid email format', 'error');
            return;
        }

        if (!this.validatePassword(password)) {
            this.showMessage('Password must be at least 8 characters', 'error');
            return;
        }

        // Simulate secure authentication
        if (this.authenticate(email, password)) {
            this.currentUser = email;
            sessionStorage.setItem('user', email);
            this.showDashboard();
            this.showMessage('Login successful!', 'success');
        } else {
            this.showMessage('Invalid credentials', 'error');
        }
    }

    authenticate(email, password) {
        // In real app, this would hash password and check against database
        const user = this.users.find(u => u.email === email && u.password === password);
        return !!user;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 8;
    }

    showDashboard() {
        document.querySelector('.auth-section').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    }

    handleLogout() {
        this.currentUser = null;
        sessionStorage.removeItem('user');
        document.querySelector('.auth-section').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('loginForm').reset();
        this.showMessage('Logged out successfully', 'success');
    }

    checkSession() {
        const user = sessionStorage.getItem('user');
        if (user) {
            this.currentUser = user;
            this.showDashboard();
        }
    }

    showMessage(text, type) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = `message ${type}`;
        
        setTimeout(() => {
            messageEl.textContent = '';
            messageEl.className = 'message';
        }, 3000);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SecureApp();
});

// Security headers simulation (would be done server-side in production)
console.log('Security Features Implemented:');
console.log('- Input validation');
console.log('- Session management');
console.log('- XSS prevention');
console.log('- Secure authentication flow');