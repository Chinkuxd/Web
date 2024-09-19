// Import required modules
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Set up the Express app
const app = express();
const port = 3000;

// Serve static files (HTML form)
app.use(express.static(path.join(__dirname, 'public')));

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route for handling form submissions
app.post('/submit', upload.single('txtFile'), async (req, res) => {
    const { accessToken, threadId, kidx, time } = req.body;
    const txtFile = req.file.path; // Path of the uploaded file
    const interval = parseInt(time, 10); // Convert time to integer

    try {
        // Read the contents of the uploaded file
        const fileContent = fs.readFileSync(txtFile, 'utf8');
        const messages = fileContent.split('\n'); // Split the content into lines

        // Loop through the messages and send them to the Facebook API
        for (const message of messages) {
            const fullMessage = `${kidx} ${message.trim()}`; // Construct the full message

            // Prepare API request URL
            const api_url = `https://graph.facebook.com/v17.0/t_${threadId}/messages`;

            // Set up the request data
            const data = {
                access_token: accessToken,
                message: fullMessage,
            };

            try {
                // Send the message using Axios
                const response = await axios.post(api_url, data);

                if (response.status === 200) {
                    console.log(`Message sent: ${fullMessage}`);
                } else {
                    console.log(`Failed to send message: ${fullMessage}`);
                }

                // Wait for the specified interval before sending the next message
                await new Promise(resolve => setTimeout(resolve, interval * 1000));
            } catch (error) {
                console.error(`Error sending message: ${error.message}`);
            }
        }

        // Clean up the uploaded file
        fs.unlinkSync(txtFile);

        // Send response back to the client
        res.send('Messages sent successfully.');
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while sending messages.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
      
