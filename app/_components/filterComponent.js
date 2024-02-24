"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import Tag from "./tag";
import { Checkbox } from "../../components/ui/checkbox";
import { Card } from "../../components/ui/card";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

function SideBar({
  search,
  setSearch,
  tags,
  setTags,
  like,
  setLike,
  applied,
  setApplied
}) {
  const handleSearchChange = (e) => {
    let input = e.target;
    setSearch(input.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 188) {
      e.preventDefault();
      let tag = e.currentTarget.value.trim();
      setTags((_prev) => {
        const tagArray = [..._prev];
        tagArray.push(tag);
        return tagArray;
      });

      e.target.value = "";
    }
  };

  return (
    <div className="py-4 flex flex-col bg-gray-100 px-3 h-fit w-full ">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
            <AccordionTrigger>Search</AccordionTrigger>
            </TooltipTrigger>
            <TooltipContent align="center" side="right">
              <p>Search Any Name Here!</p>
            </TooltipContent>
          </Tooltip>
          </TooltipProvider>
          <AccordionContent className="bg-white w-full !px-0">
            <div className="relative mt-4 px-1  flex justify-center items-center ">
              {" "}
              <div className="flex justify-center items-center mt-2 rounded-full">
                <Search className="top-4 right-10 absolute text-gray-400" />
                <Input
                  type="text"
                  name="search"
                  placeholder="Search By Name"
                  className="font-medium text-lg rounded-xl w-full"
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
              <AccordionTrigger>filter by Tags</AccordionTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
              <p>Searching by Tags Name type tagname and press Enter</p>
            </TooltipContent>  
            </Tooltip>
          </TooltipProvider>
          <AccordionContent className="bg-white w-full !px-0">
            <div className="relative w-[98%] rounded-md py-2 pb-4 bg-grey pl-2 border border-grey focus:bg-transparent placeholder:text-black ">
              <Input
                type="text"
                placeholder="Topic"
                className="sticky w-[100%] rounded-md p-4 bg-grey border border-grey focus:bg-transparent placeholder:text-black top-0 left-0 pl-4 mb-3"
                onKeyDown={handleKeyDown}
              />
              <div className="flex flex-wrap">
                {tags.map((tag, i) => (
                  <Tag
                    tag={tag}
                    key={tag}
                    tagIndex={i}
                    tags={tags}
                    setTags={setTags}
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                    <AccordionTrigger>Sorting</AccordionTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Sort Data</p>
                    </TooltipContent>
                  </Tooltip>
          </TooltipProvider>
         
          <AccordionContent className="bg-white w-full !px-0">
          <Card className='px-2'>
            <div className="flex items-center space-x-2 ">
              <Checkbox 
                id="like"
                checked={like}
                onCheckedChange={(val) => setLike(val)}
              />
              <label
                htmlFor="likes"
                className="text-sm md:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Number of Likes
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="JobsApplied"
                checked={applied}
                onCheckedChange = {(val) => setApplied(val)}
              />
              <label
                htmlFor="JobsApplied"
                className="text-sm md:text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Number of Jobs Applied
              </label>
            </div>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SideBar;
