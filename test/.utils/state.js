const mock20178 = {
	year: 2017,
	month: 8,
	dates: [
		null, null,
		{date: '2017-8-1', day: 1},
		{date: '2017-8-2', day: 2},
		{date: '2017-8-3', day: 3},
		{date: '2017-8-4', day: 4},
		{date: '2017-8-5', day: 5},
		{date: '2017-8-6', day: 6},
		{date: '2017-8-7', day: 7},
		{date: '2017-8-8', day: 8},
		{date: '2017-8-9', day: 9},
		{date: '2017-8-10', day: 10},
		{date: '2017-8-11', day: 11},
		{date: '2017-8-12', day: 12},
		{date: '2017-8-13', day: 13},
		{date: '2017-8-14', day: 14},
		{date: '2017-8-15', day: 15},
		{date: '2017-8-16', day: 16},
		{date: '2017-8-17', day: 17},
		{date: '2017-8-18', day: 18},
		{date: '2017-8-19', day: 19},
		{date: '2017-8-20', day: 20},
		{date: '2017-8-21', day: 21},
		{date: '2017-8-22', day: 22},
		{date: '2017-8-23', day: 23},
		{date: '2017-8-24', day: 24},
		{date: '2017-8-25', day: 25},
		{date: '2017-8-26', day: 26},
		{date: '2017-8-27', day: 27},
		{date: '2017-8-28', day: 28},
		{date: '2017-8-29', day: 29},
		{date: '2017-8-30', day: 30},
		{date: '2017-8-31', day: 31},
		null, null, null, null, null,
		null, null
	],
	appointments: {
		'2017-8-1': {content: '약속1'}
	},
	dialog: ''
}

export const getMockModel = (date) => {
	switch (date) {
		case '201708':
			return mock20178;

		default:
			return null;
	}
}
