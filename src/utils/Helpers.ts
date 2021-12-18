export function getArgsFromMsg(
  msg: string,
  prefixLn: number
): { commandName: string; args?: string[] } {
  // Args including the command name
  let args = msg.slice(prefixLn).split(/ +/);

  return {
    commandName: args[0],
    args: args.slice(1),
  };
}
