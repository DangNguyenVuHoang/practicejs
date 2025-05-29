function calculateTax() {
    // Lấy dữ liệu từ form
    const name = document.getElementById('name').value;
    const income = parseFloat(document.getElementById('income').value);
    const dependents = parseInt(document.getElementById('dependents').value);
    
    // Validate input
    if (!name || isNaN(income) || isNaN(dependents)) {
        alert('Vui lòng nhập đầy đủ thông tin chính xác');
        return;
    }
    
    // Tính thu nhập chịu thuế
    const taxableIncome = income - 4 - (dependents * 1.6);
    if (taxableIncome <= 0) {
        document.getElementById('result').innerHTML = `
            <h3>Kết quả tính thuế</h3>
            <p><strong>${name}</strong> không có thu nhập chịu thuế.</p>
            <p>Thu nhập chịu thuế: 0 triệu đồng</p>
        `;
        return;
    }
    
    // Tính thuế theo bậc
    let tax = 0;
    
    if (taxableIncome <= 60) {
        tax = taxableIncome * 0.05;
    } else if (taxableIncome <= 120) {
        tax = 60 * 0.05 + (taxableIncome - 60) * 0.1;
    } else if (taxableIncome <= 210) {
        tax = 60 * 0.05 + 60 * 0.1 + (taxableIncome - 120) * 0.15;
    } else if (taxableIncome <= 384) {
        tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + (taxableIncome - 210) * 0.2;
    } else if (taxableIncome <= 624) {
        tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + 174 * 0.2 + (taxableIncome - 384) * 0.25;
    } else if (taxableIncome <= 960) {
        tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + 174 * 0.2 + 240 * 0.25 + (taxableIncome - 624) * 0.3;
    } else {
        tax = 60 * 0.05 + 60 * 0.1 + 90 * 0.15 + 174 * 0.2 + 240 * 0.25 + 336 * 0.3 + (taxableIncome - 960) * 0.35;
    }
    
    // Hiển thị kết quả
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h3>Kết quả tính thuế</h3>
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Tổng thu nhập:</strong> ${income.toLocaleString('vi-VN')} triệu đồng</p>
        <p><strong>Số người phụ thuộc:</strong> ${dependents}</p>
        <p><strong>Thu nhập chịu thuế:</strong> ${taxableIncome.toLocaleString('vi-VN')} triệu đồng</p>
        <p><strong>Số thuế phải nộp:</strong> <span style="color:red;font-weight:bold">${tax.toLocaleString('vi-VN')} triệu đồng</span></p>
    `;
}