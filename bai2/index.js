function calculateBill() {
    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const kw = parseInt(document.getElementById('kw').value);
    
    // Tính tiền điện
    let total = 0;
    
    if (kw <= 50) {
        total = kw * 500;
    } else if (kw <= 100) {
        total = 50 * 500 + (kw - 50) * 650;
    } else if (kw <= 200) {
        total = 50 * 500 + 50 * 650 + (kw - 100) * 850;
    } else if (kw <= 350) {
        total = 50 * 500 + 50 * 650 + 100 * 850 + (kw - 200) * 1100;
    } else {
        total = 50 * 500 + 50 * 650 + 100 * 850 + 150 * 1100 + (kw - 350) * 1300;
    }
    
    // Hiển thị kết quả
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Kết quả tính toán</h3>
        <p>Tên khách hàng: <strong>${name}</strong></p>
        <p>Số Kw tiêu thụ: <strong>${kw} Kw</strong></p>
        <p>Tiền điện phải trả: <strong>${total.toLocaleString('vi-VN')} VNĐ</strong></p>
    `;
}