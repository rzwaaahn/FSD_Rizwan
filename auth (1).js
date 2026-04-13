console.log("JS LOADED ✅");

// 🔐 LOGIN MODE (login / subscribe)
let loginMode = "login";

// 🔐 LOGIN STATE
let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

// 🔓 OPEN LOGIN MODAL
function openLogin(mode = "login") {
  loginMode = mode;
  document.getElementById("loginModal").style.display = "flex";
}

// ❌ CLOSE LOGIN MODAL
function closeLogin() {
  document.getElementById("loginModal").style.display = "none";
}

// 🔐 LOGIN FUNCTION
function login() {
  const input = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (input === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  if (
    (input === "faiz" && password === "123") ||
    (input === "athul" && password === "123") ||
    (input === "nihal" && password === "123")
  ) {
    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");

    alert("Login successful! 🎉");
    closeLogin();

    // 🔥 ONLY open subscribe if user came from Subscribe button
    if (loginMode === "subscribe") {
      openSubscribe();
    }

  } else {
    alert("Invalid credentials ❌");
  }
}

// 🔓 LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  isLoggedIn = false;
  alert("Logged out successfully 👋");
  location.reload(); // refresh UI
}

// 🌐 SOCIAL LOGIN
function socialLogin(provider) {
  isLoggedIn = true;
  localStorage.setItem("isLoggedIn", "true");

  alert(provider + " login successful! 🎉");
  closeLogin();
}

// 💳 OPEN SUBSCRIBE
function openSubscribe() {
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    openLogin("subscribe"); // 🔥 important fix
    return;
  }

  document.getElementById("subscribeModal").style.display = "flex";
}

// ❌ CLOSE SUBSCRIBE
function closeSubscribe() {
  document.getElementById("subscribeModal").style.display = "none";
}

// 💰 PAYMENT
function payNow() {
  isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    closeSubscribe();
    openLogin("subscribe");
    return;
  }

  alert("Payment Successful! 🎉");
  closeSubscribe();
}

// 🔍 SEARCH (ENTER KEY ONLY)
function handleSearch(event) {
  if (event.key === "Enter") {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();

    if (!input) {
      alert("Please enter a recipe name");
      return;
    }

    if (input.length < 5) {
      alert("Please type full recipe name (e.g., Biryani)");
      return;
    }

    localStorage.setItem("searchItem", input);
    window.location.href = "ingredients.html";
  }
}

// 🖱️ CLOSE WHEN CLICKING OUTSIDE
window.onclick = function(event) {
  const loginModal = document.getElementById("loginModal");
  const subscribeModal = document.getElementById("subscribeModal");

  if (loginModal && event.target === loginModal) closeLogin();
  if (subscribeModal && event.target === subscribeModal) closeSubscribe();
};

// ⌨️ ESC CLOSE
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeLogin();
    closeSubscribe();
  }
});