import { Skeleton } from './ui/skeleton'

export function TaskListSkeleton() {
  return (
    <>
      {Array.from({ length: 9 }).map((item, index) => (
        <Skeleton className="h-[156px] p-6 rounded-xl" key={index * 2}>
          <Skeleton className="w-56 h-6" />
          <Skeleton className="w-56 h-4 mt-5" />
          <Skeleton className="w-56 h-9 mt-5" />
        </Skeleton>
      ))}
    </>
  )
}
