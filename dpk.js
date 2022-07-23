const crypto = require("crypto");

// This function take optional event object and calculate deterministic partition key
exports.deterministicPartitionKey = (event) => {
  // Default value if no event exist
  const TRIVIAL_PARTITION_KEY = "0";
  // Default max key length for candidate 
  const MAX_PARTITION_KEY_LENGTH = 256;

  // If event object doesn't exist return TRIVIAL_PARTITION_KEY as default
  // Note: Not checking for empty object as in original example it was not handled
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If partitionKey doen't exist, then return hex encoded SHA3-512 hash of event object  
  if (!event.partitionKey) {
    const data = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  // Assign partitionKey string to candidate object.  
  let candidate = event.partitionKey;

  // Incase the partitionKey was an object, convert it to string.
  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }

  // Finally check if candidate is greater then MAX_PARTITION_KEY_LENGTH.
  // If so take hex encoded SHA3 - 512 hash in hex which will have 128 lenght.
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate;
};