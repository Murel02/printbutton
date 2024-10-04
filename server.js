const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT||3000;

const DATA_FILE = path.join(__dirname,'users.json')

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const readUsersFromFile = () => {
    if(fs.existsSync(DATA_FILE)){
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } else {
        return [];
    }
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
};

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint for at hente brugere fra serveren
app.get('/api/users', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// Endpoint for at tilføje en ny bruger til filen
app.post('/api/users', (req, res) => {
    const newUser = req.body.username;

    if (newUser) {
        const users = readUsersFromFile();
        users.push(newUser);
        writeUsersToFile(users);
        res.status(201).json({ message: 'Bruger tilføjet', users });
    } else {
        res.status(400).json({ message: 'Brugernavn er påkrævet' });
    }
});


app.listen(PORT, () =>{
    console.log(`Server running on http://localhost:${PORT}/`);
});


