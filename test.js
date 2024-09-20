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