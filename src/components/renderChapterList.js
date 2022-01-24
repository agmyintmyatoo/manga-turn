import "../index.css";
import { Link } from "react-router-dom";

// If I use useParams hook from 'react',
// "hook order" react warning show
// so I tried to manually extract from window location href

const renderChapterList = ({ chapterList, totalElements }) => {
    return (
        <>
            <div className="p-2 m-2 flex flex-col gap-2">
                {chapterList.map(chapter => Chapter(chapter))}
            </div>
        </>
    );
};

export default renderChapterList;

const Chapter = ({
    id,
    chapterName,
    chapterNo,
    type,
    pages = [],
    point,
    totalPages,
}) => {
    const mangaId = window.location.pathname.split("/")[2];
    return (
        <Link key={id} className="hover:shadow-lg" to={`/manga/${mangaId}/chapter/${id}`}>
            <div className="px-10 py-2 text-sm" key={id}>
                {chapterName} ({totalPages} pages)
            </div>
        </Link>
    );
};