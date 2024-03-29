"use client"
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader } from "../../components/ui/card";
import {
  Tooltip, TooltipTrigger
} from "../../components/ui/tooltip"
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
const CardComponent = ({ user }) => {
  return (
    <div className="w-11/12 py-4">
      <Card
        className="flex my-5 h-auto md:h-48 bg-gray-100 px-8 justify-between items-center hover:bg-gray-200 hover:shadow-xl"
      >
        <div className="h-full  flex items-center w-10 justify-center">
          <Avatar className="border border-black w-12 h-12">
            <AvatarFallback>{user.ApplicantName.slice(0, 1)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-start items-start w-3/4 ">
          <CardHeader className="md:text-2xl font-semibold !my-0 md:my-auto">
            {user.ApplicantName}
          </CardHeader>
          <CardContent className="text-base md:text-xl">{user.Intro}</CardContent>
          <CardContent className="!text-xs md:text-lg font-semibold mb-3">
            Number of Jobs applied :{user.NumberOfJobsApplied}
          </CardContent>
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <Avatar className="border border-black">
            <AvatarFallback>
              <Heart  color="red"/>
            </AvatarFallback>
          </Avatar>
            <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <div>{user?.NumberOfLikes}</div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Number of Likes:{user?.NumberOfLikes}</p>
                  </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
        </div>
      </Card>
    </div>
  );
};

export default CardComponent;
