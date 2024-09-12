# Pomodoro Timer

This is a Pomodoro timer that runs on a local server. It defines the intervals as:
- 4x(25 min work + 5 min short break)
- 1 x (30 min long break) cycles.

After 1 cycle is completed, the screen shows and keeps the message "x pomodoro cycle(s) completed" until the next cycle completion.

## Features
- **Pomodoro Cycles**: Four 25-minute work intervals followed by 5-minute breaks, and a 30-minute long break after completing four cycles.
- **Cycle Completion Message**: Displays the number of completed Pomodoro cycles.
- **Consistent Theme**: Utilizes Material UI and a consistent color theme across the app.
- **Hooks**: Uses React hooks to manage timer functionality.

## Upcoming Features
- **Notifications**: Direct text message for cycle completion, with plans to include notifications.
- **Customization**: Options to customize work, short break, and long break phase lengths.

## Technologies Used
- [Create React App](https://github.com/facebook/create-react-app)
- [React](https://reactjs.org/)
- [Material UI](https://material-ui.com/)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ekinyaldiz/pomodoro-timer.git