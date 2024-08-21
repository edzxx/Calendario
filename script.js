document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.getElementById('calendario');
  const eventForm = document.getElementById('evento');
  const eventTitleInput = document.getElementById('tituloevento');
  const addEventButton = document.getElementById('addevento');
  const monthYearDisplay = document.getElementById('ano');
  const prevMonthButton = document.getElementById('voltames');
  const nextMonthButton = document.getElementById('proxmes');

  let selectedDay;
  let currentDate = new Date();
  let events = {};

  function renderCalendar() {
      calendar.innerHTML = '';
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      monthYearDisplay.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

      for (let i = 0; i < firstDay; i++) {
          const emptyCell = document.createElement('div');
          calendar.appendChild(emptyCell);
      }

      for (let i = 1; i <= daysInMonth; i++) {
          const day = document.createElement('div');
          day.classList.add('day');
          day.textContent = i;
          day.addEventListener('click', function() {
              selectedDay = i;
              eventForm.style.display = 'block';
          });

          const eventKey = `${year}-${month + 1}-${i}`;
          if (events[eventKey]) {
              const event = document.createElement('div');
              event.textContent = events[eventKey];
              event.classList.add('event');
              day.appendChild(event);
          }

          calendar.appendChild(day);
      }
  }

  prevMonthButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
  });

  nextMonthButton.addEventListener('click', function() {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
  });

  addEventButton.addEventListener('click', function() {
      if (selectedDay && eventTitleInput.value) {
          const year = currentDate.getFullYear();
          const month = currentDate.getMonth() + 1;
          const eventKey = `${year}-${month}-${selectedDay}`;
          events[eventKey] = eventTitleInput.value;

          renderCalendar();
          eventTitleInput.value = '';
          eventForm.style.display = 'none';
      }
  });

  renderCalendar();
});
