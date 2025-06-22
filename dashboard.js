async function loadDashboard() {
  try {
    const res = await fetch('/api/dashboard');
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();

    document.getElementById('questionsLeft').textContent = data.questionsLeft;
    document.getElementById('activePackage').textContent = `${data.activePackage.name} (expires ${data.activePackage.expires})`;
    document.getElementById('rankPosition').textContent = data.rankPosition;

    const leaderboardEl = document.getElementById('leaderboardList');
    leaderboardEl.innerHTML = '';
    data.leaderboard.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.username} - ${user.points} pts`;
      leaderboardEl.appendChild(li);
    });
  } catch (error) {
    console.error('Failed to load dashboard:', error);
    document.querySelector('.dashboard').textContent = 'Failed to load dashboard data.';
  }
}

loadDashboard();
