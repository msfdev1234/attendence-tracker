// List of users with credentials and roles
const users = [
	{
		email: "youshanzhang@mail.yu.edu",
		password: "zhang",
		role: "professor",
	},
	{
		email: "mazhar@mail.yu.edu",
		password: "mazhar",
		role: "student",
	},
	{
		email: "manager@mail.yu.edu",
		password: "manager",
		role: "admin",
	},
];

// Function to validate user credentials
const authenticateUser = (email, password) => {
	const user = users.find(
		(user) => user.email === email && user.password === password
	);
	return user ? { ...user, isAuthenticated: true } : { isAuthenticated: false };
};

export default authenticateUser;
