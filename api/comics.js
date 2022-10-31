const getComics = async (offset = 0, orderBy) => {
  const response = await fetch(
    `${baseUrl}comics?orderBy=${orderBy}&offset=${offset}&apikey=${publicKey}`
  );

  const data = await response.json();

  return data;
};
