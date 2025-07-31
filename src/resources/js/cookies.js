export const getCookieValue = (name) => (
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
)

export const removeCookie = (name) => {
  document.cookie = `${name}=; Max-Age=0; path=/;`
}