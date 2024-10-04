document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

function loadUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('users');
            userList.innerHTML = '';

            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = user;
                userList.appendChild(li);
            });
        });
}

document.getElementById('userform').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;

    if (username) {
        addUser(username);
        document.getElementById('username').value = '';
    }
});

function addUser(username) {
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username }),
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => {
            const userList = document.getElementById('users');
            const li = document.createElement('li');
            li.textContent = username;
            userList.appendChild(li);
        })
        .catch(error => {
            console.error(error);
        });
}
