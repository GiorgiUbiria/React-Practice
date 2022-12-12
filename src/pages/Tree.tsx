import { useState } from "react";
import "../App.css";

type TFileTree = {
  name: string;
  children?: string[];
};

const Files = {
  children: [
    {
      name: "Pages",
      children: [
        {
          name: "Points.tsx",
        },
        {
          name: "Tree.tsx",
        },
      ],
    },
    {
      name: "assets",
      children: [
        {
          name: "Logos",
          children: [
            {
              name: "Logo.svg",
            },
            {
              name: "Other-Logo.svg",
            },
          ],
        },
      ],
    },
  ],
};

const Entry = ({ entry, depth }: { entry: TFileTree; depth: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isExpanded === false) {
      setIsExpanded(true);
    }

    if (isExpanded === true) {
      setIsExpanded(false);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClicked} className="button">
        {entry.children && !isExpanded && "+ "}
        {entry.children && isExpanded && "- "}
        {entry.name}
      </button>
      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((fileEntry) => (
            <Entry entry={fileEntry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = () => {
  return (
    <div className="Tree">
      {Files.children.map((fileEntry) => (
        <Entry entry={fileEntry} depth={1} />
      ))}
    </div>
  );
};

export default Tree;
