import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchPosts,
    selectTeacherHasMore,
    selectTeacherCurrentPage,
    resetPagination,
    selectTeacherCommunityError,
    selectTeacherCommunityStatus,
    selectTeacherPosts
} from '../store/slices/teachercommunityslice';
import { TeacherSideNavBar } from '../components/teacherSideNavbar';
import { TeacherCommunityHeader } from '../components/teachercommunityHeader';
import TeacherArticleCard from '../components/teacherarticleCard';

function TeacherCommunityhome() {
    const dispatch = useDispatch();
    const posts = useSelector(selectTeacherPosts);
    const status = useSelector(selectTeacherCommunityStatus);
    const error = useSelector(selectTeacherCommunityError);
    const hasMore = useSelector(selectTeacherHasMore);
    const currentPage = useSelector(selectTeacherCurrentPage);
    const observer = useRef(null);
    console.log(hasMore)
    console.log(posts)
    useEffect(() => {
        dispatch(resetPagination());
        dispatch(fetchPosts(1));

        return () => {
            dispatch(resetPagination());
        };
    }, [dispatch]);

    const lastPostRef = useCallback(
        (node) => {
            if (status === 'loading') return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    const nextPage = currentPage + 1;
                    dispatch(fetchPosts(nextPage));
                }
            }, { rootMargin: '100px' });

            if (node) observer.current.observe(node);
        },
        [status, hasMore, currentPage, dispatch]
    );

    return (
        <div className="bg-gradient-to-l object-fill min-h-screen">
            <TeacherSideNavBar />

            <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
                <TeacherCommunityHeader />

                {/* Main Content Area */}
                <div className="py-2 px-4 sm:px-6 lg:px-8 pb-12 max-w-screen-lg mx-auto">
                    {status === "failed" && <p className="text-red-500">{error}</p>}

                    {/* Render Posts */}
                    {Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post, index) => {
                            // If this is the last post, attach the ref for infinite scroll
                            if (index === posts.length - 1) {
                                return (
                                    <div ref={lastPostRef} key={post.id}>
                                        <TeacherArticleCard post={post} />
                                    </div>
                                );
                            } else {
                                return <TeacherArticleCard key={post.id} post={post} />;
                            }
                        })
                    ) : (
                        status === "succeeded" && <p>No posts available.</p>
                    )}
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

export default TeacherCommunityhome;
