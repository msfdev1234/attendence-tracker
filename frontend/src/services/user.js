import UserModel from "../models/UserModel";

export const login = async (email, password) => {
	try {
		const user = await UserModel.login(email, password);
		setLoggedInUser(user);
		return user;
	} catch (error) {
		console.error("Error during login:", error);
		throw error;
	}
};

export const signup = async (
	email,
	password,
	userType,
	firstName,
	lastName
) => {
	try {
		return await UserModel.signup(
			email,
			password,
			userType,
			firstName,
			lastName
		);
	} catch (error) {
		console.error("Error during signup:", error);
		throw error;
	}
};

export const setLoggedInUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const getLoggedInUser = () => {
	try {
		const user = localStorage.getItem("user");
		if (!user) {
			throw new Error("No user logged in");
		}
		return JSON.parse(user);
	} catch (error) {
		console.error("No logged in user found:", error);
		throw error;
	}
};

export const getUsersByType = async (userType) => {
	try {
		const userModel = new UserModel();
		return await userModel.getUsersByType(userType);
	} catch (error) {
		console.error("Error fetching users by type:", error);
		throw error;
	}
};

export const logout = () => {
	localStorage.removeItem("user");
};

export const getUsersByIds = async (ids) => {
	try {
		const userModel = new UserModel();
		return await userModel.getUsersByIds(ids);
	} catch (error) {
		console.error("Error fetching users by IDs:", error);
		throw error;
	}
};
