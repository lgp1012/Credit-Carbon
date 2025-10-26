// auth.js (type="module")
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const signupBtn = document.querySelector('#signup-btn');
  const signinBtn = document.querySelector('#signin-btn');

  const overlay = document.querySelector('#overlay');
  const modal = document.querySelector('#auth-modal');
  const closeModal = document.querySelector('#close-modal');

  const signupForm = document.querySelector('#signup-form');
  const loginForm = document.querySelector('#login-form');
  const forgotForm = document.querySelector('#forgot-form');

  const toLogin = document.querySelector('#to-login');
  const toSignup = document.querySelector('#to-signup');
  const backLoginBtn = document.querySelector('#back-login');
  const toForgot = document.querySelector('#to-forgot');

  // Safety: check required elements exist
  if (!overlay || !modal || !signupForm || !loginForm) {
    console.warn('Auth modal elements missing - check HTML IDs');
    return;
  }

  // Helper to open modal and show specific form
  function openModal(show = 'signup') {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    if (show === 'signup') {
      signupForm.classList.add('active');
      loginForm.classList.remove('active');
      forgotForm.style.display = 'none';
      loginForm.classList.remove('blur');
    } else if (show === 'login') {
      loginForm.classList.add('active');
      signupForm.classList.remove('active');
      forgotForm.style.display = 'none';
      loginForm.classList.remove('blur');
    }
  }

  function closeModalFunc() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    // reset forms of any error messages if you want
    document.querySelectorAll('.error-message').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }

  // Open modal handlers
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('signup');
    });
  }
  if (signinBtn) {
    signinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('login');
    });
  }

  // Switch forms inside modal
  toLogin && toLogin.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('login');
  });
  toSignup && toSignup.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('signup');
  });

  // Close modal
  closeModal && closeModal.addEventListener('click', closeModalFunc);
  overlay && overlay.addEventListener('click', closeModalFunc);

  // Forgot password toggle
  toForgot && toForgot.addEventListener('click', (e) => {
    e.preventDefault();
    forgotForm.style.display = 'block';
    loginForm.classList.add('blur');
  });
  backLoginBtn && backLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    forgotForm.style.display = 'none';
    loginForm.classList.remove('blur');
  });

  // Generic validation helper
  function removeOldErrors(form) {
    form.querySelectorAll('.error-message').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  }
  function showErrorAfter(inputEl, message) {
    inputEl.classList.add('error');
    const msg = document.createElement('p');
    msg.className = 'error-message';
    msg.innerText = message;
    inputEl.insertAdjacentElement('afterend', msg);
  }

  // ----------------------------------------REGISTER handler ---------------------------------------------------------
  signupForm && signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    removeOldErrors(signupForm);

    const username = signupForm.querySelector('#signup-username');
    const email = signupForm.querySelector('#signup-email');
    const password = signupForm.querySelector('#signup-password');

    let isValid = true;
    if (!username.value.trim()) { showErrorAfter(username, 'Vui lòng nhập tên người dùng'); isValid = false; }
    if (!email.value.trim()) { showErrorAfter(email, 'Vui lòng nhập email'); isValid = false; }
    if (!password.value.trim()) { showErrorAfter(password, 'Vui lòng nhập mật khẩu'); isValid = false; }
    if (!isValid) return;

    // gửi request đến backend
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: username.value.trim(),
          email: email.value.trim(),
          password: password.value.trim()
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Đăng ký thành công!');
        if (data.user) {
          try { 
            localStorage.setItem('user', JSON.stringify(data.user)); 
          } catch (e) { 
            console.warn('Không thể lưu user vào localStorage', e); 
          }
        }
        signupForm.reset();
        openModal('login'); // chuyển sang form login
      } else {
        alert(data.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      console.error('Register error:', err);
      alert('Lỗi kết nối server!');
    }
  });

  // --------------------------------------------- LOGIN handler ------------------------------------------------------------
  loginForm && loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    removeOldErrors(loginForm);

    const username = loginForm.querySelector('#login-email');
    const password = loginForm.querySelector('#login-password');

    let isValid = true;
    if (!username.value.trim()) { showErrorAfter(username, 'Vui lòng nhập tên hoặc email'); isValid = false; }
    if (!password.value.trim()) { showErrorAfter(password, 'Vui lòng nhập mật khẩu'); isValid = false; }
    if (!isValid) return;

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: username.value.trim(),
          password: password.value.trim()
        })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        // save user info returned by backend so homepage can show the name
        if (data.user) {
          try { 
            localStorage.setItem('user', JSON.stringify(data.user)); 
          } catch (e) { 
            console.warn('Không thể lưu user vào localStorage', e); 
          }
        }
        alert('Đăng nhập thành công!');
        loginForm.reset();
        closeModalFunc();
        // chuyển trang đến dashboard
        console.log('Redirecting to HomePage...');
        window.location.href = './public/HomePage.html';
      } else {
        alert(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Lỗi kết nối server!');
    }
  });

  //-------------------------------------------------- Forgot pass handler---------------------------------------------------------------
forgotForm&&forgotForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  removeOldErrors(forgotForm);

  const emailInput = forgotForm.querySelector('#forgot-email');
  const oldPasswordInput = forgotForm.querySelector('#forgot-old');
  const newPasswordInput = forgotForm.querySelector('#forgot-new');

  let isValid = true;
  if (!emailInput.value.trim()) { showErrorAfter(emailInput, 'Vui lòng nhập email'); isValid = false; }
  if (!oldPasswordInput.value.trim()) { showErrorAfter(oldPasswordInput, 'Vui lòng nhập mật khẩu hiện tại'); isValid = false; }
  if (!newPasswordInput.value.trim()) { showErrorAfter(newPasswordInput, 'Vui lòng nhập mật khẩu mới'); isValid = false; }
  if (!isValid) return;

  try {
    const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput.value.trim(),
        oldPassword: oldPasswordInput.value.trim(),
        newPassword: newPasswordInput.value.trim()
      })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Đổi mật khẩu thành công! Hãy đăng nhập lại.');
      forgotForm.reset();
      forgotForm.style.display = 'none';
      loginForm.classList.remove('blur');
    } else {
      alert(data.message || 'Không thể đổi mật khẩu');
    }
  } catch (err) {
    console.error('Forgot password error:', err);
    alert('Lỗi kết nối server!');
  }
});
});