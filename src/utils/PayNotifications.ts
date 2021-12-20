/**
 * Get pay notifications from pay gateway.
 */

import WebSocket from 'ws';

export default class PayNotifications {
  public static listen() {
    try {
      const ws = new WebSocket('ws://localhost:3000/', {
        perMessageDeflate: false,
      });

      ws.on('error', (err) => {
        console.log('WS', err.message);
      });

      ws.on('close', () => {
        console.log('WS closed');
      });

      ws.on('open', () => {
        console.log('WS open');
        ws.send(
          JSON.stringify({
            event: 'pay',
            data: 'help me pls',
          })
        );
      });

      ws.on('message', (msg: Buffer) => {
        console.log('Got msg:', msg.toString());
      });
    } catch (err) {
      console.log("Couldn't connect to pay gateway!", err);
    }
  }
}
