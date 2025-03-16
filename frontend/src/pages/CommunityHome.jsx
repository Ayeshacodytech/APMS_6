import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommunityHeader from '../components/communityHeader';
import { SideNavBar } from '../components/SideNavbar';
import { 
    fetchPosts, 
    selectCommunityError, 
    selectCommunityStatus, 
    selectPosts,
    selectHasMore,
    selectCurrentPage,
    resetPagination,
} from '../store/slices/communitySlice';
import ArticleCard from '../components/articleCard';

function Communityhome() {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const status = useSelector(selectCommunityStatus);
    const error = useSelector(selectCommunityError);
    const hasMore = useSelector(selectHasMore);
    const currentPage = useSelector(selectCurrentPage);
    const observer = useRef();
    
    // Reset and fetch posts on initial load
    useEffect(() => {
        dispatch(resetPagination());
        dispatch(fetchPosts(1));
        
        // Cleanup function to reset on unmount
        return () => {
            dispatch(resetPagination());
        };
    }, [dispatch]);
    
    // Set up the intersection observer for infinite scroll
    const lastPostRef = useCallback(node => {
        // Don't observe while loading
        if (status === 'loading') return;
        
        // Disconnect previous observer
        if (observer.current) observer.current.disconnect();
        
        // Create new observer
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                const nextPage = currentPage + 1;
                dispatch(fetchPosts(nextPage));
            }
        }, { rootMargin: '100px' });
        
        // Observe the last post element
        if (node) observer.current.observe(node);
    }, [status, hasMore, currentPage, dispatch]);

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <SideNavBar />
            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <CommunityHeader />
                
                {/* Main Content Area */}
                <div className="py-2 px-4 sm:px-6 lg:px-8 pb-12 max-w-screen-lg mx-auto">
                    {/* Error Message */}
                    {status === "failed" && <p className="text-red-500">{error}</p>}
                    
                    {/* Posts */}
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post, index) => {
                            // If this is the last post, attach the ref for infinite scroll
                            if (index === posts.length - 1) {
                                return (
                                    <div ref={lastPostRef} key={post.id}>
                                        <ArticleCard post={post} />
                                    </div>
                                );
                            } else {
                                return <ArticleCard key={post.id} post={post} />;
                            }
                        })
                    ) : (
                        status === "succeeded" && posts.length === 0 && (
                            <p className="text-center text-gray-500 py-4">No posts available.</p>
                        )
                    )}
                    
                    {/* Loading indicator */}
                    {status === "loading" && (
                        <div className="flex justify-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    )}
                    
                    {/* End of content message */}
                    {!hasMore && posts.length > 0 && (
                        <p className="text-center text-gray-500 py-4 mt-4">No more posts to load</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Communityhome;
