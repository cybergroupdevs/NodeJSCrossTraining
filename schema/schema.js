collections = {
	employee:{
		firstName:        		{ type: String, default: '' },
		middleName:       		{ type: String, default: '' },
		lastName:         		{ type: String, default: '' },
		displayName:         	{ type: String, default: '' },
		emailAddress:     		{ type: String, required: true, validate:[isValidEmailAddress, 'Provided email address is not valid']},
		employeeCode:			{ type: String, required: true},
		mobileNumber:     		{ type: String, default: '' },
		dateOfBirth:      		{ type: Date,   default: '' },
		gender:           		{ type: String, required: true,enum: ['M', 'F'], default: 'M' },
		location:         		{ type: String},
		address:         		{ type: String, default: '' },
		city:             		{ type: String, default: '' },
		country:           		{ type: String, default: '' },
		state:            		{ type: String, default: '' },
		zipCode:          		{ type: String, default: '' },
		isActive:         		{type:  Boolean,default: true},
		isDelete:               {type: 	Boolean, default: false},
		isBlockedByAdmin:  		{type:  Boolean,default: false},
		passwordHash:     		{ type: String, required: true, default: '' },
		passwordSalt:     		{ type: String, required: true, default: '' },
		password:     			{ type: String, required: true, default: '' },
		imageURL:				{type:	String,required:false},
		userType:           	{ type: String, required: true, enum: ['USER', 'ADMIN'], default: 'USER' },
		bio:          			{ type: String, default: '' },
		tags                    :[],
		skills					:[],
		createdAt:        		{type:  Date,   default: Date.now},
		updatedAt:        		{type:  Date,   default: Date.now}
	},
	skills: {
		name: { type: String, required: true },
		type: { type: String, required: true , default: 'TECHNICAL' }
	},
	Projects:{
		name:					{type:String, required: true},
		type:					{type:String, required: true},
		client:					{type:String, required: true}		
	}
};

function isValidEmailAddress(email){
	var emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i);	
	return emailRegex.test(email);
}

module.exports.collections = collections;
module.exports.checks = {
	validateEmailAddress:isValidEmailAddress
};
