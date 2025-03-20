import Toast from "./models/Message";

function App() {
  return (
    <>
      <Toast
        message="Operation successful!"
        variant="success"
        duration={5000}
      />
      <Toast
        message="Warning: Check your input!"
        variant="success"
        duration={5000}
      />
      <Toast message="Error occurred!" variant="error" duration={5000} />
      <Toast
        message="Warning: Check your input!"
        variant="warning"
        duration={5000}
      />
      <Toast
        message="Error occurred!"
        variant="error"
        duration={5000}
      />
      <Toast
        message="Warning: Check your input!"
        variant="warning"
        duration={5000}
      />
      <Toast
        message="Error occurred!"
        variant="error"
        duration={5000}
      />
      <Toast
        message="Custom Info Notification!"
        variant="info"
        duration={5000}
        background="#282c34" // Custom background color
        textColor="#61dafb" // Custom text color
        progressColor="#61dafb" // Custom progress bar color
        customIcon={
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="30"
              height="30"
              style={{ shapeRendering: "auto", display: "block", background: "rgba(255, 255, 255, 0)" }}
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <path
                  stroke="none"
                  fill="#ffffff"
                  d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                >
                  <animateTransform
                    values="0 50 51;360 50 51"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    dur="1s"
                    type="rotate"
                    attributeName="transform"
                  ></animateTransform>
                </path>
                <g></g>
              </g>
            </svg>
          </>
        }
      />
    </>
  );
}

export default App;
