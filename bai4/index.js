function toggleConnectionInput() {
    const connectionGroup = document.getElementById('connectionGroup');
    const isBusiness = document.getElementById('business').checked;
    
    if (isBusiness) {
        connectionGroup.classList.remove('hidden');
        document.getElementById('connections').required = true;
    } else {
        connectionGroup.classList.add('hidden');
        document.getElementById('connections').required = false;
    }
}

function calculateBill() {
    // Lấy dữ liệu từ form
    const customerId = document.getElementById('customerId').value;
    const isResidential = document.getElementById('residential').checked;
    const premiumChannels = parseInt(document.getElementById('premiumChannels').value);
    const connections = isResidential ? 0 : parseInt(document.getElementById('connections').value);
    
    // Validate input
    if (!customerId || isNaN(premiumChannels) || premiumChannels < 0 || 
        (!isResidential && (isNaN(connections) || connections < 0))) {
        alert('Vui lòng nhập đầy đủ thông tin chính xác');
        return;
    }
    
    // Tính toán hóa đơn
    let bill = {
        processingFee: 0,
        basicServiceFee: 0,
        premiumChannelsFee: 0,
        additionalConnectionsFee: 0,
        total: 0
    };
    
    if (isResidential) {
        // Tính cho khách hàng nhà dân
        bill.processingFee = 4.5;
        bill.basicServiceFee = 20.5;
        bill.premiumChannelsFee = premiumChannels * 7.5;
    } else {
        // Tính cho khách hàng doanh nghiệp
        bill.processingFee = 15;
        bill.basicServiceFee = 75;
        bill.premiumChannelsFee = premiumChannels * 50;
        
        // Tính phí kết nối thêm
        if (connections > 10) {
            bill.additionalConnectionsFee = (connections - 10) * 5;
        }
    }
    
    // Tính tổng
    bill.total = bill.processingFee + bill.basicServiceFee + 
                bill.premiumChannelsFee + bill.additionalConnectionsFee;
    
    // Hiển thị kết quả
    displayBill(customerId, isResidential, bill);
}

function displayBill(customerId, isResidential, bill) {
    const resultDiv = document.getElementById('result');
    let html = `
        <h3>HÓA ĐƠN DỊCH VỤ CÁP</h3>
        <p><strong>Mã khách hàng:</strong> ${customerId}</p>
        <p><strong>Loại khách hàng:</strong> ${isResidential ? 'Nhà dân' : 'Doanh nghiệp'}</p>
        <hr>
        <p><strong>Phí xử lý hóa đơn:</strong> $${bill.processingFee.toFixed(2)}</p>
        <p><strong>Phí dịch vụ cơ bản:</strong> $${bill.basicServiceFee.toFixed(2)}</p>
    `;
    
    if (!isResidential) {
        html += `<p><strong>Phí kết nối thêm:</strong> $${bill.additionalConnectionsFee.toFixed(2)}</p>`;
    }
    
    html += `
        <p><strong>Phí kênh cao cấp:</strong> $${bill.premiumChannelsFee.toFixed(2)}</p>
        <hr>
        <h4><strong>TỔNG CỘNG:</strong> $${bill.total.toFixed(2)}</h4>
    `;
    
    resultDiv.innerHTML = html;
    
}

// Ẩn ô số kết nối khi tải trang (nếu chọn nhà dân)
document.addEventListener('DOMContentLoaded', function() {
    toggleConnectionInput();
});