// create a functiion to log and event data and payload

export const logEvent = ({ event, payload }) => {
  if (!payload) {
    console.log(`-------------LOGGING EVENT -> ${event}-----------------`);
    return;
  }
  console.log(`-------------START LOGGIN -> ${event}-----------------`);
  console.log(JSON.stringify(payload, null, 2));
  console.log(`-------------END LOGGIN -> ${event} -----------------`);
};
