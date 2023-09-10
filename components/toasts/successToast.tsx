import { useEffect, useState } from "react";

const SuccessToast = ({
  title,
  message,
  onClose,
}: {
  title: string;
  message: string;
  onClose: () => void;
}) => {
  const [ isToastVisible, setToastVisible ] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { Tab, initTE, Toast } = await import("tw-elements");
      initTE({ Tab, Toast });
    };
    init();
  }, []);

  const handleToastClose = () => {
    setToastVisible(false);
    onClose();
  };

  if (!isToastVisible) {
    return null;
  }
  return (
    <div
    className="pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-success-100 bg-clip-padding text-sm text-success-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
    id="static-example"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-te-autohide="false"
    data-te-toast-init
    data-te-toast-show>
    <div
      className="flex items-center justify-between rounded-t-lg border-b-2 border-success/20 bg-success-100 bg-clip-padding px-4 pb-2 pt-2.5">
      <p className="flex items-center font-bold text-success-700">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check-circle"
          className="mr-2 h-4 w-4 fill-current"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <path
            fill="currentColor"
            d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
        </svg>
        {title}
      </p>
      <div className="flex items-center">
        <button
          type="button"
          className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-toast-dismiss
          aria-label="Close"
          onClick={handleToastClose}>
          <span
            className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        </button>
      </div>
    </div>
    <div
      className="break-words rounded-b-lg bg-success-100 px-4 py-4 text-success-700">
      {message}
    </div>
  </div>
  );
};

export default SuccessToast;