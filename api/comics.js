const getComics = async (offset, orderBy) => {
  const response = await fetch(
    `${baseUrl}comics?orderBy=${orderBy}&apikey=${publicKey}&offset=${offset}`
  );

  const data = await response.json();

  return data;
};
