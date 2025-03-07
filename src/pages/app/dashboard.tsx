'use client'

import { CreateTaskDialog } from '@/components/create-task-dialog'
import { TaskFilter } from '@/components/task-filter'
import { TaskList } from '@/components/task-list'

export default function Dashboard() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Suas tarefas</h2>
        <TaskFilter />
        <CreateTaskDialog />
      </div>
      <TaskList />
    </>
  )
}
