const getCharacters = async (offset, orderBy) => {
  const response = await fetch(
    `${baseUrl}characters?apikey=${publicKey}&offset=${offset}&orderBy=${orderBy}`
  );

  const data = await response.json();

  return data;
};
