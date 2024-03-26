import {jwtDecode} from 'jwt-decode';

class AuthService {
    getProfile() {
        const token = this.getToken();
        return token ? jwtDecode(token) : null;
    }

    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        const userRole = idToken.userRole;
        localStorage.setItem('id_token', idToken);

        switch (userRole) {
            case 'student':
                window.location.replace('/student-dashboard');
                break;
            case 'parent':
                window.location.replace('/parent-dashboard');
                break;
            case 'admin':
                window.location.replace('/admin-dashboard');
                break;
            case 'teacher':
                window.location.replace('/teacher-dashboard');
                break;
            default:
                window.location.replace('/404');
        }
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('email');
        window.location.reload();
    }
}

export default new AuthService();
