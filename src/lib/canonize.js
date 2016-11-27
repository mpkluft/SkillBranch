export default function canonize(url) {
  if (url) {
    const re = new RegExp('(https?:)?(\/\/)?((www.|xn--|[a-z]+.[a-z]+)[^\/]*\/)?@?([a-z._]+)', 'i');
    const username = url.match(re)[5];
    return `@${username}`;
  }
  else {
    return 'Invalid username';
  }
}