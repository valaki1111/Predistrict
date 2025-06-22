async function connectMetaMask() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask!");
    return null;
  }
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  return accounts[0];
}

async function login() {
  const walletAddress = await connectMetaMask();
  if (!walletAddress) return;

  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ walletAddress })
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem('walletAddress', walletAddress);
    window.location.href = '/dashboard.html';
  } else {
    alert('Login failed');
  }
}

document.getElementById('loginBtn').addEventListener('click', login);
