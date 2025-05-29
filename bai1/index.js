function toggleHint() {
    const hintContent = document.getElementById("hint-content");
    const hintIcon = document.getElementById("hint-icon");
    
    hintContent.classList.toggle("show");
    hintIcon.textContent = hintContent.classList.contains("show") ? "▲" : "▼";
}
let calculateResult = () => {
    // Lấy điểm chuẩn
    let benchmarkScore = parseFloat(document.getElementById("benchmarkscorce").value);
    console.log("Benchmark score is:", benchmarkScore);
    
    // Lấy điểm 3 môn
    let subject1 = parseFloat(document.getElementById("number1").value);
    let subject2 = parseFloat(document.getElementById("number2").value);
    let subject3 = parseFloat(document.getElementById("number3").value);
    console.log("Subject scores:", subject1, subject2, subject3);
    
    // Kiểm tra điểm ưu tiên khu vực
    let area = document.getElementById("area");
    let areaValue = area.options[area.selectedIndex].value;
    if (areaValue === "A") {
        areaValue = 2;
    } else if (areaValue === "B") {
        areaValue = 1;
    } else if (areaValue === "C") {
        areaValue = 0.5;
    } else {
        areaValue = 0;
    }
    console.log("Khu vuc uu tien:", areaValue);
    
    // Kiểm tra điểm ưu tiên đối tượng (đã sửa theo đúng đề bài)
    let priority = document.getElementById("priority");
    let priorityValue = priority.options[priority.selectedIndex].value;
    if (priorityValue === "1") {
        priorityValue = 2.5;
    } else if (priorityValue === "2") {
        priorityValue = 1.5;
    } else if (priorityValue === "3") {
        priorityValue = 1;
    } else {
        priorityValue = 0;
    }
    console.log("Doi tuong uu tien:", priorityValue);
    
    // Tính TỔNG điểm (không phải trung bình)
    let totalScore = subject1 + subject2 + subject3 + priorityValue + areaValue;
    document.getElementById("result").innerHTML = "Total score: " + totalScore.toFixed(2);
    
    // Kiểm tra điều kiện trúng tuyển
    const hasZeroScore = subject1 === 0 || subject2 === 0 || subject3 === 0;
    const meetsBenchmark = totalScore >= benchmarkScore;
    
    if (meetsBenchmark && !hasZeroScore) {
        document.getElementById("feedback").innerHTML = 
            "Congratulations! You have passed. <br>" +
            `Total score: ${totalScore.toFixed(2)} (Benchmark: ${benchmarkScore}) <br>` +
            "No subjects with 0 points";
    } else {
        let failReason = "Sorry, you did not pass. Reason: ";
        
        if (!meetsBenchmark) {
            failReason += `Total score ${totalScore.toFixed(2)} is below benchmark ${benchmarkScore}. `;
        }
        if (hasZeroScore) {
            failReason += "You have at least one subject with 0 points. ";
        }
        
        document.getElementById("feedback").innerHTML = failReason;
    }
}