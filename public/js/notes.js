const notesEventHandler = async (event) => {
    event.preventDefault();
    const notes = document.querySelector("#input-notes").value.trim();
    const form = document.querySelector(".notes-form");
    const id = form.getAttribute("data-id");
  
    if (notes) {
      const response = await fetch(`/api/notes/${id}`, {
        method: "POST",
        body: JSON.stringify({ notes }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        alert("Failure adding notes.");
      }
    }
    if (!notes) {
      alert("Enter a note.");
    }
  };

  document
  .quertySelector(".")
  .addEventListener("submit", notesEventHandler);