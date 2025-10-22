function getSpecificStringController(req, res) {
  const { id } = req.params;

  console.log(`Fetching string with ID: ${id}`);
  // Logic to retrieve the specific string by ID
  res.status(200).json({ message: `String with ID: ${id} retrieved successfully.` });
}

export default getSpecificStringController;