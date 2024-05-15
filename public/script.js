document.addEventListener('DOMContentLoaded', () => {
  const deleteBtns = document.querySelectorAll('.delete-btn');
  const editBtns = document.querySelectorAll('.edit-btn');
  const modal = document.getElementById('editModal');
  const closeButton = document.querySelector('.close-button');
  const editForm = document.querySelector('.edit-todo-form');
  const editTodoId = document.getElementById('editTodoId');
  const editTodoText = document.getElementById('editTodoText');

  // Function to remove success message after animation
  function removeSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
      successMessage.addEventListener('animationend', () => {
        successMessage.remove();
      });
    }
  }

  // Call the function to remove success message on page load
  removeSuccessMessage();

  // Handling Delete Button Clicks
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault(); // Prevent default form submission
      const todoId = e.currentTarget.getAttribute('data-id'); // Get the data-id attribute
      const todoItem = e.currentTarget.closest('.todo-item'); // Get the closest .todo-item

      const confirmDelete = confirm('Are you sure you want to delete this item?');
      if (!confirmDelete) return;

      try {
        const response = await fetch(`/todos/${todoId}`, { method: 'DELETE' });
        if (response.ok) {
          todoItem.remove();
          // Display success message
          const successMessage = document.createElement('p');
          successMessage.className = 'success-message delete';
          successMessage.textContent = 'Item deleted successfully!';
          document.body.insertBefore(successMessage, document.body.firstChild);

          // Call the function to remove success message
          removeSuccessMessage();
        } else {
          console.error('Failed to delete todo item');
        }
      } catch (error) {
        console.error('Error deleting todo item:', error);
      }
    });
  });

  // Handling Edit Button Clicks
  editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const todoId = e.currentTarget.getAttribute('data-id');
      const todoText = e.currentTarget.closest('.todo-item').querySelector('.todo-text').innerText;

      editTodoId.value = todoId;
      editTodoText.value = todoText;

      modal.style.display = 'block';
    });
  });

  // Handling Modal Close Button Click
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Handling Outside Clicks to Close Modal
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });

  // Handling Edit Form Submission
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const todoId = editTodoId.value;
    const todoText = editTodoText.value.trim();

    if (todoText === '') {
      alert('Todo text cannot be empty');
      return;
    }

    try {
      const response = await fetch(`/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: todoText })
      });

      if (response.ok) {
        const todoItem = document.querySelector(`button[data-id="${todoId}"]`).closest('.todo-item');
        todoItem.querySelector('.todo-text').innerText = todoText;
        modal.style.display = 'none';

        // Display success message
        const successMessage = document.createElement('p');
        successMessage.className = 'success-message edit';
        successMessage.textContent = 'Item edited successfully!';
        document.body.insertBefore(successMessage, document.body.firstChild);

        // Call the function to remove success message
        removeSuccessMessage();
      } else {
        console.error('Failed to update todo item');
      }
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  });
});
