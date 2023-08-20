import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request, {params}) => {
    try{
        await connectToDB();

        const prompts = await Prompt.find({tag: params.tag}).populate("creator")

        if(!prompts) return new Response("Prompts not found",
        {status:404});

        return new Response(JSON.stringify(prompts), {
            status:200
        });
    }catch(error){
        return new Response("Failed to fetch prompts", {
            status:500
        });
    }
}
