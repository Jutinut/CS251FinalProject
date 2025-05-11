function showRegister() {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("registerBox").classList.remove("hidden");
  }
  
  function showLogin() {
    document.getElementById("registerBox").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
  }

  function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  input.type = input.type === "password" ? "text" : "password";
}
