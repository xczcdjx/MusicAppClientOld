export function setStorage(name,value) {
    localStorage.setItem(name,JSON.stringify(value))
}

export function getStorage(name){
    return JSON.parse(localStorage.getItem(name))
}
export function removeStorage(name) {
    return localStorage.removeItem(name)
}