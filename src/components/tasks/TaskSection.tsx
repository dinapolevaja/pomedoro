import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '../../types';
import { SortableTaskItem } from './SortableTaskItem';
import { TaskItem } from './TaskItem';

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  enableDragAndDrop?: boolean;
}

export function TaskSection({
  title,
  tasks,
  onTaskToggle,
  enableDragAndDrop = false
}: TaskSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-medium text-gray-400">{title}</h4>
      <div className="space-y-3">
        {enableDragAndDrop ? (
          <SortableContext
            items={tasks.map(task => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasks.map(task => (
              <SortableTaskItem
                key={task.id}
                task={task}
                onToggle={onTaskToggle}
              />
            ))}
          </SortableContext>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onTaskToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}