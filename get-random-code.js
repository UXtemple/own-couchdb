import random from 'random-gen';

export default function getRandomCode(blacklist=[]) {
  let code;

  do {
    code = random.upper(4);
  } while (blacklist.indexOf(code) > -1);

  return code;
}
