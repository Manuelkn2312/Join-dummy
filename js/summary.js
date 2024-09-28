/**
 * Initializes the board by loading tasks and counting their statuses.
 * Awaits the loading of tasks before counting the status.
 */
async function initBoard() {
  await loadTasks();
  countStatus();
}

/**
 * Counts the number of tasks in each status category and updates the corresponding HTML elements.
 * Also calculates and displays the total number of tasks and the upcoming deadline.
 */
function countStatus() {
  const statusDone = "done";
  const statustodo = "todo";
  const statuspriority = "urgent";
  const statusawaitFeedback = "awaitFeedback";
  const statusinProgress = "inProgress";

  const done = tasks.filter((t) => t.status === statusDone);
  const todo = tasks.filter((t) => t.status === statustodo);
  const priority = tasks.filter((t) => t.priority === statuspriority);
  const awaitFeedback = tasks.filter((t) => t.status === statusawaitFeedback);
  const inProgress = tasks.filter((t) => t.status === statusinProgress);

  document.getElementById("count-done").innerHTML = done.length;
  document.getElementById("count-todo").innerHTML = todo.length;
  document.getElementById("count-priority").innerHTML = priority.length;
  document.getElementById("count-awaitFeedback").innerHTML =
    awaitFeedback.length;
  document.getElementById("count-inProgress").innerHTML = inProgress.length;

  const totalTasks = tasks.length;
  document.getElementById("count-board").innerHTML = totalTasks;

  const upcomingDeadline = getUpcomingDeadline(tasks);
  document.getElementById("upcoming-deadline").innerHTML = upcomingDeadline;
}

/**
 * Finds the nearest upcoming deadline from the list of tasks and returns it as a formatted date string.
 * If no deadlines are present, returns a message indicating no upcoming deadlines.
 * @param {Array} tasks - The array of task objects.
 * @returns {string} - The upcoming deadline as a formatted date string, or a message if none exist.
 */
function getUpcomingDeadline(tasks) {
  let nextDeadline = null;

  for (const task of tasks) {
    if (task.date) {
      const taskDeadline = new Date(task.date);

      if (!nextDeadline || taskDeadline < nextDeadline) {
        nextDeadline = taskDeadline;
      }
    }
  }

  return nextDeadline
    ? nextDeadline.toLocaleDateString()
    : "No upcoming deadlines";
}

/**
 * Sets up event listeners on page load to change the images of elements with certain classes on hover.
 * Changes the image source on mouseover and mouseout events.
 */
document.addEventListener("DOMContentLoaded", () => {
  const hoverImgs = {
    ".todo": "assets/icons/Frame 59 (2).png",
    ".done": "assets/img/Group.png",
  };

  const originalImgs = {
    ".todo": "assets/icons/Frame 59 (1).png",
    ".done": "assets/icons/Frame 59 (3).png",
  };

  const changeImg = (selector, src) => {
    document.querySelector(`${selector} img`).src = src;
  };

  Object.keys(hoverImgs).forEach((selector) => {
    const originalSrc = originalImgs[selector];
    const hoverSrc = hoverImgs[selector];
    const element = document.querySelector(selector);
    element.addEventListener("mouseover", () => changeImg(selector, hoverSrc));
    element.addEventListener("mouseout", () =>
      changeImg(selector, originalSrc)
    );
  });
});

/**
 * Updates the greeting message based on the current time of day and displays the user's name if available.
 * Retrieves the username from localStorage and updates the greeting accordingly.
 */
function updateGreeting() {
  let currentHour = new Date().getHours();
  let userName = localStorage.getItem("loggedInUserName");

  let greetingText = "";

  if (currentHour >= 6 && currentHour < 12) {
    greetingText = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingText = "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greetingText = "Good evening";
  } else {
    greetingText = "Good night";
  }

  /**
   * Updates the displayed greeting name with the username stored in localStorage.
   * If no username is found, the function does nothing.
   */
  if (userName) {
    document.getElementById("greetingText").textContent = greetingText;
    document.getElementById("greetingName").textContent = userName;
  } else {
    document.getElementById("greetingText").textContent = "Welcome";
    document.getElementById("greetingName").textContent = "Guest";
  }
}

/**
 * Adds an event listener to update the greeting when the DOM is fully loaded.
 */
function updateGreetingName() {
  let userName = localStorage.getItem("loggedInUserName");
  if (userName) {
    document.getElementById("greetingName").textContent = userName;
  }
}

document.addEventListener("DOMContentLoaded", updateGreeting);
