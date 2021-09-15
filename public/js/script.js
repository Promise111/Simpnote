const logoutForm = document.getElementById("logout");
// const homeAlert = document.getElementById("homeAlert");
const deleteNote = document.getElementById("deleteNote");
logoutForm
  ? logoutForm.addEventListener("click", () => logoutForm.submit())
  : null;
// homeAlert.addEventListener("click", () => alert('Hello'));
deleteNote.addEventListener("click", function () {
  return confirm(`Are you sure you want to delete?`);
}
);
