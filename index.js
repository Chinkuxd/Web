// Elements
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const submitBtn = document.getElementById('submitBtn');
        const messageForm = document.getElementById('messageForm');
        const errorMsg = document.getElementById('errorMsg');

        // Function to validate form inputs
        function validateForm() {
            let threadId = document.getElementById('thread_id').value;
            let haterName = document.getElementById('hater_name').value;
            let messagesFile = document.getElementById('messages_file').files.length;
            let delay = document.getElementById('delay').value;
            
            // Simple validation to ensure required fields are filled
            if (!threadId || !haterName || messagesFile === 0 || !delay) {
                errorMsg.textContent = "Please fill in all required fields.";
                return false;
            }

            // Ensure delay is a positive number
            if (delay <= 0) {
                errorMsg.textContent = "Delay must be greater than 0.";
                return false;
            }

            return true;
        }

        // Handle form submission
        messageForm.onsubmit = function (event) {
            if (!validateForm()) {
                event.preventDefault();  // Prevent form submission if validation fails
            } else {
                errorMsg.textContent = "";  // Clear error message
                startBtn.style.display = "none";  // Hide start button
                stopBtn.style.display = "inline-block";  // Show stop button
            }
        };

        // Simulate stopping the messaging process
        stopBtn.onclick = function () {
            alert("Messaging stopped.");
            stopBtn.style.display = "none";
            startBtn.style.display = "inline-block";
        };

        // Reset error message on input change
        messageForm.addEventListener('input', () => {
            errorMsg.textContent = '';
        });
