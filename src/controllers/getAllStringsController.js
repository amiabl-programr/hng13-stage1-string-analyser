function getAllStringsController(req, res) {
  // Logic to retrieve all strings from the database or data source
  const allStrings = [
    // Example data
    { id: 1, value: "Hello, world!" },
    { id: 2, value: "Bonjour le monde!" },
    { id: 3, value: "Hola, mundo!" },
  ];

  res.status(200).json({
    success: true,
    data: allStrings,
  });
}

export default getAllStringsController;