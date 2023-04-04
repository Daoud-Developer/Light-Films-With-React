import { useState } from "react";
const ReadMore = ({ children, className = "", limitTextLength, ...others }) => {
    const [isReadingMore, setIsReadingMore] = useState(false);
    const content = isReadingMore
        ? children
        : children.slice(0, limitTextLength);
    return (<>
      <span {...others} className={`${className} inline-block`}>
        {content}

        <button onClick={() => setIsReadingMore((prev) => !prev)} className="font-medium italic hover:brightness-75 transition duration-300">
          {!isReadingMore &&
            children.length > limitTextLength &&
            "... See more"}
          {isReadingMore && <>&nbsp; Show less</>}
        </button>
      </span>
    </>);
};
export default ReadMore;
