const DownloadButton = ({ onClick }) => (
  <button
    onClick={onClick}
    type="submit"
    className="text-xs border border-blue-300 rounded-lg text-black p-2 w-full hover:bg-blue-100 transition-colors duration-300"
  >
    Download Quotation and Pay Later
  </button>
);

export default DownloadButton;
