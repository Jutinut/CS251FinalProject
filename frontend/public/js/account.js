  const editBtn = document.getElementById("editBtn");
  const inputs = document.querySelectorAll("#accountForm input");
  let userID = sessionStorage.getItem("userID");
  let userName = sessionStorage.getItem("userName");
  let userAddress = sessionStorage.getItem("userAddress");
  let userPhone = sessionStorage.getItem("userPhone");
  let isEditing = false;

  // โหลดข้อมูลจาก localStorage เมื่อเปิดหน้า
  window.addEventListener("DOMContentLoaded", function () {
    if (userName) document.getElementById("full-name").value = userName;
    if (userPhone) document.getElementById("phone").value = userPhone;
  });

editBtn.addEventListener("click", async function () {
    isEditing = !isEditing;

    inputs.forEach(input => {
        input.readOnly = !isEditing;
        if (isEditing) {
            input.required = true;
        } else {
            input.required = false;
        }
    });

    if (isEditing) {
        editBtn.textContent = "Save";
    } else {
        const name = document.getElementById('full-name').value;
        const phone = document.getElementById('phone').value;

        const CustId = userID;
        try {
            const response = await fetch(`http://localhost:3000/update/${CustId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: name,
                    Phone: phone
                })
            });
            sessionStorage.setItem('userName', name);
            sessionStorage.setItem('userPhone', phone);
            alert("ข้อมูลถูกบันทึกแล้ว ✅");
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Failed to update customer information.';
        }
        editBtn.textContent = "Edit";
    }
});
  
  if (userID && userName) {
    document.getElementById("user-name").textContent = userName;
    document.getElementById("user-id").textContent = "ID : " + userID;
  }
  
  function logout() {
    if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
      sessionStorage.clear();
      window.location.href = "login.html";
    }
  }