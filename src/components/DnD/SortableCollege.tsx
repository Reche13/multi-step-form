import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";

const SortableCollege = ({
  id,
  degree,
  uniName,
  startYear,
  endYear,
  onRemove,
}: {
  id: number;
  degree: string;
  uniName: string;
  startYear: Date;
  endYear: Date;
  onRemove: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "fit-content",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between gap-2.5 px-4 h-12 border border-[#ECECEC] rounded-sm bg-white"
      {...attributes}
    >
      <div {...listeners} className="cursor-grab">
        <GripVertical className="text-primary" size={16} />
      </div>
      <span className="text-sm text-[#5C5C5C] font-normal">
        {degree} - {uniName} ({new Date(startYear).getFullYear()} -{" "}
        {new Date(endYear).getFullYear()})
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="cursor-pointer"
      >
        <X size={20} color="#484848" />
      </button>
    </div>
  );
};

export default SortableCollege;
