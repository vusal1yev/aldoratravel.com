export const getCookie = (name: string) => {
  if (typeof window === "undefined") {
    console.log("Sunucu tarafında checkSession çalıştırıldı.");
    return null;
  }

  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (cname: string, cvalue: string, exdays = 365) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const removeCookie = (name: string) => {
  document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
};
