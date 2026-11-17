
    function validateRegister(event) {
      event.preventDefault();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const message = document.getElementById('error-message');
      const namePattern = /^[\p{L}][\p{L}\p{M} .'-]*$/u;

      if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
        message.textContent = 'Please enter valid first and last names.';
        return false;
      }

      // This is a static website: no submissions are transmitted or stored.
      message.textContent = 'Suggestions are not being sent yet. The form needs a backend or form service.';
      return false;
    }
  