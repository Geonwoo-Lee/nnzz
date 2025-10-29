export default function Loading() {
  return (
    <div className="max-w-[640px] mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="h-8 bg-slate-200 rounded-lg w-3/4 animate-pulse"></div>
        <div className="flex gap-2 overflow-hidden">
          <div className="h-10 bg-slate-200 rounded-full w-20 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded-full w-24 animate-pulse"></div>
          <div className="h-10 bg-slate-200 rounded-full w-16 animate-pulse"></div>
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl bg-white overflow-hidden shadow-sm">
            <div className="w-full h-48 bg-slate-200 animate-pulse"></div>

            <div className="p-5 space-y-3">
              <div className="h-6 bg-slate-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6 animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 bg-slate-200 rounded-full w-16 animate-pulse"></div>
                <div className="h-6 bg-slate-200 rounded-full w-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}