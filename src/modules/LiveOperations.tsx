export default function LiveOperations() {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Live Operations Radar</h2>
        <p className="text-gray-500 text-sm mt-1">Real-time WebSocket connection to the global CarCare dispatch grid.</p>
      </div>
      <div className="flex-1 bg-gray-900 rounded-xl p-6 relative overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #DF3923 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="relative z-10 p-8 pt-24 pb-24 border border-brand/30 bg-black/40 backdrop-blur-sm rounded-2xl w-full max-w-2xl">
          <span className="relative flex h-5 w-5 mx-auto mb-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-brand"></span>
          </span>
          <h3 className="text-xl font-bold text-white mb-2">Awaiting WebSocket Events...</h3>
          <p className="text-gray-400 max-w-md mx-auto">No live dispatch requests are streaming right now. When a booking state changes anywhere in the network, it will instantly appear here.</p>
        </div>
      </div>
    </div>
  );
}
