// ===== GET ELEMENTS =====
const form = document.getElementById("interviewForm");
const tableBody = document.getElementById("interviewTableBody");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const message = document.getElementById("message");


let editId = null;

// ===== LOCAL STORAGE HELPERS =====
function getInterviews() {
  return JSON.parse(localStorage.getItem("interviews")) || [];
}

function saveInterviews(data) {
  localStorage.setItem("interviews", JSON.stringify(data));
}

// ===== LOAD INTERVIEWS =====
function loadInterviews() {
  const data = getInterviews();
  tableBody.innerHTML = "";

  const filterValue = statusFilter ? statusFilter.value : "All";
  const searchText = searchInput ? searchInput.value.toLowerCase() : "";

  const filteredData = data.filter(i => {
    const matchesStatus =
      filterValue === "All" || i.status === filterValue;

    const matchesSearch =
      i.candidateName.toLowerCase().includes(searchText);

    return matchesStatus && matchesSearch;
  });

  filteredData.forEach((interview, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${interview.candidateName}</td>
      <td>${interview.role}</td>
      <td>${interview.date}</td>
      <td class="${interview.status.toLowerCase()}">${interview.status}</td>
      <td>
        <button onclick="editInterview(${index})">✏️</button>
        <button onclick="deleteInterview(${index})">🗑️</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// ===== EVENT LISTENERS (SAFE) =====
window.addEventListener("DOMContentLoaded", function () {
  loadInterviews();

  if (statusFilter) {
    statusFilter.addEventListener("change", loadInterviews);
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", loadInterviews);
  }
});

// ===== ADD / UPDATE INTERVIEW =====
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const interviews = getInterviews();

  const interviewData = {
    candidateName: document.getElementById("candidateName").value,
    role: document.getElementById("role").value,
    date: document.getElementById("date").value,
    status: document.getElementById("status").value
  };

 const isEdit = editId !== null;

if (editId === null) {
  interviews.push(interviewData);
} else {
  interviews[editId] = interviewData;
  editId = null;
}

saveInterviews(interviews);

// SUCCESS MESSAGE
message.textContent = isEdit
  ? "Interview updated successfully ✏️"
  : "Interview saved successfully ✅";

message.style.color = "green";

setTimeout(() => {
  message.textContent = "";
}, 2000);

// Remove message after 2 seconds
setTimeout(() => {
  message.textContent = "";
}, 2000);

  form.reset();
  loadInterviews();
});

// ===== DELETE INTERVIEW =====
function deleteInterview(index) {
  if (!confirm("Delete this interview?")) return;

  const interviews = getInterviews();
  interviews.splice(index, 1);
  saveInterviews(interviews);
  loadInterviews();
}

// ===== EDIT INTERVIEW =====
function editInterview(index) {
  const interviews = getInterviews();
  const data = interviews[index];

  editId = index;
  document.getElementById("candidateName").value = data.candidateName;
  document.getElementById("role").value = data.role;
  document.getElementById("date").value = data.date;
  document.getElementById("status").value = data.status;
}
