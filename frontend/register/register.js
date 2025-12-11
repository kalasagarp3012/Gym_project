/*document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value,
        specialization: document.getElementById("specialization").value,
        experience: document.getElementById("experience").value,
        certification: document.getElementById("certification").value
    };

    console.log("Sending data:", data);

    const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        alert("User Registered Successfully!");
    } else {
        alert("Registration Failed!");
    }
});
*/
 //elements
const form = document.getElementById('registerForm');
    const role = document.getElementById('role');
    const trainerSection = document.getElementById('trainerSection');
    const spinner = document.getElementById('spinner');
    const successMsg = document.getElementById('successMsg');
    const errorMsg = document.getElementById('errorMsg');

    // Toggle trainer fields
    role.addEventListener('change', () => {
      trainerSection.style.display = role.value === 'TRAINER' ? 'block' : 'none';
    });

    // Helper: show message
    function showMessage(el, text) {
      el.textContent = text;
      el.style.display = 'block';
      setTimeout(()=> el.style.display = 'none', 4500);
    }

    // Submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // collect values
      const payload = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        password: document.getElementById('password').value,
        role: document.getElementById('role').value,
        specialization: document.getElementById('specialization').value.trim() || null,
        experience: parseInt(document.getElementById('experience').value || '0') || null,
        certification: document.getElementById('certification').value.trim() || null
      };

      // Basic front validation
      if (!payload.name) { showMessage(errorMsg, 'Name is required'); return; }
      if (!payload.email || !payload.email.includes('@')) { showMessage(errorMsg, 'Valid email required'); return; }
      if (!payload.password || payload.password.length < 6) { showMessage(errorMsg, 'Password min 6 chars'); return; }
      const confirmPassword = document.getElementById('confirmPassword').value;
      if (payload.password !== confirmPassword) { showMessage(errorMsg, 'Passwords do not match'); return; }

      // show spinner
      spinner.style.display = 'inline-block';
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      try {
        const res = await fetch("http://localhost:8080/api/auth/register",  {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        spinner.style.display = 'none';

        if (res.ok) {
          showMessage(successMsg, 'Registration successful — check database.');
          form.reset();
          trainerSection.style.display = 'none';
        } else {
          // try to read server message
          let text;
          try { text = await res.text(); } catch (err) { text = 'Server error'; }
          showMessage(errorMsg, text || 'Registration failed');
        }
      } catch (err) {
        spinner.style.display = 'none';
        showMessage(errorMsg, 'Network error — could not reach server');
        console.error('Register error:', err);
      }
    });
  