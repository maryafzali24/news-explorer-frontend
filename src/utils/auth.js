export const authorize = (email, password) => {
  const fakeEmail = "fake@example.com";
  const fakePassword = "password123";
  const fakeToken = "a fake token";

  return new Promise((resolve, reject) => {
    if (email === fakeEmail && password === fakePassword) {
      // If they match, resolve with a mock token
      resolve({ token: fakeToken });
    } else {
      // If they don't match, reject with an error message indicating authentication failure
      reject(new Error("Invalid email or password"));
    }
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    // Check if the provided token matches the predefined fake token
    if (token === "a fake token") {
      // If it matches, resolve with mock user data
      resolve({
        data: { email: "fake@example.com", password: "password123" },
      });
    } else {
      // If it doesn't match, reject with an error message indicating invalid token
      reject(new Error("Invalid token"));
    }
  });
};
