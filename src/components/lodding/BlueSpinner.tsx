type BlueSpinnerProps = {
  text?: string;
};

const BlueSpinner = ({ text = "불러오는 중..." }: BlueSpinnerProps) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-6" />
    <span className="text-blue-300 text-lg font-semibold">{text}</span>
  </div>
);

export default BlueSpinner;
