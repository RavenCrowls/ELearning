interface CourseCardProps {
    id: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    instructor: string;
    tags: string[];
}

export default function CourseCard({
    title,
    image,
    rating,
    reviewCount,
    instructor,
    tags
}: CourseCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 mb-2">{instructor}</p>
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400">{rating.toFixed(1)} ★</span>
                    <span className="text-gray-600 ml-1">({reviewCount} reviews)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
