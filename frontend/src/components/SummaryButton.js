import React from "react";

const SummaryButton = ({ onClick, status }) => {
  let buttonText = "Summarize";
  let buttonClass = "";

  if (status === "sending") {
    buttonText = "Sending...";
    buttonClass = "sending";
  } else if (status === "success") {
    buttonText = "Sent to Slack!";
    buttonClass = "success";
  } else if (status === "failure") {
    buttonText = "Failed!";
    buttonClass = "failure";
  }

  return (
    <button
      className={`summarize-button ${buttonClass}`}
      onClick={onClick}
      disabled={status === "sending"} // Disable button while sending
    >
      {buttonText}
    </button>
  );
};

export default SummaryButton;
