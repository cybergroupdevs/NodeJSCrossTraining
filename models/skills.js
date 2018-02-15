const mongoose = require('mongoose');
const dbSchema = require('./../schema/schema');

var skillSchema = new mongoose.Schema(dbSchema.collections["skills"]);
skillSchema.index({'name' : 1}, {unique : true});

skillSchema.methods = {
	
};

skillSchema.statics = {
    addskill:(skillObj) =>{
        return Skill.create(skillObj).then((result) => {
            return result;
        });
        return null;
    },
    listskill:() => {
        return Skill.find({}).exec();
    }
};

var Skill = mongoose.model('skill', skillSchema);
module.exports = {Skill};