import { useEffect, useState } from "react";

const ErrorToast = ({
  title,
  message,
  onClose,
  className,
}: {
  title: string;
  message: string;
  className?: string;
  onClose: () => void;
}) => {
  const [isToastVisible, setToastVisible] = useState(true);

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
      className={`pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-danger-100 bg-clip-padding text-sm text-danger-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden ${className}`}
      id="myToast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-te-autohide="false"
      data-te-toast-init
      data-te-toast-show
    >
      <div className="flex items-center justify-between rounded-t-lg border-b-2 border-danger-200 bg-danger-100 bg-clip-padding px-4 pb-2 pt-2.5 text-danger-700">
        <p className="flex items-center font-bold text-danger-700">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times-circle"
            className="mr-2 h-4 w-4 fill-current"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
            ></path>
          </svg>
          {title}
        </p>
        <div className="flex items-center">
          <button
            type="button"
            className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-toast-dismiss
            aria-label="Close"
            onClick={handleToastClose}
          >
            <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="break-words rounded-b-lg bg-danger-100 px-4 py-4 text-danger-700">
        {message}
      </div>
    </div>
  );
};

export default ErrorToast;
