import router from '../router';

const authGuard = (to, from, next) => {
  if (authService.isAuthenticated()) {
    next();
  } else {
    next('/login');
  }
};
export default authGuard;