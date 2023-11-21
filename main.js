let events =  [];
let arr = []; // Cargar Info

const eventName = document.querySelector('#eventName');
let eventDate = document.querySelector('#eventDate');
const addBtn = document.querySelector('#bAdd');
const eventsContainer = document.querySelector('#tasksContainer');

const json = load();

try {
    arr = JSON.parse(json);
} catch (error) {
  arr = []
}
events = arr ? [...arr] : [];
renderEvents();

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  addEvent();
})
addBtn.addEventListener('click', e => {
  e.preventDefault();
  addEvent();
})

function addEvent(){
  if(eventName.value === "" || eventDate.value === "") {
    return;
  }
  if (dateDiff(eventDate.value) < 0 ) {
    return;
  }

  const newEvent = {
    id: (Math.random() * 100).toString().slice(2),
    name: eventName.value,
    date: eventDate.value,
  }

  events.unshift(newEvent);
  save(JSON.stringify(events));

  eventName.value = "";

  renderEvents();
}

function dateDiff(d) {
  const now = new Date(); 
  let eventDate = new Date(d);  // Mueve esta línea aquí para obtener la fecha actual primero
  const difference = eventDate.getTime() - now.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}


function renderEvents() {
  const eventHTML = events.map( event => {
    return `
        <div> 
          <div> 
            <span class="days-number">${dateDiff(event.date)}</span>
            <span class="days-number">Días</span>
          </div>

          <div class="event-name">${event.name}</div>
          <div class="event-date">${event.date}</div>
          <div class="event-name">
              <button class="btnDelete" data-id="${event.id}">Eliminar</buttom>
          </div>
        </div>
    `;
  });
  eventsContainer.innerHTML = eventHTML.join("");
  document.querySelectorAll('.btnDelete').forEach( button => {
    button.addEventListener('click', e => {
      const id = button.getAttribute('data-id');
      events = events.filter((e) => e.id !== id);
      renderEvents();
    })
  })
}

function save(data) {
  localStorage.setItem('items', data);
} 

function load() {
  localStorage.getItem('items');
}