const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const keyVaultUrl = "https://kv-functions-python.vault.azure.net"; // Replace with your Key Vault URL
const secretName = "AzureFunctionKey-masterkey-functionapp-python-pdf"; // Replace with your secret name

const credential = new DefaultAzureCredential();
const client = new SecretClient(keyVaultUrl, credential);

async function getSecret() {
  try {
    const secret = await client.getSecret(secretName);
    return secret.value;
  } catch (error) {
    console.error("Failed to retrieve secret:", error);
    return null;
  }
}

module.exports = getSecret;
