import Tag from '../models/tag.js';

export default class TagController{

    static getAllTags = async (request, response) => {
        try {
            const allTags = await Tag.find();
            response.status(200).json(allTags);
        } catch (error) {
            response.status(404).json({
                message: error.message,
            })
        }
    }

    static createTag = async (request, response) => {
        const { name } = request.body;
        const isTagExists = await Tag.exists({name: name});
        if(isTagExists){
            return response.status(400).json({
                message: "Tag already exists!",
            })
        }

        const tag = new Tag({ name: name })
        try {
            await tag.save();
        } catch (error) {
            return response.status(400).json({
                message: error.message,
            })
        }
        return response.status(201).json({
            tag: tag,
            message: "Created successfully!",
        });
    }
}