export function getNames() {
    return fetch('http://localhost:3000/test/v1/names')
        .then(data => data.json())
}