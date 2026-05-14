function hesaplaNot() {
    const adSoyad = document.getElementById('adSoyad').value;
    const vize = parseFloat(document.getElementById('vizeNot').value);
    const final = parseFloat(document.getElementById('finalNot').value);

    if (!adSoyad || isNaN(vize) || isNaN(final)) {
        alert('Lütfen tüm alanları geçerli şekilde doldurunuz.');
        return;
    }

    if (vize < 0 || vize > 100 || final < 0 || final > 100) {
        alert('Notlar 0 ile 100 arasında olmalıdır.');
        return;
    }

    const ortalama = (vize * 0.4) + (final * 0.6);
    
    let harfNotu = 'FF';
    if (ortalama >= 90) harfNotu = 'AA';
    else if (ortalama >= 85) harfNotu = 'BA';
    else if (ortalama >= 80) harfNotu = 'BB';
    else if (ortalama >= 70) harfNotu = 'CB'; // Based on the screenshot example where 60.00 is CB, let's adjust:
    else if (ortalama >= 60) harfNotu = 'CB'; 
    else if (ortalama >= 55) harfNotu = 'CC';
    else if (ortalama >= 50) harfNotu = 'DC';
    else harfNotu = 'FF';

    const durum = (ortalama >= 50) ? 'Geçti' : 'Kaldı';

    document.getElementById('sonucAd').innerText = adSoyad;
    document.getElementById('sonucOrtalama').innerText = ortalama.toFixed(2);
    document.getElementById('sonucHarf').innerText = harfNotu;
    document.getElementById('sonucDurum').innerText = durum;
    
    document.getElementById('notSonuc').style.display = 'block';
}

function hesaplaBirim() {
    const deger = parseFloat(document.getElementById('deger').value);
    const donusumTipi = document.getElementById('donusumTipi').value;
    
    if (isNaN(deger)) {
        alert('Lütfen dönüştürülecek bir değer giriniz.');
        return;
    }

    let sonuc = 0;

    switch (donusumTipi) {
        case 'c2f':
            sonuc = (deger * 9 / 5) + 32;
            break;
        case 'f2c':
            sonuc = (deger - 32) * 5 / 9;
            break;
        case 'c2k':
            sonuc = deger + 273.15;
            break;
        case 'k2c':
            sonuc = deger - 273.15;
            break;
        case 'm2km':
            sonuc = deger / 1000;
            break;
        case 'km2m':
            sonuc = deger * 1000;
            break;
        case 'm2mil':
            sonuc = deger * 0.000621371;
            break;
        case 'kg2g':
            sonuc = deger * 1000;
            break;
        case 'g2kg':
            sonuc = deger / 1000;
            break;
        default:
            sonuc = 0;
            break;
    }

    // Number formatting: display up to 3 decimal places
    let formatliSonuc = sonuc.toLocaleString('tr-TR', { maximumFractionDigits: 3 });
    
    document.getElementById('sonucDeger').innerText = formatliSonuc;
    document.getElementById('birimSonuc').style.display = 'block';
}
