const getCharacters = async (orderBy, offset) => {
  const response = await fetch(
    `${baseUrl}characters?orderBy=${orderBy}&offset=${offset}&apikey=${publicKey}`
  );

  const data = await response.json();

  return data;
};
