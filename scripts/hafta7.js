// ============================================================
//  hafta7.js  –  Tema değiştirme & Form özeti üretme
// ============================================================

// ---- 1) TEMA DEĞİŞTİRME -----------------------------------------------

const temaButonu = document.getElementById("temaButonu");
const body = document.body;

// Sayfa açılırken önceki tema tercihini uygula
if (localStorage.getItem("tema") === "dark") {
    body.classList.add("dark-theme");
    temaButonu.textContent = "☀️ Açık Temaya Geç";
    temaButonu.classList.replace("btn-outline-dark", "btn-outline-light");
}

temaButonu.addEventListener("click", function () {
    body.classList.toggle("dark-theme");

    const isDark = body.classList.contains("dark-theme");
    temaButonu.textContent = isDark ? "☀️ Açık Temaya Geç" : "🌙 Koyu Temaya Geç";

    if (isDark) {
        temaButonu.classList.replace("btn-outline-dark", "btn-outline-light");
    } else {
        temaButonu.classList.replace("btn-outline-light", "btn-outline-dark");
    }

    // Tercihi localStorage'a kaydet
    localStorage.setItem("tema", isDark ? "dark" : "light");
});


// ---- 2) FORM ÖZET ÜRETME -----------------------------------------------

const basvuruFormu = document.getElementById("basvuruFormu");
const sonucAlani = document.getElementById("sonucAlani");
const uyariAlani = document.getElementById("uyariAlani");
const temizleButonu = document.getElementById("temizleButonu");

basvuruFormu.addEventListener("submit", function (event) {
    // Sayfanın yenilenmesini engelle
    event.preventDefault();

    // Uyarı alanını gizle
    uyariAlani.classList.remove("show");

    // Form değerlerini al
    const adSoyad = document.getElementById("adSoyad").value.trim();
    const eposta = document.getElementById("eposta").value.trim();
    const bolum = document.getElementById("bolum").value.trim();
    const sinif = document.getElementById("sinif").value;
    const oturum = document.getElementById("oturum").value;
    const katilimTuru = document.getElementById("katilimTuru").value;
    const mesaj = document.getElementById("mesaj").value.trim();
    const kvkk = document.getElementById("kvkk").checked;

    // Eksik alan kontrolü
    const eksikler = [];
    if (!adSoyad) eksikler.push("Ad Soyad");
    if (!eposta) eksikler.push("E-posta");
    if (!bolum) eksikler.push("Bölüm");
    if (!sinif) eksikler.push("Sınıf");
    if (!oturum) eksikler.push("Katılmak İstediğiniz Oturum");
    if (!katilimTuru) eksikler.push("Katılım Türü");
    if (!kvkk) eksikler.push("KVKK onayı");

    if (eksikler.length > 0) {
        uyariAlani.textContent = `⚠️ Lütfen şu alanları doldurun: ${eksikler.join(", ")}.`;
        uyariAlani.classList.add("show");
        sonucAlani.innerHTML = "";
        return;
    }

    // Başarılı: özet kartı üret
    const simdi = new Date();
    const tarihSaat = simdi.toLocaleString("tr-TR");

    sonucAlani.innerHTML = `
        <div class="card border-success ozet-kart shadow-sm">
            <div class="card-header bg-success text-white d-flex align-items-center gap-2">
                <span style="font-size:1.2rem;">✅</span>
                <strong>Başvuru Özeti</strong>
                <small class="ms-auto opacity-75">${tarihSaat}</small>
            </div>
            <div class="card-body">
                <table class="table table-borderless mb-0">
                    <tbody>
                        <tr>
                            <th scope="row" width="40%">👤 Ad Soyad</th>
                            <td>${escapeHtml(adSoyad)}</td>
                        </tr>
                        <tr>
                            <th scope="row">📧 E-posta</th>
                            <td>${escapeHtml(eposta)}</td>
                        </tr>
                        <tr>
                            <th scope="row">🏫 Bölüm</th>
                            <td>${escapeHtml(bolum)}</td>
                        </tr>
                        <tr>
                            <th scope="row">🎓 Sınıf</th>
                            <td>${escapeHtml(sinif)}</td>
                        </tr>
                        <tr>
                            <th scope="row">📅 Oturum</th>
                            <td>${escapeHtml(oturum)}</td>
                        </tr>
                        <tr>
                            <th scope="row">🏷️ Katılım Türü</th>
                            <td>${escapeHtml(katilimTuru)}</td>
                        </tr>
                        ${mesaj ? `
                        <tr>
                            <th scope="row">💬 Mesaj</th>
                            <td>${escapeHtml(mesaj)}</td>
                        </tr>` : ""}
                    </tbody>
                </table>
            </div>
            <div class="card-footer text-success small">
                🎉 Başvurunuz alınmıştır. Etkinlik günü iletişim kurulacaktır.
            </div>
        </div>
    `;

    // Sonuç alanına yumuşak kaydırma
    sonucAlani.scrollIntoView({ behavior: "smooth", block: "start" });
});


// ---- 3) FORMU TEMİZLE --------------------------------------------------

temizleButonu.addEventListener("click", function () {
    basvuruFormu.reset();
    sonucAlani.innerHTML = `
        <p class="text-secondary fst-italic">
            Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.
        </p>`;
    uyariAlani.classList.remove("show");
});


// ---- 4) YARDIMCI: XSS'e karşı HTML kaçış ----------------------------

function escapeHtml(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}
