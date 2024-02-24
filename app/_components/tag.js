import { X } from "lucide-react";
import { Button } from "../../components/ui/button";

const Tag = ({ tag,tagIndex,tags,setTags}) => {
    const handleTagEdit = (e) => {
        if(e.keyCode === 13 || e.keyCode === 188){
            e.preventDefault();
            let input =  e.target
            let currentTag = input.innerText;
            if (tagIndex !== undefined) { 
                const updatedTags = [...tags];  
                updatedTags[tagIndex] = currentTag; 
                setTags(updatedTags)
            }
            // e.target.setAttribute("contentEditable",false)             // MEthod 1
            input.contentEditable = "false";    // Method 2
        }
    }
    const handleTagDelete = () => {
        tags = tags.filter((tagName) => tagName !== tag) 
        setTags(tags)
    }
    return (
        <div className="flex px-2 py-1 space-x-1 border border-gray-400 bg-white rounded-full w-max hover:bg-opacity-50 text-center justify-center items-center">
            <p
                className="outline-none text-center text-lg"
                contentEditable="true"
                onKeyDown={handleTagEdit}
            >{tag}</p>

            <Button
                className="rounded-full !px-2 hover:!bg-gray-500 hover:!text-white bg-transparent text-gray-600 border border-gray-500"
                onClick={handleTagDelete}
            >
            
            <X size={20}  strokeWidth={1}  className="pointer-events-none text-gray-600 hover:text-white"/>

            </Button>
        </div>
    );
}

export default Tag;