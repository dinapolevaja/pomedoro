import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Task } from '../../types';
import { AddTaskModal } from './AddTaskModal';
import { TaskSection } from './TaskSection';
import { useTaskStore } from '../../store/taskStore';

interface TaskListProps {
  tasks: Task[];
  onTaskToggle: (taskId: string) => void;
  onAddTask: (task: { name: string; description: string; pomodoros: number }) => void;
}

export function TaskList({ tasks, onTaskToggle, onAddTask }: TaskListProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const updateTaskOrder = useTaskStore(state => state.updateTaskOrder);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const plannedTasks = tasks.filter(task => task.status === 'planned');
  const activeTasks = tasks.filter(task => task.status === 'active');
  const completedTasks = tasks.filter(task => task.status === 'done');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = plannedTasks.findIndex(task => task.id === active.id);
      const newIndex = plannedTasks.findIndex(task => task.id === over.id);
      
      const newOrder = arrayMove(plannedTasks, oldIndex, newIndex);
      updateTaskOrder(newOrder.map(task => task.id));
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl space-y-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Tasks</h3>
          <button
            className="text-[#39FF14] hover:text-[#39FF14]/80 transition-colors"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="inline-block mr-2" />
            Add Task
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-8">
            {activeTasks.length > 0 && (
              <TaskSection
                title="Active"
                tasks={activeTasks}
                onTaskToggle={onTaskToggle}
              />
            )}

            <TaskSection
              title="Planned"
              tasks={plannedTasks}
              onTaskToggle={onTaskToggle}
              enableDragAndDrop
            />

            {completedTasks.length > 0 && (
              <TaskSection
                title="Completed"
                tasks={completedTasks}
                onTaskToggle={onTaskToggle}
              />
            )}
          </div>
        </DndContext>
      </div>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={onAddTask}
      />
    </>
  );
}