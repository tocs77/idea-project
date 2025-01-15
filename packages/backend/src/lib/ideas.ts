import { times } from 'lodash';

export const ideas = times(100, (i) => ({
  nick: `cool-idea${i}`,
  name: `Super idea${i}`,
  description: `Very interesting idea ${i}`,
  text: times(Math.floor(Math.random() * 100), (j) => `<p>Text paragraph ${j} of idea ${i}...</p>`).join(''),
}));
