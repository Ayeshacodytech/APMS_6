import React, { useState } from "react";
import ArticleOutline from "./articleCard";
import CommunityHeader from "./communityHeader";
import { SideNavBar } from "./SideNavbar";

function Communityhome() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="grid grid-cols-6 bg-gradient-to-l object-fill min-h-screen">
      <div className="col-span-1">
        <SideNavBar />
      </div>

      {/* Main Content */}
      <div className="col-span-5">
        <div className="pl-8 pr-1">
          <CommunityHeader></CommunityHeader>

          {/* Main Content Area */}
          <div className="py-2 px-8 pb-12 max-w-5xl mx-auto">
            {/* Title Card */}
            <ArticleOutline></ArticleOutline>
            <ArticleOutline></ArticleOutline>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Communityhome;
