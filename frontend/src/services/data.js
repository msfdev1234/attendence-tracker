const dummyCourses = [
	{
		lectureTitle: "Numerical Methods",
		subject: "AIM",
		courseNumber: "5003",
		CRN: "92747",
		instructor: "Youshan Zhang",
		email: "youshan.zhang@yu.edu",
		startTime: "05:30 PM",
		endTime: "07:30 PM",
		buildingNumber: "B1",
		campus: "Beren",
		seatsAvailable: {
			$numberInt: "30",
		},
		startDate: {
			$date: {
				$numberLong: "1724630400000",
			},
		},
		endDate: {
			$date: {
				$numberLong: "1734220800000",
			},
		},
		weekdays: ["Friday"],
		term: "Fall",
		degree: "Graduate",
		section: "A",
		classType: "Face to Face",
		latitude: {
			$numberDouble: "40.73061",
		},
		longitude: {
			$numberDouble: "-73.935242",
		},
		__v: {
			$numberInt: "0",
		},
		students: [],
	},

	{
		lectureTitle: "Neural Networks and Deep Learning",
		subject: "AIM",
		courseNumber: "5007",
		CRN: "92772",
		instructor: "Youshan Zhang",
		email: "youshan.zhang@yu.edu",
		startTime: "02:00 PM",
		endTime: "05:30 PM",
		buildingNumber: "B1",
		campus: "Beren",
		seatsAvailable: {
			$numberInt: "30",
		},
		startDate: {
			$date: {
				$numberLong: "1725148800000",
			},
		},
		endDate: {
			$date: {
				$numberLong: "1734220800000",
			},
		},
		weekdays: ["Wednesday"],
		term: "Fall",
		degree: "Graduate",
		section: "A",
		classType: "Face to Face",
		latitude: {
			$numberDouble: "40.73061",
		},
		longitude: {
			$numberDouble: "-73.935242",
		},
		__v: {
			$numberInt: "0",
		},
		students: [],
	},

	{
		lectureTitle: "Capstone for Artificial Intelligence and Machine Learning",
		subject: "AIM",
		courseNumber: "5008",
		CRN: "92774",
		instructor: "Youshan Zhang",
		email: "youshan.zhang@yu.edu",
		startTime: "12:30 PM",
		endTime: "04:30 PM",
		buildingNumber: "B1",
		campus: "Beren",
		seatsAvailable: {
			$numberInt: "30",
		},
		startDate: {
			$date: {
				$numberLong: "1725148800000",
			},
		},
		endDate: {
			$date: {
				$numberLong: "1734220800000",
			},
		},
		weekdays: ["Monday", "Thursday"],
		term: "Fall",
		degree: "Graduate",
		section: "A",
		classType: "Online",
		latitude: {
			$numberDouble: "40.73061",
		},
		longitude: {
			$numberDouble: "-73.935242",
		},
		__v: {
			$numberInt: "0",
		},
		students: [],
	},

	{
		lectureTitle: "SpcTpcs:Reinforcement Learning",
		subject: "AIM",
		courseNumber: "5014",
		CRN: "92773",
		instructor: "David Li",
		email: "david.li@yu.edu",
		startTime: "05:30 PM",
		endTime: "07:30 PM",
		buildingNumber: "B1",
		campus: "Beren",
		seatsAvailable: {
			$numberInt: "30",
		},
		startDate: {
			$date: {
				$numberLong: "1724630400000",
			},
		},
		endDate: {
			$date: {
				$numberLong: "1734220800000",
			},
		},
		weekdays: ["Monday", "Tuesday"],
		term: "Spring",
		degree: "Graduate",
		section: "A",
		classType: "Face to Face",
		latitude: {
			$numberDouble: "40.73061",
		},
		longitude: {
			$numberDouble: "-73.935242",
		},
		__v: {
			$numberInt: "0",
		},
		students: [],
	},

	{
		lectureTitle: "Computational Statistics",
		subject: "AIM",
		courseNumber: "5019",
		CRN: "92780",
		instructor: "David Li",
		email: "david.li@yu.edu",
		startTime: "05:30 PM",
		endTime: "07:30 PM",
		buildingNumber: "B1",
		campus: "Beren",
		seatsAvailable: {
			$numberInt: "30",
		},
		startDate: {
			$date: {
				$numberLong: "1725148800000",
			},
		},
		endDate: {
			$date: {
				$numberLong: "1734220800000",
			},
		},
		weekdays: ["Thursday"],
		term: "Summer",
		degree: "Undergraduate",
		section: "A",
		classType: "Face to Face",
		latitude: {
			$numberDouble: "40.73061",
		},
		longitude: {
			$numberDouble: "-73.935242",
		},
		__v: {
			$numberInt: "0",
		},
		students: [],
	},
];

const currentStudent = {
	_id: "1004",
	name: "Mazhar",
	email: "mazhar@mail.yu.edu",
	password: "mazhar", // This should be hashed before saving to the database
	role: "student",
};

const students = [
	{
		_id: "1001",
		name: "John Doe",
		email: "johndoe@mail.yu.edu",
		password: "password123", // This should be hashed before saving to the database
		role: "student",
	},
	{
		_id: "1002",
		name: "Jane Smith",
		email: "janesmith@mail.yu.edu",
		password: "password456", // This should be hashed before saving to the database
		role: "student",
	},
	{
		_id: "1003",
		name: "Mike Johnson",
		email: "mikejohnson@mail.yu.edu",
		password: "password789", // This should be hashed before saving to the database
		role: "student",
	},
	{
		_id: "1004",
		name: "Mazhar",
		email: "mazhar@mail.yu.edu",
		password: "mazhar", // This should be hashed before saving to the database
		role: "student",
	},
];

export { currentStudent };

export default dummyCourses;
