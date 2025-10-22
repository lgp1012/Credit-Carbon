
    const signupBtn = document.querySelector('#signup-btn');
    const overlay = document.querySelector('#overlay');
    const modal = document.querySelector('#auth-modal');
    const closeModal = document.querySelector('#close-modal');

    const signupForm = document.querySelector('#signup-form');
    const loginForm = document.querySelector('#login-form');
    const toLogin = document.querySelector('#to-login');
    const toSignup = document.querySelector('#to-signup');

    //Show modal when click button "Đăng kí"
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.display = 'block';
        modal.style.display = 'block';
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    //Change to sign in form
    toLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
    });

    //Change to sign up form
    toSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
    });

    //Close modal
    closeModal.addEventListener('click', () => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    });


    const signupFormEl = document.querySelector('#signup-form');

    signupFormEl.addEventListener('submit', (e) => {
        e.preventDefault(); // Ngăn form reload trang

        // Lấy các input
        const username = document.querySelector('#signup-username');
        const email = document.querySelector('#signup-email');
        const password = document.querySelector('#signup-password');

        // Xóa thông báo lỗi cũ
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        [username, email, password].forEach(input => input.classList.remove('error'));

        let isValid = true;

        // Hàm kiểm tra trống
        function checkEmpty(input, message) {
            if (input.value.trim() === '') {
                input.classList.add('error');
                const msg = document.createElement('p');
                msg.className = 'error-message';
                msg.innerText = message;
                input.insertAdjacentElement('afterend', msg);
                isValid = false;
            }
        }

        // Kiểm tra từng ô
        checkEmpty(username, 'Vui lòng nhập tên người dùng');
        checkEmpty(email, 'Vui lòng nhập email');
        checkEmpty(password, 'Vui lòng nhập mật khẩu');

        // Nếu hợp lệ → xử lý tiếp
        if (isValid) {
            alert('Đăng ký thành công ');
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
            signupFormEl.reset();
        }
    });



//Forgot pass
const toForgot = document.querySelector('#to-forgot');
const forgotForm = document.querySelector('#forgot-form');
const loginFormOverlay = document.querySelector('#login-form');
const backLoginBtn = document.querySelector('#back-login');

toForgot.addEventListener('click', (e) => {
  e.preventDefault();
  forgotForm.style.display = 'block';
  loginFormOverlay.classList.add('blur');
});

backLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  forgotForm.style.display = 'none';
  loginFormOverlay.classList.remove('blur');
});

forgotForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = document.querySelector('#forgot-username');
  const oldPass = document.querySelector('#forgot-old');
  const newPass = document.querySelector('#forgot-new');

  if (
    user.value.trim() === '' ||
    oldPass.value.trim() === '' ||
    newPass.value.trim() === ''
  ) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  alert('Đổi mật khẩu thành công! Quay lại đăng nhập.');
  forgotForm.style.display = 'none';
  loginFormOverlay.classList.remove('blur');
  forgotForm.reset();
});
