// オープニングアニメーション
window.addEventListener('load', () => {
    const opening = document.getElementById('opening');
    // 2.5秒後にフェードアウト開始
    setTimeout(() => {
        if (opening) {
            opening.classList.add('hidden');
        }
    }, 2500);
});

// ハンバーガーメニューの制御
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    // メニューの開閉
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
    });
}

if (navLinks) {
    // メニュー内のリンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });
}

// お問い合わせフォームの送信処理 (Formspree)
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);
        
        // 送信中ボタンを無効化
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = '送信中...';
        
        try {
            const response = await fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // 送信成功
                formStatus.style.display = 'block';
                formStatus.style.backgroundColor = '#d4edda';
                formStatus.style.color = '#155724';
                formStatus.innerHTML = 'お問い合わせありがとうございます。メッセージが送信されました。';
                form.reset();
            } else {
                // 送信エラー（サーバー側）
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    throw new Error(data["errors"].map(error => error["message"]).join(", "));
                } else {
                    throw new Error('送信に失敗しました。');
                }
            }
        } catch (error) {
            // ネットワークエラーなど
            formStatus.style.display = 'block';
            formStatus.style.backgroundColor = '#f8d7da';
            formStatus.style.color = '#721c24';
            formStatus.innerHTML = 'エラーが発生しました: ' + error.message;
        } finally {
            // ボタンを元に戻す
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}
