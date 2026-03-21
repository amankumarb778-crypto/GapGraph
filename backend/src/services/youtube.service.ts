export interface YouTubeResource {
    title: string;
    channel?: string;
    videoId: string;
    url: string;
    duration: string;
    type: "video" | "playlist" | "docs" | "course";
}

// A local catalog of curated high-quality YouTube resources for popular tech topics.
const CURATED_YOUTUBE_RESOURCES: Record<string, YouTubeResource[]> = {
    "docker": [
        {
            title: "Docker Tutorial for Beginners",
            channel: "TechWorld with Nana",
            videoId: "3c-iBn73dVU",
            url: "https://www.youtube.com/watch?v=3c-iBn73dVU",
            duration: "2 hr",
            type: "video"
        },
        {
            title: "Docker Architecture Deep Dive",
            channel: "Hussein Nasser",
            videoId: "jH_E_o_qY_I",
            url: "https://www.youtube.com/watch?v=jH_E_o_qY_I",
            duration: "45 min",
            type: "video"
        }
    ],
    "kubernetes": [
        {
            title: "Kubernetes Tutorial for Beginners",
            channel: "TechWorld with Nana",
            videoId: "X48VuDVv0do",
            url: "https://www.youtube.com/watch?v=X48VuDVv0do",
            duration: "3.5 hr",
            type: "course"
        }
    ],
    "machine learning": [
        {
            title: "Machine Learning for Everybody",
            channel: "freeCodeCamp.org",
            videoId: "i_LwzRmA_08",
            url: "https://www.youtube.com/watch?v=i_LwzRmA_08",
            duration: "3 hr 53 min",
            type: "course"
        }
    ],
    "system design": [
        {
            title: "System Design Interview Prep",
            channel: "Gaurav Sen",
            videoId: "xpDnVSmNFX0",
            url: "https://www.youtube.com/watch?v=xpDnVSmNFX0",
            duration: "1 hr",
            type: "video"
        }
    ]
};

// Generic fallbacks for any skill
const GENERIC_YOUTUBE_FALLBACKS: YouTubeResource[] = [
    {
        title: "Crash Course on modern development",
        channel: "freeCodeCamp",
        videoId: "zJSY8tbf_ys",
        url: "https://www.youtube.com/watch?v=zJSY8tbf_ys",
        duration: "1.5 hr",
        type: "video"
    },
    {
        title: "Best Practices & Industry Standards",
        channel: "TechLead",
        videoId: "1w314Rj_20I",
        url: "https://www.youtube.com/watch?v=1w314Rj_20I",
        duration: "30 min",
        type: "video"
    }
];

export class YouTubeService {
    /**
     * Finds curated YouTube resources for a given skill.
     * In a real app, this could hit the YouTube Data API.
     */
    async getResourcesForSkill(skillName: string): Promise<YouTubeResource[]> {
        const normalized = skillName.toLowerCase();
        
        // Exact match
        if (CURATED_YOUTUBE_RESOURCES[normalized]) {
            return CURATED_YOUTUBE_RESOURCES[normalized];
        }

        // Substring match
        const match = Object.keys(CURATED_YOUTUBE_RESOURCES).find(k => normalized.includes(k) || k.includes(normalized));
        if (match) {
            return CURATED_YOUTUBE_RESOURCES[match];
        }

        // Generate generic fallback with skill name inserted
        return [
            {
                title: `${skillName} - Full Tutorial for Beginners`,
                channel: "Tech Guides",
                videoId: "dQw4w9WgXcQ", // Placeholder video ID
                url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName + " tutorial")}`,
                duration: "2 hr",
                type: "video"
            },
            ...GENERIC_YOUTUBE_FALLBACKS
        ];
    }
}
