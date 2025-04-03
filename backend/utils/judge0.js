

const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;


// /**
//  * Submits code to the Judge0 API.
//  * @param {string} source_code The code to execute.
//  * @param {number} language_id Numeric identifier for the language.
//  * @param {Array} test_cases Array of test case objects with input and expectedOutput.
//  * @param {boolean} [wait=true] Whether to wait for the result synchronously.
//  * @returns {Object} Judge0 API response with parsed results.
//  */
// async function submitCodeToJudge0(source_code, language_id, test_cases, wait = true) {
//   try {
//     // Prepare a modified version of the source code by removing existing console.log calls.
//     let modified_source_code = source_code.replace(/console\.log\([^)]*\);/g, "");

//     // Wrap the solution code with a custom test runner.
//     const wrapperCode = `
// // Original solution code
// ${modified_source_code}

// // Test case runner
// const fs = require('fs');
// function runTestCases() {
//     try {
//         // Read from stdin using fs module instead of process.stdin
//         const input = fs.readFileSync(0, 'utf-8');
//         const lines = input.trim().split('\\n');
        
//         console.log("Starting test cases...");
//         // Process every two lines together: first line is input, second is expected output
//         for (let i = 0; i < lines.length; i += 2) {
//             const inputStr = lines[i].trim();
            
//             // Using regex to capture the pattern: [numbers], target
//             const match = inputStr.match(/\\[(.*?)\\],\\s*(\\d+)/);
//             if (!match) {
//                 console.log(\`No match for input: \${inputStr}\`);
//                 continue;
//             }
            
//             // Extract numbers and target
//             const numsStr = match[1];
//             const nums = numsStr.split(',').map(n => parseInt(n.trim()));
//             const target = parseInt(match[2]);
            
//             // Call the solution function and print the result
//             const result = twoSum(nums, target);
//             console.log(JSON.stringify(result));
//         }
//     } catch (e) {
//         console.error('Test runner error:', e.message);
//     }
// }

// runTestCases();
// `;

//     // Construct the URL with the required query parameters.
//     const url = `${JUDGE0_API_URL}?base64_encoded=false&wait=${wait}`;

//     // Format test cases for Judge0: For each test case, join the input and expected output with a newline.
//     // This will result in a single string with each test case taking two lines.
//     const formattedTestCases = test_cases.map(tc => {
//       if (typeof tc.input === "string") {
//         return `${tc.input}\n${tc.expectedOutput}`;
//       } else if (Array.isArray(tc.input)) {
//         return `${tc.input.join(" ")}\n${tc.expectedOutput}`;
//       }
//       return "";
//     }).filter(Boolean);

//     const data = {
//       source_code: wrapperCode,
//       language_id,
//       stdin: formattedTestCases.join("\n")
//     };

//     const headers = {
//       "Content-Type": "application/json",
//       "X-RapidAPI-Key": JUDGE0_API_KEY,
//       "X-RapidAPI-Host": JUDGE0_HOST
//     };

//     const response = await axios.post(url, data, { headers });
    
//     // Extract test case outputs from stdout by splitting on newlines.
//     let test_case_outputs = [];
//     if (response.data.stdout) {
//       // Skip the "Starting test cases..." line and any potential diagnostic lines
//       const outputLines = response.data.stdout.trim().split("\n");
//       // Filter out diagnostic lines that don't look like JSON arrays
//       test_case_outputs = outputLines.filter(line => 
//         line.startsWith('[') && line.endsWith(']')
//       );
//     }
    
//     return {
//       ...response.data,
//       test_case_outputs
//     };
//   } catch (err) {
//     console.error("Error in submitCodeToJudge0:", err.response ? err.response.data : err);
//     throw err;
//   }
// }

// module.exports = { submitCodeToJudge0 };


// const submitCodeToJudge0 = async (sourceCode, languageId, testCases) => {
//   try {
//     // Prepare the data for the submission
//     const submissionData = {
//       submissions: testCases.map(testCase => ({
//         source_code: sourceCode,
//         language_id: languageId,
//         stdin: testCase.input,          // Assuming testCase has an 'input' field
//         expected_output: testCase.expectedOutput // Assuming testCase has an 'expectedOutput' field
//       }))
//     };

//     // Make the request to Judge0 via RapidAPI
//     const response = await axios.post(
//       process.env.JUDGE0_API_URL, // e.g., "https://judge0-ce.p.rapidapi.com/submissions/batch"
//       submissionData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-RapidAPI-Key': process.env.JUDGE0_API_KEY, // Your API Key
//           'X-RapidAPI-Host': process.env.JUDGE0_HOST      // Your API Host
//         }
//       }
//     );

//     // Return the response data from Judge0
//     return response.data;
//   } catch (error) {
//     console.error('Error submitting code to Judge0:', error);
//     throw new Error('Error submitting code to Judge0');
//   }
// };
// async function fetchJudge0Results(tokens) {
//   const results = [];
//   for (const token of tokens) {
//     let status = null;
//     do {
//       const result = await axios.get(`https://ce.judge0.com/submissions/${token}`, {
//         headers: { "X-Auth-Token": JUDGE0_API_KEY },
//       });

//       status = result.data.status.id;
//       if (status === 3) {
//         results.push(result.data);
//         break;
//       }
//     } while (status !== 3);
//   }
//   return results;
// }
const axios = require('axios');

// Helper function: delay (in ms) to pause between polling
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Submit code to Judge0 with the given test cases via RapidAPI
// const submitCodeToJudge0 = async (sourceCode, languageId, testCases) => {
//   try {
//     console.log("Submitting code to Judge0...",testCases);

//     // Prepare the data for the submission
//     const submissionData = {
//       submissions: testCases.map(testCase => ({
//         source_code: sourceCode,
//         language_id: languageId,
//         stdin: testCase.input,          // Each testCase should have an "input" field
//         expected_output: testCase.expectedOutput // And an "expectedOutput" field if required
//       }))
//     };

//     // Make the POST request to Judge0 via RapidAPI
//     const response = await axios.post(
//       process.env.JUDGE0_API_URL, // e.g., "https://judge0-ce.p.rapidapi.com/submissions/batch"
//       submissionData,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-RapidAPI-Key': process.env.JUDGE0_API_KEY, // Your API Key
//           'X-RapidAPI-Host': process.env.JUDGE0_HOST      // Your API Host
//         }
//       }
//     );

//     // Log the raw response for debugging
//     console.log("Submission Response:", JSON.stringify(response.data, null, 2));

//     // Judge0 (batch) responses are often wrapped inside a "submissions" property.
//     // Adjust this extraction if your API returns a direct array.
//     if (response.data && response.data.submissions) {
//       // Extract each token from submission objects
//       return response.data.submissions.map(sub => sub.token);
//     } else if (Array.isArray(response.data)) {
//       return response.data.map(sub => sub.token || sub);
//     } else {
//       throw new Error("Unexpected submission response structure.");
//     }
//   } catch (error) {
//     console.error('Error submitting code to Judge0:', error.response ? error.response.data : error.message);
//     throw new Error('Error submitting code to Judge0');
//   }
// };
const submitCodeToJudge0 = async (sourceCode, languageId, testCases) => {
  try {
    const submissionData = {
      submissions: testCases.map(testCase => ({
        source_code: sourceCode,
        language_id: languageId,
        stdin: testCase.input,
        expected_output: testCase.expectedOutput
      }))
    };

    const response = await axios.post(
      'https://judge0-ce.p.rapidapi.com/submissions/batch',
      submissionData,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
      }
    );

    console.log('Submission Response:', JSON.stringify(response.data, null, 2));

    if (!Array.isArray(response.data)) {
      throw new Error('Expected an array of submission tokens from Judge0');
    }

    return response.data.map(sub => sub.token);
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error('Error submitting code to Judge0:', errorMsg);
    throw new Error(`Failed to submit code to Judge0: ${errorMsg}`);
  }
};

// Polling function to fetch the results for each token until the status indicates completion.
// Adjust the endpoint if you are using a different Judge0 domain.
// const fetchJudge0Results = async (tokens) => {
//   const results = [];

//   // Loop over each token
//   for (const token of tokens) {
//     let status = null;
//     let resultData = null;

//     // For safety, limit the number of polling attempts (e.g., 50 attempts with a 1-second delay)
//     for (let attempts = 0; attempts < 50; attempts++) {
//       try {
//         // GET the result from Judge0; note: ensure the endpoint URL is correct.
//         const result = await axios.get(`https://ce.judge0.com/submissions/${token}`, {
//           headers: { 
//             "X-Auth-Token": process.env.JUDGE0_API_KEY  // Use your API Key for GET if required
//           }
//         });
//         resultData = result.data;
//         status = resultData.status.id;

//         // Debug: log each polling attempt for this token.
//         console.log(`Token ${token} - Attempt ${attempts + 1}: Status ID = ${status}`);

//         // If status 3 indicates completion (you can adjust if your API uses different status codes)
//         if (status === 3) {
//           break; // break out of retry loop if execution is complete
//         }
//       } catch (error) {
//         console.error(`Error polling for token ${token}:`, error.response ? error.response.data : error.message);
//         // Optionally break or continue depending on the error nature.
//         break;
//       }
//       // Wait 1 second before the next polling attempt
//       await delay(1000);
//     }

//     // Push the (possibly incomplete) resultData to the results array.
//     results.push(resultData);
//   }

//   return results;
// };
const fetchJudge0Results = async (tokens) => {
  // Ensure tokens is an array
  if (!Array.isArray(tokens)) {
    console.error('Tokens is not an array:', tokens);
    throw new Error('Expected an array of tokens');
  }

  const results = [];

  for (const token of tokens) {
    let resultData = null;
    const maxAttempts = 20;

    console.log(`Polling token: ${token}`); // Log full token for clarity

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const result = await axios.get(
          `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
          {
            headers: {
              'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
            }
          }
        );
        resultData = result.data;
        const statusId = resultData.status.id;

        console.log(`Token ${token} - Attempt ${attempt + 1}: Status ID = ${statusId}`);

        // Stop polling if status is final (Accepted, Wrong Answer, or Error)
        if (statusId >= 3) {
          break;
        }

        await delay(1000); // Wait 1 second between attempts
      } catch (error) {
        console.error(`Error polling token ${token}:`, error.message);
        resultData = { error: `Polling failed: ${error.message}` };
        break; // Stop on error
      }
    }

    if (!resultData) {
      resultData = { error: `Max attempts (${maxAttempts}) reached for token ${token}` };
    }
    results.push(resultData);
  }

  return results;
};

module.exports = { submitCodeToJudge0,fetchJudge0Results };
