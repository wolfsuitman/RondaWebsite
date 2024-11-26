const terminalModal = document.querySelector(".terminal-modal");
const terminal = document.querySelector(".terminal");

terminal.addEventListener("click", (e) => {
  e.stopPropagation();
});

function closeTerminal() {
  terminalModal.style.display = "none";
}

function openTerminal() {
  terminalModal.style.display = "flex";
}

function stopPropagation(e) {}
