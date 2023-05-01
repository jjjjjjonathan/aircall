export const checkCallObject = (call) => {
  return (
    call.hasOwnProperty('direction') &&
    call.hasOwnProperty('from') &&
    call.hasOwnProperty('to') &&
    call.hasOwnProperty('via') &&
    call.hasOwnProperty('call_type')
  );
};
