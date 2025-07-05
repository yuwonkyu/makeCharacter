const BlueSpinner = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-6" />
    <span className="text-blue-300 text-lg font-semibold">
      캐릭터 불러오는중...
    </span>
  </div>
);

export default BlueSpinner;
