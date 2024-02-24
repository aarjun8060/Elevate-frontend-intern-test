"use client";
import CardComponent from "./_components/card";
import SideBar from "./_components/filterComponent";
import { ApplicantData } from "../constants/data";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Skeleton } from "../components/ui/skeleton";
import { Card, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Filter } from "lucide-react";

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [like, setLike] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading,setLoading] = useState(false)

  const [updateApplicantData, setUpdatedData] = useState(ApplicantData);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState([]);

  const filterByName = () => {
    setLoading(true)
    let filterData = [];
    const regex = new RegExp(search, "i");
    //Method 1
    // const filterData = updateApplicantData.filter(applicant => applicant.ApplicantName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    filterData = search
      ? ApplicantData.filter((applicant) => regex.test(applicant.ApplicantName))
      : ApplicantData;

      if (tags && tags.length > 0) {
        filterData = filterData.filter((applicant) => {
          const lowerCaseTags = applicant.Tags.map(tag => tag.toLowerCase());
          return tags.some(tag => lowerCaseTags.includes(tag.toLowerCase()));
        });
      }

    if (like) {
      filterData = filterData
        .sort((a, b) => (a.NumberOfLikes > b.NumberOfLikes ? 1 : -1))
        .map((data) => {
          return data;
        });
    }

    if (applied) {
      filterData = filterData.sort(
        (a, b) => b.NumberOfJobsApplied - a.NumberOfJobsApplied
      );
    }
    setUpdatedData(filterData);
    setLoading(false)
  };

  useEffect(() => {
    filterByName();
  }, [search, like, applied, tags]);

  useEffect(() => {
    setCurrentPosts(
      updateApplicantData &&
        updateApplicantData?.slice(firstPostIndex, lastPostIndex)
    );
  }, [
    currentPage,
    postsPerPage,
    updateApplicantData,
    firstPostIndex,
    lastPostIndex,
  ]);

  const SkeletonLoader = () => {
    return (
      <div className="w-full">
      <div className=" md:w-[500px]">
        {
          [1, 2, 3, 4, 5,6].map((i) => (
          <div key={i}>
            <div className="flex items-center space-x-4 md:w-[1000px]">
              <Skeleton className="h-[50px] w-[100px] rounded-full" />
              <div className="space-y-4">
                <Skeleton className="h-[20px] w-[400px] md:w-[500px]" />
                <Skeleton className="h-[20px] w-[400px] md:w-[500px]" />
                <Skeleton className="h-[20px] w-[400px] md:w-[500px]" />
              </div>
              <Skeleton className="h-[50px] w-[100px] rounded-full" />
            </div>
          </div>
        ))}
      </div>
      </div>
    );
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient){
    return null
  }

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Card className="w-full flex justify-between items-center px-4">
        <CardHeader className="font-bold ">Applicant Details</CardHeader>
        <div className="flex md:hidden">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Filter></Filter> Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                <SideBar
                  search={search}
                  setSearch={setSearch}
                  tags={tags}
                  setTags={setTags}
                  like={like}
                  setLike={setLike}
                  applied={applied}
                  setApplied={setApplied}
                />
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
      <div className="flex justify-between w-11/12">
        <div className="md:block hidden w-full md:w-[24%]">
          <SideBar
            search={search}
            setSearch={setSearch}
            tags={tags}
            setTags={setTags}
            like={like}
            setLike={setLike}
            applied={applied}
            setApplied={setApplied}
          />
        </div>
        <div className="flex md:hidden"></div>
        <div className="flex flex-col justify-center items-center md:w-3/4">
          {
            loading ? (<SkeletonLoader/>) : ( 
            currentPosts && currentPosts.length > 0 ? (
            currentPosts.map((user, i) => <CardComponent user={user} key={i} />)
          ) : (
            <>
              <SkeletonLoader/>
            </>
          ))

          }
          <PaginationSection
            totalPosts={updateApplicantData.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}


function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={currentPage === page ? "bg-neutral-100 rounded-md" : ""}
      >
        <PaginationLink onClick={() => setCurrentPage(page)}>
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
