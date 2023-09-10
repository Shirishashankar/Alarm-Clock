
// Variables
const currentTime = document.querySelector("#current-time");
const setHours = document.querySelector("#hours");
const setMinutes = document.querySelector("#minutes");
const setSeconds = document.querySelector("#seconds");
const setAmPm = document.querySelector("#am-pm");
const setAlarmButton = document.querySelector("#submitButton");
const alarmContainer = document.querySelector("#alarms-container");


// Adding Hours , Minutes , Seconds in dropdown menu of alarm 

window.addEventListener("DOMContentLoaded", (event) => {
  
    dropDownMenu(1, 12, setHours);
   
    dropDownMenu(0, 59, setMinutes);
  
    dropDownMenu(0, 59, setSeconds);
  
    setInterval(getCurrentTime, 1000);
    fetchAlarm();
  });

  // Adding Event Listener to set alarm button

  setAlarmButton.addEventListener("click", getInput);

  //  funtion to loop through hours minutes seconds in dropdown menu

  function dropDownMenu(start, end, element) {
    for (let i = start; i <= end; i++) {
      const dropDown = document.createElement("option");
      dropDown.value = i < 10 ? "0" + i : i;
      dropDown.innerHTML = i < 10 ? "0" + i : i;
      element.appendChild(dropDown);
    }
  }

  function getCurrentTime() {
    let time = new Date();
    time = time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    currentTime.innerHTML = time;
  
    return time;
  }

  function getInput(e) {
    e.preventDefault();
    const hourValue = setHours.value;
    const minuteValue = setMinutes.value;
    const secondValue = setSeconds.value;
    const amPmValue = setAmPm.value;
  
    const alarmTime = convertToTime(
      hourValue,
      minuteValue,
      secondValue,
      amPmValue
    );
    setAlarm(alarmTime);
  }

  // funtion to convert time to 24 hour format

  function convertToTime(hour, minute, second, amPm) {
    return `${parseInt(hour)}:${minute}:${second} ${amPm}`;
  }

  // funtion to compare the current time with the set alarm time 

  function setAlarm(time, fetching = false) {
    const alarm = setInterval(() => {
      if (time === getCurrentTime()) {
        alert("Ringing");
      }
      console.log("running");
    }, 500);
  
    addAlarmToDom(time, alarm);
    if (!fetching) {
      saveAlarm(time);
    }
  }

  // function to add a new alarm entry to the alarms list

  function addAlarmToDom(time, intervalId) {
    const alarm = document.createElement("div");
    alarm.classList.add("alarm", "mb", "display");
    alarm.innerHTML = `
                <div class="time">${time}</div>
                <button class=" delete-alarm" data-id=${intervalId}>
                   Delete
                </button>
                `;
    const deleteButton = alarm.querySelector(".delete-alarm");
    deleteButton.addEventListener("click", (e) => deleteAlarm(e, time, intervalId));
  
    alarmContainer.prepend(alarm);
  }

  // function to check if there are any alarms saved in the local storage

function checkAlarms() {
    let alarms = [];
    const isPresent = localStorage.getItem("alarms");
    if (isPresent) alarms = JSON.parse(isPresent);
  
    return alarms;
  }
  
  // function to save the alarm time to the local storage

  function saveAlarm(time) {
    const alarms = checkAlarms();
  
    alarms.push(time);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }
  
  // Funtion to fetch alarms from local storage

  function fetchAlarm() {
    const alarms = checkAlarms();
  
    alarms.forEach((time) => {
      setAlarm(time, true);
    });
  }

  // funtions to delete alarm from DOM
  
  function deleteAlarm(event, time, intervalId) {
    const self = event.target;
  
    clearInterval(intervalId);
  
    const alarm = self.parentElement;
    console.log(time);
  
    deleteAlarmFromLocal(time);
    alarm.remove();
  }
  
  function deleteAlarmFromLocal(time) {
    const alarms = checkAlarms();
  
    const index = alarms.indexOf(time);
    alarms.splice(index, 1);
    localStorage.setItem("alarms", JSON.stringify(alarms));
  }