type BlueSpinnerProps = {
  text?: string;
};

const BlueSpinner = ({ text = "Loading..." }: BlueSpinnerProps) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
    <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-6" />
    <span className="text-blue-300 text-lg font-semibold">{text}</span>
  </div>
);

export default BlueSpinner;
