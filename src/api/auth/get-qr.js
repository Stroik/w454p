
const getQR = (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  let json = JSON.stringify({message: "Ok", status: 200});
  res.end(json);
}

export default getQR;