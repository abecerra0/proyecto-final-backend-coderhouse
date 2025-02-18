import jwt from "jsonwebtoken";

const createToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  return token;
};

const decodeToken = (headers) => {
  const authHeader = headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Token is required");
    error.statusCode = 404;
    throw error;
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    const error = new Error("Token is required");
    error.statusCode = 404;
    throw error;
  }
  const decodedData = jwt.verify(token, process.env.JWT_KEY);
  return decodedData;
};

export default createToken;
export { decodeToken };
