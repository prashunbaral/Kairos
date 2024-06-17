"use client";

const sucess = () => {
  return (
    <div className="flex justify-center items-center mt-[15%]">
      <div className="notifications-container">
        <div className="success">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="succes-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="success-prompt-wrap">
              <p className="success-prompt-heading">Order completed</p>
              <div className="success-prompt-prompt">
                <p>
                  Youre happy now? Does this impulsive action is really going to
                  satisfy you? Dont answer me, answer yourself. Anyway, your
                  Purchase is on its way.
                </p>
              </div>
              <div className="success-button-container">
                <a href="/">
                  <button type="button" className="success-button-main">
                    Dismiss
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default sucess;