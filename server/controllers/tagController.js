import TagService from "../services/TagService.js";

export default class TagController{

    static getAllTags = async (request, response) => {
        const allTags = await TagService.getAll();
        if(allTags === null){
            return response.status(404).json({
                message: "No tags found!",
            });
        }
        return response.status(200).json(allTags);
    };

    static createTag = async (request, response) => {
        const { name } = request.body;
        const tag = await TagService.create(name);
        if(tag === null){
            return response.status(400).json({
                message: "Tag already exists!",
            });
        }
        return response.status(201).json({
            tag: tag,
            message: "Created successfully!",
        });
    };

    static deleteTagById = async (request, response) => {
        const { id } = request.params;
        const isDeleted = await TagService.deleteById(id);
        if (!isDeleted) {
            return response.status(404).json({
                message: "Not found!",
            });
        }
        return response.status(200).json({
            message: "Deleted successfully!",
        });
    };
}
