export default function canonize(string) {
  let userName = string;
  let reg = new RegExp('@?(https?:)?(\/\/)?((telegram|vk|vkontakte|twitter)[^\/]*\/)?([A-Za-z0-9]*)');
  return userName.match(reg)[5];
}
