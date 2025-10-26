// Change slide
function showContent(event, id) {
    event.preventDefault();
    const boxs = document.querySelectorAll('.box-content');
    boxs.forEach(box => {
        box.style.display = "none";
    })

    document.getElementById(id).style.display ="block";

    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));

    event.target.closest("li").classList.add("active");
}

// Show name user
async function showName() {
    try {
        const raw = localStorage.getItem('user');
        const el = document.getElementById('name-signup');
        if (!el) return;
        if (!raw) {
            el.innerText = '';
            return;
        }
        const user = JSON.parse(raw);
        el.innerText = user.name || user.email || '';
    } catch (e) {
        console.warn('showName error', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const raw = localStorage.getItem('user');
        const el = document.getElementById('name-signup');
        if (!el) return;
        if (!raw) {
            el.innerText = '';
            return;
        }
        const user = JSON.parse(raw);
        el.innerText = user.name || user.email || '';
    } catch (e) {
        console.warn('Error filling name on homepage', e);
    }
});

// Show form logout
 function toggleLogoutForm() {
        const avt = document.getElementById("name-avt");
        avt.classList.toggle("active");
    }

document.addEventListener("click", function(e) {
    const avt = document.getElementById("name-avt");
     if (!avt.contains(e.target)) {
         avt.classList.remove("active");
    }
});

// Log out
document.addEventListener('DOMContentLoaded', () => {
    // đảm bảo nút tồn tại
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', async function (e) {
        e.preventDefault();

        try {
            // Nếu bạn lưu token dưới key 'token', xóa luôn
            localStorage.removeItem('user');
            localStorage.removeItem('token');

            const avt = document.getElementById("name-avt");
            if (avt) avt.classList.remove("active");

            window.location.href = '/Frontend/src/main.html';
        } catch (err) {
            console.error('Logout error', err);
            window.location.href = '/';
        }
    });
});