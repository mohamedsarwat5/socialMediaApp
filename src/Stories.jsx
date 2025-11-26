import { useState, useEffect } from "react";

const stories = [

    {
        id: 4,
        image: "https://picsum.photos/300/500?random=4",
        user: "Sophia Davis",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 5,
        image: "https://picsum.photos/300/500?random=5",
        user: "David Wilson",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg"
    },

    {
        id: 6,
        image: "https://picsum.photos/300/500?random=6",
        user: "Sophia Miller",
        avatar: "https://randomuser.me/api/portraits/women/46.jpg"
    },
    {
        id: 7,
        image: "https://picsum.photos/300/500?random=7",
        user: "Daniel Johnson",
        avatar: "https://randomuser.me/api/portraits/men/47.jpg"
    },
    {
        id: 8,
        image: "https://picsum.photos/300/500?random=8",
        user: "Emma Davis",
        avatar: "https://randomuser.me/api/portraits/women/48.jpg"
    },
    {
        id: 9,
        image: "https://picsum.photos/300/500?random=9",
        user: "Liam Wilson",
        avatar: "https://randomuser.me/api/portraits/men/49.jpg"
    },
    {
        id: 10,
        image: "https://picsum.photos/300/500?random=10",
        user: "Olivia Taylor",
        avatar: "https://randomuser.me/api/portraits/women/50.jpg"
    },
    {
        id: 1,
        image: "https://picsum.photos/300/500?random=1",
        user: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
        id: 2,
        image: "https://picsum.photos/300/500?random=2",
        user: "Emily Johnson",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg"
    },
    {
        id: 3,
        image: "https://picsum.photos/300/500?random=3",
        user: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/33.jpg"
    }
];

export default function Stories() {
    const [activeStory, setActiveStory] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        if (activeStory) {
            setProgress(0);
            timer = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(timer);
                        setActiveStory(null);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 100); // 100ms * 100 = 10s
        }
        return () => clearInterval(timer);
    }, [activeStory]);

    return (
        <div className="flex gap-3  z-50 ">
            {/* Story Thumbnails */}
            {stories.map((story) => (
                <div key={story.id} className="cursor-pointer shrink-0 relative">
                    <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                        <img loading='lazy'
                            src={story.avatar}
                            alt={story.user}
                            className="w-8 h-8 rounded-full border border-white"
                        />

                    </div>
                    <img loading='lazy'
                        src={story.image}
                        alt={story.user}
                        className="w-32 h-48 object-cover rounded-lg"
                        onClick={() => setActiveStory(story)}
                    />
                </div>
            ))}

            {/* Modal */}
            {activeStory && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
                    <div className="relative w-full h-full lg:w-[500px]  bg-black rounded-lg overflow-hidden">
                        {/* Progress bar */}
                        <button className="absolute right-3 top-4 cursor-pointer z-10" onClick={() => setActiveStory(null)}>
                            <i className="fa-solid fa-xmark text-white"></i>
                        </button>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
                            <div
                                className="h-1 bg-white transition-all duration-100 linear"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {/* User info */}
                        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                            <img loading='lazy'
                                src={activeStory.avatar}
                                alt={activeStory.user}
                                className="w-8 h-8 rounded-full border border-white"
                            />
                            <span className="text-white text-md font-semibold">
                                {activeStory.user}
                            </span>
                        </div>

                        {/* Story image */}
                        <img loading='lazy'
                            src={activeStory.image}
                            alt={activeStory.user}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}