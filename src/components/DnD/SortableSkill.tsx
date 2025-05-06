import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SkillType } from "../Sections/SkillSet";
import { X } from "lucide-react";

const SortableSkill = ({
  id,
  name,
  level,
  onRemove,
}: {
  id: number;
  name: string;
  level: SkillType;
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
      className="flex items-center h-[48px] px-2 py-1 gap-2.5 text-sm text-[#5C5C5C] bg-white border border-[#ECECEC] rounded-sm"
    >
      <div
        className="flex items-center gap-2.5 cursor-move px-2 py-1"
        {...attributes}
        {...listeners}
      >
        {name} ({level})
      </div>

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

export default SortableSkill;
