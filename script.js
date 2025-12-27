let tasks = [];
let chart;

function addTask() {
  const subject = document.getElementById("subject").value;
  const goal = document.getElementById("goal").value;
  const time = Number(document.getElementById("time").value);
  const priority = document.getElementById("priority").value;

  if (!subject || !goal || !time) return alert("Remplis tout !");

  tasks.push({ subject, goal, time, priority, done: false });
  render();
}

function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  render();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  render();
}

function render() {
  const table = document.getElementById("taskTable");
  table.innerHTML = "";

  tasks.forEach((t, i) => {
    table.innerHTML += `
      <tr>
        <td><input type="checkbox" ${t.done ? "checked" : ""} onclick="toggleDone(${i})"></td>
        <td>${t.subject}</td>
        <td>${t.goal}</td>
        <td>${t.time}h</td>
        <td>${t.priority}</td>
        <td>
          <div class="progress-bar">
            <div class="progress ${t.priority}" style="width:${t.done ? 100 : 0}%">
              ${t.done ? "100%" : ""}
            </div>
          </div>
        </td>
        <td><button onclick="deleteTask(${i})">🗑</button></td>
      </tr>
    `;
  });

  updateChart();
}

function updateChart() {
  const data = {};

  tasks.forEach(t => {
    if (t.done) {
      data[t.subject] = (data[t.subject] || 0) + t.time;
    }
  });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(data),
      datasets: [{
        data: Object.values(data),
        backgroundColor: [
          "#d63384", "#f2c94c", "#6fcf97",
          "#bb86fc", "#ff9f1c"
        ]
      }]
    },
    options: {
      plugins: { legend: { position: "bottom" } }
    }
  });
}
