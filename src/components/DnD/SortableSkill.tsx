import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableSkill = ({ skill, index, onRemove }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: index,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="px-4 py-1 h-[48px] rounded-sm flex items-center gap-2.5 text-sm text-[#5C5C5C] border border-[#ECECEC] cursor-move"
    >
      {skill.name} ({skill.level})
      <button type="button" onClick={() => onRemove(index)}>
        ×
      </button>
    </div>
  );
};
