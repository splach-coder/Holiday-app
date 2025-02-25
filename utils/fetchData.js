const axios = require("axios");
const getSecret = require("./keyvault"); // Adjust the path

async function fetchUserData(username, route) {
  try {
    const apiKey = await getSecret("AzureFunctionKey-masterkey-functionapp-python-pdf");
    const apiUrl = `https://functionapp-python-pdf.azurewebsites.net/api/holidays/${route}/${username}?code=${apiKey}`;

    const response = await axios.get(apiUrl);
    return response.data[0];
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

module.exports = { fetchUserData }
