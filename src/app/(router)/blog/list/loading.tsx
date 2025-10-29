export default function Loading() {
  return (
    <div className="max-w-[640px] mx-auto px-6 py-12">
      <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded-full w-24"></div>

        <div className="space-y-2">
          <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          <div className="h-8 bg-slate-200 rounded w-1/2"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-6 w-6 bg-slate-200 rounded-full"></div>
          <div className="h-4 bg-slate-200 rounded w-24"></div>
          <div className="h-4 bg-slate-200 rounded w-32"></div>
        </div>

        <div className="flex gap-2">
          <div className="h-6 bg-slate-200 rounded-full w-16"></div>
          <div className="h-6 bg-slate-200 rounded-full w-20"></div>
          <div className="h-6 bg-slate-200 rounded-full w-14"></div>
        </div>

        <div className="w-full h-64 bg-slate-200 rounded-3xl"></div>

        <div className="space-y-3 pt-8">
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  )
}