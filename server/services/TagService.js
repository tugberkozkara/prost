import Tag  from '../models/Tag.js';

export default class TagService{

    static getAll = async () => {
        try {
            const tags = await Tag.find();
            return tags;   
        } catch (error) {
            return null;
        }
    };

    static create = async (name) => {
        const isTagExists = await Tag.exists({name: name});
        if(isTagExists){
            return null;
        }
        const tag = new Tag({
            name: name
        });
        try {
            await tag.save();
            return tag;
        } catch (error) {
            return null;
        }
    };

    static getTagsByArray = async (tagsString) => {
        const tagStringArray = tagsString.split(",").map(e => e.trim());
        const allTags = await Tag.find();
        const tagObjectArray = [];
    
        for (let index = 0; index < tagStringArray.length; index++) {
            const name = tagStringArray[index];
    
            if(!allTags.some(e => e.name === name)){
                const tag = new Tag({ name: name });
                const newTag = await tag.save();
                tagObjectArray.push(newTag);
            }
            else{
                const tag = allTags.find(e => e.name === name);
                tagObjectArray.push(tag);
            }
        }
        return tagObjectArray;
    };

    static deleteById = async (id) => {
        try {
            await Tag.findByIdAndDelete(id);
            return true;
        } catch (error) {
            return false;
        }
    };

    static isTagHasAnotherPlaces = (id, places) => {
        if (places === null || places === undefined || places.length === 0) {
            return false;
        };
        return places.some(place => place.tags.some(tag => String(tag._id) === String(id)));
    }
}
