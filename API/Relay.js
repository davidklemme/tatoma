export async function fetchAPIKeys() {
  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJyZWxheSIsImlhdCI6MTYzNjk4MjA5OCwidXNlciI6InRhdG9tYSBSZWxheSBUZWNobmljYWwgVXNlciJ9.qzxZEg8-KNybiLRuzjSDgXykz5BP-VYxxuKWQX1LQ3A',
  );

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await fetch(
    'https://vast-stream-87947.herokuapp.com/db',
    requestOptions,
  );
  return response.json();
}
