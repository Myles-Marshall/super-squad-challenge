// index.js
// Required modules
const express = require('express');
const path = require('path');
const fs = require('fs').promises;

// Initialize Express application
const app = express();

// Define paths
const clientPath = path.join(__dirname, '..', 'client/src');
const dataPath = path.join(__dirname, 'data', 'users.json');
const heroPath = path.join(__dirname, "data", "superheroes.json");
const serverPublic = path.join(__dirname, 'public');
// Middleware setup
app.use(express.static(clientPath)); // Serve static files from client directory
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Routes

// Home route
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: clientPath });
});

app.get('/users', async (req, res) => {
    try {
        const data = await fs.readFile(dataPath, 'utf8');

        const users = JSON.parse(data);
        if (!users) {
            throw new Error("Error no users available");
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Problem getting users" + error.message);
        res.status(500).json({ error: "Problem reading users" });
    }
});

// Form route
app.get('/form', (req, res) => {
    res.sendFile('pages/form.html', { root: serverPublic });
});

// Form submission route
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Read existing users from file
        let users = [];
        try {
            const data = await fs.readFile(dataPath, 'utf8');
            users = JSON.parse(data);
        } catch (error) {
            // If file doesn't exist or is empty, start with an empty array
            console.error('Error reading user data:', error);
            users = [];
        }

        // Find or create user
        let user = users.find(u => u.name === name && u.email === email);
        if (user) {
            user.messages.push(message);
        } else {
            user = { name, email, messages: [message] };
            users.push(user);
        }

        // Save updated users
        await fs.writeFile(dataPath, JSON.stringify(users, null, 2));
        res.redirect('/form');
    } catch (error) {
        console.error('Error processing form:', error);
        res.status(500).send('An error occurred while processing your submission.');
    }
});

// Update user route (currently just logs and sends a response)
app.put('/update-user/:currentName/:currentEmail', async (req, res) => {
    try {
        const { currentName, currentEmail } = req.params;
        const { newName, newEmail } = req.body;
        console.log('Current user:', { currentName, currentEmail });
        console.log('New user data:', { newName, newEmail });
        const data = await fs.readFile(dataPath, 'utf8');
        if (data) {
            let users = JSON.parse(data);
            const userIndex = users.findIndex(user => user.name === currentName && user.email === currentEmail);
            console.log(userIndex);
            if (userIndex === -1) {
                return res.status(404).json({ message: "User not found" })
            }
            users[userIndex] = { ...users[userIndex], name: newName, email: newEmail };
            console.log(users);
            await fs.writeFile(dataPath, JSON.stringify(users, null, 2));

            res.status(200).json({ message: `You sent ${newName} and ${newEmail}` });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('An error occurred while updating the user.');
    }
});

// SUPERHERO SECTION!!!!

app.get("/heroes", async (req, res) => {
    try {
        const data = await fs.readFile(heroPath, "utf8")
        heroes = JSON.parse(data);

        if (!heroes) {
            throw new Error("Heroes not found");
        }

        res.status(200).json(heroes)
    } catch (error) {
        console.error("Problem getting heroes", error)
        res.status(500).json({ error: "Problem reading heroes" });
    }
});

app.get("/superhero-form", (req, res) => {
    res.sendFile("pages/superhero_form.html", { root: serverPublic });
});

app.get("/superhero_forms.css", (req, res) => {
    res.sendFile("css/superhero_forms.css", { root: serverPublic });
})

app.post("/submit-hero", async (req, res) => {
    try {
        const { heroName, heroUniverse, heroPowers } = req.body;

        let heroes = [];
        try {
            const heroData = await fs.readFile(heroPath, "utf8");
            heroes = JSON.parse(heroData);
        } catch (error) {
            console.error("Error reading hero data", error)
            heroes = [];
        }

        let hero = heroes.find(h => h.heroName === heroName && h.heroUniverse === heroUniverse && h.heroPowers === heroPowers);
        if (hero) {
            res.send("Hero already exists.")
        } else {
            hero = { heroName, heroUniverse, heroPowers };
            heroes.push(hero);
        }

        await fs.writeFile(heroPath, JSON.stringify(heroes, null, 2))
        res.redirect("/superhero-form");
    } catch (error) {
        console.error(error.message);
    }
});

app.put("/update-hero/:currentHeroName/:currentHeroUniverse", async (req, res) => {
    try {
        const { currentHeroName, currentHeroUniverse } = req.params;
        const { newHeroPowers } = req.body;

        const data = await fs.readFile(heroPath, "utf8");

        if (data) {
            let heroes = JSON.parse(data);

            const heroIndex = heroes.findIndex(hero => hero.heroName === currentHeroName && hero.heroUniverse === currentHeroUniverse);

            if (heroIndex === -1) {
                return res.status(404).json({ message: "Hero not found" });
            }

            heroes[heroIndex] = { ...heroes[heroIndex], heroPowers: newHeroPowers }

            await fs.writeFile(heroPath, JSON.stringify(heroes, null, 2));
            res.status(200).json({ message: `Hero Powers updated successfully` });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(`Error caught while updating hero`)
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});