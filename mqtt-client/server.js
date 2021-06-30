'use strict'

const mqtt = require("mqtt")
const client = mqtt.connect({ port: 1883, host: '127.0.0.1', keepalive: 10000 });
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let userName = 'Unknown';

client.on('connect', () => {
  console.log('Connected to Chat Server');
  client.subscribe('chat');
  rl.question('Enter your name:', (answer) => {
    userName = answer;
    rl.on('line', (input) => {
      client.publish('chat', userName + " says : " + input);
    });
  });

});

client.on('close', () => {
  console.log('Chat Server closed');
});

client.on('message', (topic, message) => {
  console.log(message.toString());
});