import { exec } from 'node:child_process';

function timeoutFunc() {
  exec('cd latex && docker-compose up', (err, output) => {
    // once the command has completed, the callback function is called
    if (err) {
      // log and return if we encounter an error
      console.error('could not execute command: ', err);
      return;
    }
    // log the output received from the command
    console.log('Output: \n', output);
  });
}

export function excDocker(): void {
  setTimeout(timeoutFunc, 3000);
}
