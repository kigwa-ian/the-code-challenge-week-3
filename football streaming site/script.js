document.addEventListener('DOMContentLoaded', () => {
    const matchSchedule = [
      { time: '14:00', teams: 'Arsenal fc vs Real Madrid' },
      { time: '16:00', teams: 'Man U vs BvB' },
      { time: '18:00', teams: 'Barcelona vs Atletico' }
    ];
  
    const scheduleElement = document.getElementById('match-schedule');
    
    matchSchedule.forEach(match => {
      const listItem = document.createElement('li');
      listItem.textContent = `${match.time} - ${match.teams}`;
      scheduleElement.appendChild(listItem);
    });
  });
  